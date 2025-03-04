/* eslint-disable camelcase */
import { Voicings as DVoicings } from "voicings/diatonic";
import { Voicings as CVoicings } from "voicings/chromatic";
import { TestInit } from "tests";
import { Interval, Intervals } from "intervals/alt";
import { fromVoicings } from "./building/voicings";
import { fromRootIntervals } from "./building/rootIntervals";
import { SEVENTH, SEVENTH_MAJ7_b5, TRIAD_MAJOR } from "./constants";
import { inv } from "./modifiers/inv";

TestInit.diatonicAltVoicing();

it("rootIntervals - SEVENTH = P1-M3-P5-m7", () => {
  const { M3, m7, P5, P1 } = Intervals;
  const actual: Interval[] = SEVENTH.rootIntervals;
  const expected: Interval[] = [
    P1,
    M3,
    P5,
    m7,
  ];

  expect(actual).toStrictEqual(expected);
} );

it("withInv: TRIAD MAJOR + 2inv", () => {
  const { M6, P4, P1 } = Intervals;
  const voicing = inv(TRIAD_MAJOR, 2);
  const expected = fromRootIntervals(P1, P4, M6);

  expect(voicing).toBe(expected);
} );

it("precalc - SEVENTH MAJ7 b5", () => {
  const cVoicing = CVoicings.fromRootIntervals(0, 4, 6, 11);
  const voicing = fromVoicings(cVoicing, DVoicings.SEVENTH);
  const expected = SEVENTH_MAJ7_b5;

  expect(voicing).toBe(expected);
} );
