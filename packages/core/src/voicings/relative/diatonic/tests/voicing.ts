import { Voicing } from "../Voicing";

export function expectVoicing(actual: Voicing, expected: Voicing) {
  try {
    expect(actual).toEqual(expected);
  } catch {
    throw new Error(JSON.stringify( {
      actual: actual.rootIntervals.toString(),
      expected: expected.rootIntervals.toString(),
    }, null, 2));
  }
}
