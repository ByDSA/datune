import type { Voicing } from "../Voicing";
import { Intervals as I } from "chromatic";
import { fromRootIntervals } from "../building/rootIntervals";
import { Voicings as V } from "..";
import { add, inv, remove } from ".";

const { M2, TRITONE } = V;
const map: any[] = [
  [M2, fromRootIntervals(0, 10)],
  [TRITONE, TRITONE],
];

describe.each(map)("inv", (voicing: Voicing, expectedVoicing: Voicing) => {
  it(`${String(voicing)} inv=${String(expectedVoicing)}`, () => {
    const actual = inv(voicing);

    expect(actual).toBe(expectedVoicing);
  } );
} );

it("omit", () => {
  const base = V.SEVENTH_MAJ7;
  const actual = remove(base, I.M7);
  const expected = V.TRIAD_MAJOR;

  expect(actual).toBe(expected);
} );

it("should not omit anything if interval not exists", () => {
  const base = V.SEVENTH_MAJ7;
  const actual = remove(base, I.M9);

  expect(actual).toBe(base);
} );

it("should return null if voicing does not have more than 1 rootIntervals", () => {
  const base = V.TRIAD_MAJOR;
  const actual = remove(base, I.M3, I.P5);

  expect(actual).toBeNull();
} );

it("voicing Maj7 omit P1 shold be TRIAD MINOR", () => {
  const base = V.SEVENTH_MAJ7;
  const actual = remove(base, I.P1);

  expect(actual).toBe(V.TRIAD_MINOR);
} );

describe.each([
  [V.SEVENTH_MAJ7, I.M7, V.TRIAD_MAJOR],
  [V.SEVENTH_MINOR_b5, I.m7, V.TRIAD_DIMINISHED],
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
