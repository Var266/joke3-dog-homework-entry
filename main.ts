// Entry for make.fun "The Dog Ate My Homework: Funniest Excuse".
// Re-entry: the dog claims bowl jurisdiction — anything left next
// to the bowl falls under bowl law, and the dog just follows it.
// Gate: /output/entry.txt must hold 1-200 UTF-8 characters on one line.
import { mkdirSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const MAX_BYTES = 200;

const LINE =
  "You left it next to my bowl. I don't make the rules, I just follow the bowl.";

// Count Unicode code points (not UTF-16 code units) so emoji or
// accented characters are measured the same way the gate counts them.
function codePointCount(text: string): number {
  let count = 0;
  for (const _ of text) count++;
  return count;
}

function validateEntry(raw: string): string {
  // Normalize to NFC so visually identical text counts identically.
  const line = raw.normalize("NFC");
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (/[\n\r\t]/.test(line) || / {2,}/.test(line)) {
    throw new Error("entry must be a single line with single spaces only");
  }
  const chars = codePointCount(line);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`);
  }
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes > MAX_BYTES) {
    throw new Error(`entry must be at most ${MAX_BYTES} bytes, got ${bytes}`);
  }
  return line;
}

// Tie-breaks favour the smaller file, so keep the line tight and
// write it exactly — no trailing newline, no extra whitespace.
const entry = validateEntry(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
