import { Interval } from "../Interval";

export function expectInterval(actual: Interval, expected: Interval) {
  try {
    expect(actual).toEqual(expected);
  } catch {
    throw new Error(JSON.stringify( {
      actual: actual.toString(),
      expected: expected.toString(),
    }, null, 2));
  }
}
