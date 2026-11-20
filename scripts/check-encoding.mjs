// Fails if any source file contains mojibake (UTF-8 text that was decoded as Windows-1252 and saved again,
// e.g. an em dash turning into three garbage characters), a UTF-8 BOM, or the U+FFFD replacement character.
// Runs automatically before `npm run build` (so a broken file can never be deployed) and via `npm run check:encoding`.
// This file is deliberately ASCII-only (character codes) so it can never trip its own check.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = process.cwd();
const DIRS = ["app", "components", "data", "lib", "scripts", "public"];
const EXTS = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".json", ".md", ".mdx", ".svg", ".html", ".txt"]);

const c = (...codes) => String.fromCharCode(...codes);
const range = (lo, hi) => `[${c(lo)}-${c(hi)}]`;
const PATTERNS = [
  [new RegExp(c(0xe2, 0x20ac)), "mojibake (a-circumflex + euro sign: a broken dash or apostrophe)"],
  [new RegExp(c(0xc3) + range(0x80, 0xbf)), "mojibake (A-tilde + symbol: a broken accented letter)"],
  [new RegExp(c(0xc2) + range(0xa0, 0xbf)), "mojibake (A-circumflex + symbol)"],
  [new RegExp("^" + c(0xfeff)), "UTF-8 BOM at file start"],
  [new RegExp(c(0xfffd)), "replacement character (U+FFFD)"],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) { if (name !== "node_modules" && name !== ".next") yield* walk(p); }
    else if (EXTS.has(extname(name).toLowerCase())) yield p;
  }
}

const problems = [];
for (const d of DIRS) {
  let files;
  try { files = [...walk(join(ROOT, d))]; } catch { continue; }
  for (const file of files) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      for (const [re, label] of PATTERNS) {
        if (re.test(line)) { problems.push(`${relative(ROOT, file)}:${i + 1}  ${label}\n    ${line.trim().slice(0, 140)}`); break; }
      }
    });
  }
}

if (problems.length) {
  console.error(`\nEncoding check failed - ${problems.length} problem line(s):\n`);
  console.error(problems.join("\n"));
  console.error("\nFix: restore the intended character and save the file as UTF-8 without BOM.");
  console.error("Windows PowerShell 5.1: Get-Content/Set-Content default to the ANSI code page and corrupt non-ASCII text. Edit source files in the editor, or pass -Encoding utf8 to both.\n");
  process.exit(1);
}
console.log("Encoding check passed.");
