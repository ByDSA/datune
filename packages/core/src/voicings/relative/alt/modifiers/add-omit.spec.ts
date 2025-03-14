import { Intervals as I } from "alt";
import { Voicings as V } from "alt";
import { add, omit } from "./add-omit";

it("omit", () => {
  const base = V.SEVENTH_MAJ7;
  const actual = omit(base, I.M7);
  const expected = V.TRIAD_MAJOR;

  expect(actual).toBe(expected);
} );

it("should not omit anything if interval not exists", () => {
  const base = V.SEVENTH_MAJ7;
  const actual = omit(base, I.M9);

  expect(actual).toBe(base);
} );

it("should return null if voicing does not have more than 1 rootIntervals", () => {
  const base = V.TRIAD_MAJOR;
  const actual = omit(base, I.M3, I.P5);

  expect(actual).toBeNull();
} );

it("voicing Maj7 omit P1 shold be TRIAD MINOR", () => {
  const base = V.SEVENTH_MAJ7;
  const actual = omit(base, I.P1);

  expect(actual).toBe(V.TRIAD_MINOR);
} );

describe.each([
  [V.SEVENTH_MAJ7, I.M7, V.TRIAD_MAJOR],
  [V.SEVENTH_MINOR_b5, I.m7, V.TRIAD_DIMINISHED],
])("omit reversible", (base, omitInterval, expected) => {
  it(base + " omit " + omitInterval + " should be " + expected, () => {
    const actual = omit(base, omitInterval);

    expect(actual).toBe(expected);
  } );

  it(expected + " add " + omitInterval + " should be " + base, () => {
    const actual = add(expected, omitInterval);

    expect(actual).toBe(base);
  } );
} );
