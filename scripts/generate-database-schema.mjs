import fs from "fs";
import path from "path";
import { Client } from "pg";

const root = process.cwd();
const docsDir = path.join(root, "docs");

const envPaths = [
  path.join(root, ".env.local"),
  path.join(root, "apps", "website", ".env.local"),
];

function loadEnv() {
  const envPath = envPaths.find((filePath) => fs.existsSync(filePath));

  if (!envPath) {
    throw new Error(".env.local not found");
  }

  const lines = fs.readFileSync(envPath, "utf8").split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");

    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();

    const value = trimmed
      .slice(index + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");

    process.env[key] = value;
  }
}

function writeDoc(fileName, content) {
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, fileName), content.trimStart(), "utf8");
  console.log(`✅ ${fileName} generated`);
}

function toTypeScriptType(column) {
  const type = column.data_type === "USER-DEFINED" ? column.udt_name : column.data_type;

  const map = {
    uuid: "string",
    text: "string",
    varchar: "string",
    character: "string",
    "character varying": "string",
    date: "string",
    timestamp: "string",
    "timestamp with time zone": "string",
    "timestamp without time zone": "string",
    integer: "number",
    bigint: "number",
    numeric: "number",
    real: "number",
    "double precision": "number",
    boolean: "boolean",
    json: "Record<string, unknown>",
    jsonb: "Record<string, unknown>",
  };

  return map[type] || "string";
}

function toPascalCase(value) {
  return value
    .split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join("");
}

loadEnv();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not found in .env.local");
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

await client.connect();

const tables = await client.query(`
  select table_name
  from information_schema.tables
  where table_schema = 'public'
    and table_type = 'BASE TABLE'
  order by table_name;
`);

const columns = await client.query(`
  select
    table_name,
    column_name,
    data_type,
    udt_name,
    is_nullable,
    column_default,
    ordinal_position
  from information_schema.columns
  where table_schema = 'public'
  order by table_name, ordinal_position;
`);

const primaryKeys = await client.query(`
  select
    tc.table_name,
    kcu.column_name
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on tc.constraint_name = kcu.constraint_name
   and tc.table_schema = kcu.table_schema
  where tc.constraint_type = 'PRIMARY KEY'
    and tc.table_schema = 'public'
  order by tc.table_name, kcu.ordinal_position;
`);

const foreignKeys = await client.query(`
  select
    tc.table_name,
    kcu.column_name,
    ccu.table_name as foreign_table,
    ccu.column_name as foreign_column
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on tc.constraint_name = kcu.constraint_name
   and tc.table_schema = kcu.table_schema
  join information_schema.constraint_column_usage ccu
    on ccu.constraint_name = tc.constraint_name
   and ccu.table_schema = tc.table_schema
  where tc.constraint_type = 'FOREIGN KEY'
    and tc.table_schema = 'public'
  order by tc.table_name, kcu.column_name;
`);

await client.end();

const pkMap = new Map();
const fkMap = new Map();

for (const row of primaryKeys.rows) {
  pkMap.set(`${row.table_name}.${row.column_name}`, true);
}

for (const row of foreignKeys.rows) {
  fkMap.set(
    `${row.table_name}.${row.column_name}`,
    `${row.foreign_table}.${row.foreign_column}`,
  );
}

const tableColumns = new Map();

for (const table of tables.rows) {
  tableColumns.set(
    table.table_name,
    columns.rows.filter((column) => column.table_name === table.table_name),
  );
}

/* DATABASE_SCHEMA.md */

let schemaMd = `# Lifetopia World — Database Schema

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run \`pnpm docs:generate\` to update.

---

## Critical Auth Rule

\`\`\`text
profiles.id == auth.users.id
\`\`\`

The \`profiles\` table does not have \`user_id\`.

Correct:

\`\`\`ts
.eq("id", user.id)
\`\`\`

Incorrect:

\`\`\`ts
.eq("user_id", user.id)
\`\`\`

---

`;

