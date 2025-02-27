/* eslint-disable camelcase */
import { fromVoicings } from "./building/voicings";
import { fromRootIntervals } from "./building/rootIntervals";
import { SEVENTH, SEVENTH_MAJ7_b5, TRIAD_MAJOR } from "./constants";
import { inv } from "./modifiers/inv";
import { Voicings as DVoicings } from "voicings/diatonic";
import { Voicings as CVoicings } from "voicings/chromatic";
import { TestInit } from "tests";
import { Interval, Intervals } from "intervals/alt";

TestInit.diatonicAltVoicing();

it("rootIntervals - SEVENTH = P1-M3-P5-m7", () => {
  const { MAJOR_THIRD, MINOR_SEVENTH, PERFECT_FIFTH, PERFECT_UNISON } = Intervals;
  const actual: Interval[] = SEVENTH.rootIntervals;
  const expected: Interval[] = [
    PERFECT_UNISON,
    MAJOR_THIRD,
    PERFECT_FIFTH,
    MINOR_SEVENTH,
  ];

  expect(actual).toStrictEqual(expected);
} );

it("withInv: TRIAD MAJOR + 2inv", () => {
  const { MAJOR_SIXTH, PERFECT_FOURTH, PERFECT_UNISON } = Intervals;
  const diatonicAltVoicing = inv(TRIAD_MAJOR, 2);
  const expected = fromRootIntervals(PERFECT_UNISON, PERFECT_FOURTH, MAJOR_SIXTH);

  expect(diatonicAltVoicing).toBe(expected);
} );

it("precalc - SEVENTH MAJ7 b5", () => {
  const cVoicing = CVoicings.fromRootIntervals(0, 4, 6, 11);
  const voicing = fromVoicings(cVoicing, DVoicings.SEVENTH);
  const expected = SEVENTH_MAJ7_b5;

  expect(voicing).toBe(expected);
} );
