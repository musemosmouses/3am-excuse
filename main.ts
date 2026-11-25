// The 3 AM Excuse — entry program (program/v1, node22).
// Writes one line to $MAKEFUN_OUTPUT_DIR/entry.txt: the excuse a hardware
// wallet gives for refusing to sign a transaction at 3 AM. The wallet is
// the designated driver here: the human is half asleep, this is the third
// "urgent" transfer tonight, and the device is the only one of the two with
// a PIN — so it says no. No network, no randomness, no dependencies: the
// same 119 characters on every run, well inside the 1-200 character gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "It's 3 AM. You're half asleep, this is your third 'urgent' transfer " +
  "tonight, and I'm the only one of us with a PIN. No.";

// The entry text: 119 characters, one line, punch on the last word.
// It is the wallet's own excuse, in the wallet's own voice, and the joke
// only works at 3 AM: a half-asleep human, a third "urgent" transfer in
// one night, and a device that holds the PIN and refuses to use it.
function entryPath(): string {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  // Only ever write inside MAKEFUN_OUTPUT_DIR — never a relative path, never
  // rmSync/rm the output dir (the grader runs on a read-only filesystem).
  mkdirSync(outDir, { recursive: true });
  return join(outDir, "entry.txt");
}

function main(): void {
  writeFileSync(entryPath(), ENTRY, "utf8");
}

main();
