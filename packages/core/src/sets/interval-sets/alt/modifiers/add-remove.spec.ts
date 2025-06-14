import { Intervals as I } from "alt";
import { IntervalSets as IS } from "alt";
import { add, remove } from "./add-remove";

it("remove", () => {
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

it("should return empty intervalSet", () => {
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
