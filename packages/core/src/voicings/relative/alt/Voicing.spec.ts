/* eslint-disable camelcase */
import { Interval, MAJOR_SIXTH, MAJOR_THIRD, MINOR_SEVENTH, PERFECT_FIFTH, PERFECT_FOURTH, PERFECT_UNISON } from "intervals/alt";
import { TestInit } from "tests";
import { CVFromRootIntervals, CV_SEVENTH, DV_SEVENTH } from "..";
import { fromRootIntervals, fromVoicings } from "./building";
import { SEVENTH, SEVENTH_MAJ7_b5, TRIAD_MAJOR } from "./constants";
import { inv } from "./modifiers";

beforeAll(() => {
  TestInit.diatonicAltInterval();
  TestInit.diatonicAltVoicing();
} );
it("fromVoicings - Voicing SEVENTH + Diatonic SEVENTH = DiatonicAlt SEVENTH", () => {
  const diatonicAltVoicing = fromVoicings(CV_SEVENTH, DV_SEVENTH);
  const diatonicAltVoicing2 = SEVENTH;

  expect(diatonicAltVoicing2).toBe(diatonicAltVoicing);
} );

it("rootIntervals - SEVENTH = P1-M3-P5-m7", () => {
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
  const diatonicAltVoicing = inv(TRIAD_MAJOR, 2);
  const expected = fromRootIntervals(PERFECT_UNISON, PERFECT_FOURTH, MAJOR_SIXTH);

  expect(diatonicAltVoicing).toBe(expected);
} );

it("precalc - SEVENTH MAJ7 b5", () => {
  const cVoicing = CVFromRootIntervals(0, 4, 6, 11);
  const voicing = fromVoicings(cVoicing, DV_SEVENTH);
  const expected = SEVENTH_MAJ7_b5;

  expect(voicing).toBe(expected);
} );
