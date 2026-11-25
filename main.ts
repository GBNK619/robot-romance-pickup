import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Robot Romance: one joke pickup line aimed at a robot / AI.
// The context-window premise is genuinely AI-specific and fresh —
// no batteries, no charging, no rebooting — and the setup and the
// punch both land inside the one line.
const LINE =
  "Is your name Context? Because I lose track of everything else when I'm talking to you.";

// The sealed gate requires entry.txt to be UTF-8 text of 1 to 200
// characters, not only white space. Refuse to write an invalid entry
// rather than letting a bad line through.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(
    `entry line must be 1-200 characters, got ${LINE.length}`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only white space");
}
if (LINE.includes("\n")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote entry.txt (${LINE.length} characters): ${LINE}`);
