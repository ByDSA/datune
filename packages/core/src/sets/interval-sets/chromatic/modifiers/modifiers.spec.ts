import type { IntervalSet } from "../IntervalSet";
import { Intervals as I } from "chromatic";
import { fromRootIntervals } from "../building/rootIntervals";
import { IntervalSets as IS } from "..";
import { add, inv, remove } from ".";

const { M2, TRITONE } = IS;
const map: any[] = [
  [M2, fromRootIntervals(0, 10)],
  [TRITONE, TRITONE],
];

describe.each(map)("inv", (intervalSet: IntervalSet, expectedIntervalSet: IntervalSet) => {
  it(`${String(intervalSet)} inv=${String(expectedIntervalSet)}`, () => {
    const actual = inv(intervalSet);

    expect(actual).toBe(expectedIntervalSet);
  } );
} );

it("omit", () => {
  const base = IS.SEVENTH_MAJ7;
  const actual = remove(base, I.M7);
  const expected = IS.TRIAD_MAJOR;

  expect(actual).toBe(expected);
} );

it("should not omit anything if interval not exists", () => {
  const base = IS.SEVENTH_MAJ7;
  const actual = remove(base, I.M9);

  expect(actual).toBe(base);
} );

it("should return empty if intervalSet does not have any rootIntervals", () => {
  const base = IS.TRIAD_MAJOR;
  const actual = remove(base, ...base.rootIntervals);

  expect(actual).toBe(IS.EMPTY);
} );

describe.each([
  [IS.SEVENTH_MAJ7, I.M7, IS.TRIAD_MAJOR],
  [IS.SEVENTH_MINOR_b5, I.m7, IS.TRIAD_DIMINISHED],
])("omit reversible", (base, omitInterval, expected) => {
  it(base + " omit " + omitInterval + " should be " + expected, () => {
    const actual = remove(base, omitInterval);

    expect(actual).toBe(expected);
  } );

  it(expected + " add " + omitInterval + " should be " + base, () => {
    const actual = add(expected, omitInterval);

    expect(actual).toBe(base);
  } );
} );
