import { readFileSync, existsSync } from "node:fs";

const path = ".env.example";
if (!existsSync(path)) {
  console.error("Missing .env.example");
  process.exit(1);
}

const text = readFileSync(path, "utf8");
const required = [
  "SQL_SERVER",
  "SQL_DB",
  "SQL_USER",
  "SQL_PASSWORD",
  "SQL_ENCRYPT",
  "SB_CONNECTION_STRING",
  "SB_QUEUE_VENDOR_UPSERT",
  "SB_QUEUE_PROJECT_CREATE",
  "ENTRA_TENANT_ID",
  "ENTRA_CLIENT_ID",
  "ENTRA_CLIENT_SECRET",
  "ALLOWED_EMAIL_DOMAIN"
];

const missing = required.filter(k => !new RegExp(`^${k}=`, "m").test(text));
if (missing.length) {
  console.error("Missing keys in .env.example:", missing);
  process.exit(1);
}

console.log(".env.example verification passed ✅");

