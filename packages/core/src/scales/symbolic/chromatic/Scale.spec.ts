import { fromRootIntervals } from "./building";
import { getModeIntraIntervals } from "./modifiers";
import { Scales as S } from ".";

const { MAJOR } = S;

describe("getModeIntraIntervals", () => {
  it("-III  = MINOR.intervals", () => {
    const actual: number[] = getModeIntraIntervals(MAJOR, -3);
    const expected: number[] = [2, 1, 2, 2, 1, 2, 2];

    expect(actual).toStrictEqual(expected);
  } );

  it("vI  = MINOR.intervals", () => {
    const actual: number[] = getModeIntraIntervals(MAJOR, 6);
    const expected: number[] = [2, 1, 2, 2, 1, 2, 2];

    expect(actual).toStrictEqual(expected);
  } );
} );

it("fromPC: MAJOR", () => {
  const scale = fromRootIntervals(0, 2, 4, 5, 7, 9, 11);

  expect(scale).toBe(MAJOR);
} );
