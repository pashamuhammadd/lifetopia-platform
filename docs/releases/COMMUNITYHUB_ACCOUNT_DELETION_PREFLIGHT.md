# CommunityHub 10.3 — account-deletion preflight

This package intentionally contains only a read-only schema inventory. It does not delete or modify any user, profile, post, message, guild, wallet, audit, or storage object.

Run the complete SQL file in Supabase SQL Editor, export the final result as CSV, and return that CSV before applying an account-deletion migration. The result determines which data can cascade, which references must be anonymized or reassigned, and which immutable audit records require an explicit retention rule.

Never test deletion with the Founder account. The final acceptance test must use a new disposable non-staff account.
