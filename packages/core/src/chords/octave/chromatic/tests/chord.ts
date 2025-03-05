import type { Chord } from "chromatic";

export function expectChord(actual: Chord | null, expected: Chord | null) {
  try {
    if (actual !== null && expected !== null)
      expect(actual).toHaveLength(expected.length);

    expect(actual).toEqual(expected);
  } catch {
    throw new Error(JSON.stringify( {
      actual: actual?.toString(),
      expected: expected?.toString(),
    }, null, 2));
  }
}
