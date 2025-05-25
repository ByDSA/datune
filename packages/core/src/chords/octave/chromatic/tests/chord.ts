import type { Chord } from "chromatic";
import { throwErrorPopStack } from "datils/errors";

export function expectChord(actual: Chord | null, expected: Chord | null) {
  try {
    expect(actual).toBe(expected);
  } catch {
    const e = new Error(JSON.stringify( {
      actual: actual?.toString(),
      expected: expected?.toString(),
    }, null, 2));

    throwErrorPopStack(e, 1);
  }
}