for (const table of tables.rows) {
  const cols = tableColumns.get(table.table_name) || [];

  schemaMd += `## Table: \`public.${table.table_name}\`\n\n`;
  schemaMd += `| Column | Type | Nullable | Key | Default |\n`;
  schemaMd += `|---|---|---|---|---|\n`;

  for (const column of cols) {
    const type =
      column.data_type === "USER-DEFINED" ? column.udt_name : column.data_type;

    const key = [];

    if (pkMap.has(`${column.table_name}.${column.column_name}`)) {
      key.push("PK");
    }

    if (fkMap.has(`${column.table_name}.${column.column_name}`)) {
      key.push(`FK → ${fkMap.get(`${column.table_name}.${column.column_name}`)}`);
    }

    schemaMd += `| \`${column.column_name}\` | \`${type}\` | ${column.is_nullable} | ${key.join(", ")} | \`${column.column_default || ""}\` |\n`;
  }

  schemaMd += "\n";
}

/* DATABASE_RELATIONS.md */

let relationsMd = `# Lifetopia World — Database Relations

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run \`pnpm docs:generate\` to update.

---

## Critical Manual Relation

\`\`\`text
auth.users.id
    ↓
public.profiles.id
\`\`\`

Important:

\`\`\`text
profiles.id == auth.users.id
profiles.user_id does not exist
\`\`\`

---

## Foreign Keys

`;

if (!foreignKeys.rows.length) {
  relationsMd += `No public foreign keys detected yet.\n\n`;
} else {
  for (const row of foreignKeys.rows) {
    relationsMd += `- \`public.${row.table_name}.${row.column_name}\` → \`public.${row.foreign_table}.${row.foreign_column}\`\n`;
  }
}

relationsMd += `

---

## Table Map

`;

for (const table of tables.rows) {
  relationsMd += `### \`public.${table.table_name}\`\n\n`;

  const outgoing = foreignKeys.rows.filter((row) => row.table_name === table.table_name);
  const incoming = foreignKeys.rows.filter((row) => row.foreign_table === table.table_name);

  relationsMd += `Outgoing relations:\n`;
  relationsMd += outgoing.length
    ? outgoing
        .map(
          (row) =>
            `- \`${row.column_name}\` → \`${row.foreign_table}.${row.foreign_column}\``,
        )
        .join("\n")
    : `- None`;

  relationsMd += `\n\nIncoming relations:\n`;
  relationsMd += incoming.length
    ? incoming
        .map(
          (row) =>
            `- \`${row.table_name}.${row.column_name}\` → \`${row.foreign_column}\``,
        )
        .join("\n")
    : `- None`;

  relationsMd += `\n\n`;
}

/* DATABASE_TYPES.md */

let typesMd = `# Lifetopia World — Database Types

> Auto-generated from Supabase PostgreSQL.  
> Do not edit manually.  
> Run \`pnpm docs:generate\` to update.

---

## TypeScript Interfaces

`;

for (const table of tables.rows) {
  const cols = tableColumns.get(table.table_name) || [];
  const interfaceName = toPascalCase(table.table_name.replace(/s$/, ""));

  typesMd += `export type ${interfaceName} = {\n`;

  for (const column of cols) {
    const tsType = toTypeScriptType(column);
    const nullable = column.is_nullable === "YES" ? " | null" : "";

    typesMd += `  ${column.column_name}: ${tsType}${nullable};\n`;
  }

  typesMd += `};\n\n`;
}

typesMd += `---

## AI Instructions

- Treat these generated types as the source of truth.
- Do not invent fields.
- Do not rename snake_case fields unless explicitly mapping them.
- Use \`display_name\`, not \`displayName\`, when reading directly from Supabase.
- Use \`country_name\`, not \`country\`.
- Use \`avatar_id\`, not \`avatar\`.
- Use \`profiles.id\`, not \`profiles.user_id\`.

`;

writeDoc("DATABASE_SCHEMA.md", schemaMd);
writeDoc("DATABASE_RELATIONS.md", relationsMd);
writeDoc("DATABASE_TYPES.md", typesMd);