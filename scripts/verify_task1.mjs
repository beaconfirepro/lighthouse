import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const mustExist = [
  "package.json",
  "turbo.json",
  "tsconfig.json",
  ".eslintrc.json",
  ".prettierrc",
  ".gitignore",
  "README.md",
  "CONTRIBUTING.md",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/feature_request.md",
  "CODEOWNERS",
  "apps/web/package.json",
  "apps/api/package.json",
  "apps/worker/package.json",
  "packages/shared/package.json",
  "packages/shared/tsconfig.json",
  "packages/shared/src/index.ts",
  "packages/db/package.json"
];

const missing = mustExist.filter((p) => !existsSync(p));
if (missing.length) {
  console.error("Missing files:", missing);
  process.exit(1);
}

execSync("node -v", { stdio: "inherit" });
execSync("npm -v", { stdio: "inherit" });
console.log("Task 1 verification passed ✅");
