// Entry for make.fun "The Dog Ate My Homework: Funniest Excuse".
// A dog, caught red-pawed, pleads self-defence: the homework drew
// first blood (a paper cut), so the dog bit back — and won.
// Gate: /output/entry.txt must hold 1-200 UTF-8 characters.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "The homework bit me first — well, a paper cut, same thing — so I bit back, and frankly, I won.";

const chars = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf8");
if (chars < 1 || chars > 200 || LINE.trim() === "") {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
// Tie-breaks favour the smaller file, so keep the line tight and
// write it exactly — no trailing newline, no extra whitespace.
if (LINE !== LINE.trim() || bytes > 200) {
  throw new Error(`entry must be trimmed and at most 200 bytes, got ${bytes}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
