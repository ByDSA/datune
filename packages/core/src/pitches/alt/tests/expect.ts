import { Pitch } from "../Pitch";

export function expectPitch(actual: Pitch | null, expected: Pitch | null) {
  try {
    expect(actual).toBe(expected);
  } catch {
    throw new Error(JSON.stringify( {
      actual: actual?.toString(),
      expected: expected?.toString(),
    }, null, 2));
  }
}
