import { IntervalSet } from "../IntervalSet";

export function expectIntervalSet(actual: IntervalSet, expected: IntervalSet) {
  try {
    expect(actual).toEqual(expected);
  } catch {
    throw new Error(JSON.stringify( {
      actual: actual.rootIntervals.toString(),
      expected: expected.rootIntervals.toString(),
    }, null, 2));
  }
}
