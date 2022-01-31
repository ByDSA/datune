/* eslint-disable camelcase */
import { Array as IntervalArray, AUGMENTED_NINTH, DIMINISHED_FIFTH, MAJOR_THIRD, MAJOR_THIRTEENTH, MINOR_SECOND, MINOR_SEVENTH, PERFECT_ELEVENTH, PERFECT_FIFTH, PERFECT_UNISON } from "intervals/alt";
import { TestInit } from "tests";
import { SEVENTH, THIRTEENTH_b5a9, TRIAD_MAJOR } from "../constants";
import fromRootIntervals from "./rootIntervals";

beforeAll(() => {
  TestInit.diatonicAltInterval();
  TestInit.diatonicAltVoicing();
} );
it("immutable: 0, 4, 7", () => {
  const diatonicAltVoicing = fromRootIntervals(PERFECT_UNISON, MAJOR_THIRD, PERFECT_FIFTH);

  expect(diatonicAltVoicing).toBe(TRIAD_MAJOR);
} );

it("immutable new voicing: 0, 1", () => {
  const diatonicAltVoicing = fromRootIntervals(PERFECT_UNISON, MINOR_SECOND);
  const diatonicAltVoicing2 = fromRootIntervals(PERFECT_UNISON, MINOR_SECOND);

  expect(diatonicAltVoicing2).toBe(diatonicAltVoicing);
} );

it("P1, M3, d5, m7, a9, P11, M13", () => {
  const actual = fromRootIntervals(
    PERFECT_UNISON,
    MAJOR_THIRD,
    DIMINISHED_FIFTH,
    MINOR_SEVENTH,
    AUGMENTED_NINTH,
    PERFECT_ELEVENTH,
    MAJOR_THIRTEENTH,
  );
  const expected = THIRTEENTH_b5a9;

  expect(actual).toBe(expected);
} );

it("P1-M3-P5-m7 = SEVENTH", () => {
  const rootIntervals: IntervalArray = [
    PERFECT_UNISON,
    MAJOR_THIRD,
    PERFECT_FIFTH,
    MINOR_SEVENTH,
  ];
  const actual = fromRootIntervals(...rootIntervals);
  const expected = SEVENTH;

  expect(actual).toBe(expected);
} );
