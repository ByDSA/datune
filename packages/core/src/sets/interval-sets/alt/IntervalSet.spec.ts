/* eslint-disable camelcase */
import type { Interval } from "intervals/alt";
import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { Intervals as I } from "intervals/alt";
import { fromIntervalSets } from "./building/intervalSets";
import { fromRootIntervals } from "./building/rootIntervals";
import { inv } from "./modifiers/inv";
import { IntervalSets as IS } from ".";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SEVENTH, SEVENTH_MAJ7_b5, TRIAD_MAJOR } = IS;

it("rootIntervals - SEVENTH = P1-M3-P5-m7", () => {
  const { M3, m7, P5, P1 } = I;
  const actual = SEVENTH.rootIntervals;
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
  const intervalSet = inv(TRIAD_MAJOR, 2);
  const expected = fromRootIntervals(P1, P4, M6);

  expect(intervalSet).toBe(expected);
} );

it("withInv: TRIAD MAJOR + 2inv", () => {
  const { M6, P4, P1 } = I;
  const intervalSet = TRIAD_MAJOR.withInv(2);
  const expected = fromRootIntervals(P1, P4, M6);

  expect(intervalSet).toBe(expected);
} );

it("precalc - SEVENTH MAJ7 b5", () => {
  const cIntervalSet = CIS.fromRootIntervals(0, 4, 6, 11);
  const intervalSet = fromIntervalSets(cIntervalSet, DIS.SEVENTH);
  const expected = SEVENTH_MAJ7_b5;

  expect(intervalSet).toBe(expected);
} );

it("withAdd", () => {
  const expected = IS.SEVENTH_MAJ7;
  const actual = IS.POWER_CHORD.withAdded(I.M7, I.M3);

  expect(actual).toBe(expected);
} );

it("withOmit", () => {
  const expected = IS.POWER_CHORD;
  const actual = IS.SEVENTH_MAJ7.withRemoved(I.M7, I.M3);

  expect(actual).toBe(expected);
} );
