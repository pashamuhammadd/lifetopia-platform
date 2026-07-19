param(
    [Parameter(Mandatory = $true)]
    [string]$InputCsv,

    [string]$OutputCsv = (Join-Path $HOME "Downloads\communityhub-closed-testers.csv")
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $InputCsv -PathType Leaf)) {
    throw "Supabase CSV was not found: $InputCsv"
}

$rows = Import-Csv -LiteralPath $InputCsv

if (-not $rows) {
    throw "The Supabase CSV does not contain any user rows."
}

$propertyNames = @($rows[0].PSObject.Properties.Name)
$emailProperty = $propertyNames | Where-Object { $_ -ieq "email" } | Select-Object -First 1

if (-not $emailProperty) {
    throw "The CSV must contain a column named 'email'. Run the included SQL without renaming its output column."
}

$emailPattern = '^[^\s@]+@[^\s@]+\.[^\s@]+$'
$invalidEmails = [System.Collections.Generic.List[string]]::new()

$emails = foreach ($row in $rows) {
    $email = [string]$row.$emailProperty
    $email = $email.Trim().ToLowerInvariant()

    if ([string]::IsNullOrWhiteSpace($email)) {
        continue
    }

    if ($email -notmatch $emailPattern) {
        $invalidEmails.Add($email)
        continue
    }

    $email
}

$emails = @($emails | Sort-Object -Unique)

if ($invalidEmails.Count -gt 0) {
    throw "Invalid email values were found: $($invalidEmails -join ', ')"
}

if ($emails.Count -eq 0) {
    throw "No valid email addresses were found."
}

$outputDirectory = Split-Path -Parent $OutputCsv
if ($outputDirectory -and -not (Test-Path -LiteralPath $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}

# Google Play requires one address per line, no header, no commas, and no BOM.
$utf8WithoutBom = [System.Text.UTF8Encoding]::new($false)
$contents = ($emails -join "`n") + "`n"
[System.IO.File]::WriteAllText($OutputCsv, $contents, $utf8WithoutBom)

$bom = [System.IO.File]::ReadAllBytes($OutputCsv) | Select-Object -First 3
$hasUtf8Bom = $bom.Count -eq 3 -and $bom[0] -eq 0xEF -and $bom[1] -eq 0xBB -and $bom[2] -eq 0xBF

if ($hasUtf8Bom) {
    throw "Output validation failed: UTF-8 BOM is present."
}

Write-Host "Google Play tester CSV created successfully." -ForegroundColor Green
Write-Host "Tester count: $($emails.Count)"
Write-Host "Output: $OutputCsv"
Write-Host "Review consent and Google Play account ownership before uploading."
