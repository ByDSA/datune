/* eslint-disable camelcase */
import type { Interval } from "intervals/alt";
import { Voicings as DVoicings } from "voicings/diatonic";
import { Voicings as CVoicings } from "voicings/chromatic";
import { Intervals as I } from "intervals/alt";
import { fromVoicings } from "./building/voicings";
import { fromRootIntervals } from "./building/rootIntervals";
import { inv } from "./modifiers/inv";
import { Voicings as V } from ".";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SEVENTH, SEVENTH_MAJ7_b5, TRIAD_MAJOR } = V;

it("rootIntervals - SEVENTH = P1-M3-P5-m7", () => {
  const { M3, m7, P5, P1 } = I;
  const actual: Interval[] = SEVENTH.rootIntervals;
  const expected: Interval[] = [
    P1,
    M3,
    P5,
    m7,
  ];

  expect(actual).toStrictEqual(expected);
} );

it("inv: TRIAD MAJOR + 2inv", () => {
  const { M6, P4, P1 } = I;
  const voicing = inv(TRIAD_MAJOR, 2);
  const expected = fromRootIntervals(P1, P4, M6);

  expect(voicing).toBe(expected);
} );

it("withInv: TRIAD MAJOR + 2inv", () => {
  const { M6, P4, P1 } = I;
  const voicing = TRIAD_MAJOR.withInv(2);
  const expected = fromRootIntervals(P1, P4, M6);

  expect(voicing).toBe(expected);
} );

it("precalc - SEVENTH MAJ7 b5", () => {
  const cVoicing = CVoicings.fromRootIntervals(0, 4, 6, 11);
  const voicing = fromVoicings(cVoicing, DVoicings.SEVENTH);
  const expected = SEVENTH_MAJ7_b5;

  expect(voicing).toBe(expected);
} );

it("withAdd", () => {
  const expected = V.SEVENTH_MAJ7;
  const actual = V.POWER_CHORD.withAdd(I.M7, I.M3);

  expect(actual).toBe(expected);
} );

it("withOmit", () => {
  const expected = V.POWER_CHORD;
  const actual = V.SEVENTH_MAJ7.withOmit(I.M7, I.M3);

  expect(actual).toBe(expected);
} );
