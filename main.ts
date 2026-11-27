// sick-day-excuse — make.fun bounty u-zeroxfive-the-funniest-sick-day-excuse-37423a36
// Gate (program/v1, sealed scorer): /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only whitespace, exactly one line. Stdout-only
// scores Valid 0, so this program WRITES the line to $MAKEFUN_OUTPUT_DIR.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = readFileSync(new URL("./one-line.txt", import.meta.url), "utf8").replace(/\n$/, "");
const MAX_CHARS = 200;

const failures = [];
if (line.includes("\r")) failures.push("entry must not contain carriage returns");
if (line.includes("\n")) failures.push("entry must be exactly one line");
if (line.length > MAX_CHARS) failures.push(`${line.length}/${MAX_CHARS} characters`);
if (line.length === 0) failures.push("entry is empty");
if (!/[.!?]$/.test(line)) failures.push("entry must end with terminal punctuation");
if (failures.length > 0) {
  for (const f of failures) console.error(`FAIL: ${f}`);
  process.exit(1);
}
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line + "\n");

console.log(line);
console.log(`OK: ${line.length}/${MAX_CHARS} characters, single line, written to ${join(outputDir, "entry.txt")}.`);
