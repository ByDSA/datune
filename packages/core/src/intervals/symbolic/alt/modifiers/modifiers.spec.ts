/* eslint-disable camelcase */
import { Intervals } from "..";
import { AUGMENTED_FIFTH, AUGMENTED_FOURTH, AUGMENTED_SECOND, AUGMENTED_SEVENTH, AUGMENTED_UNISON, DIMINISHED_FIFTH, DIMINISHED_NINTH, MAJOR_SECOND, MAJOR_SEVENTH, MAJOR_SIXTH, MAJOR_THIRD, MINOR_SECOND, MINOR_SEVENTH, MINOR_SIXTH, MINOR_THIRD, PERFECT_ELEVENTH, PERFECT_FIFTH, PERFECT_FOURTH, PERFECT_OCTAVE, PERFECT_TWELFTH, PERFECT_UNISON } from "../constants";
import type { Interval } from "../Interval";
import { neg } from "./neg";
import { add } from "./add";
import { sub } from "./sub";
import { DIMINISHED } from "intervals";
import { Intervals as DIntervals } from "intervals/diatonic";
import { TestInit } from "tests";

TestInit.diatonicAltInterval();
// eslint-disable-next-line @typescript-eslint/naming-convention
const { FIFTH, FOURTH, neg: Dneg } = DIntervals;
// eslint-disable-next-line @typescript-eslint/naming-convention
const CASES_AmB = [
  [DIMINISHED_FIFTH, MINOR_THIRD, MINOR_THIRD],
  [AUGMENTED_FIFTH, MAJOR_THIRD, MAJOR_THIRD],
  [MAJOR_THIRD, MAJOR_SECOND, MAJOR_SECOND],
  [MAJOR_THIRD, MINOR_SECOND, AUGMENTED_SECOND],
  [MINOR_THIRD, MAJOR_SECOND, MINOR_SECOND],
  [MAJOR_THIRD, MINOR_THIRD, AUGMENTED_UNISON],
  [MAJOR_SECOND, MINOR_SECOND, AUGMENTED_UNISON],
  [MAJOR_SIXTH, MINOR_SIXTH, AUGMENTED_UNISON],
  [MAJOR_SEVENTH, MINOR_SEVENTH, AUGMENTED_UNISON],
  [PERFECT_FIFTH, PERFECT_FOURTH, MAJOR_SECOND],
  [DIMINISHED_NINTH, DIMINISHED_FIFTH, DIMINISHED_FIFTH],
  [AUGMENTED_SEVENTH, AUGMENTED_FOURTH, AUGMENTED_FOURTH],
  [PERFECT_UNISON, DIMINISHED_FIFTH,
     Intervals.fromIntervalQuality(Dneg(FIFTH), DIMINISHED) as Interval],
  [PERFECT_UNISON, PERFECT_UNISON, PERFECT_UNISON],
  [PERFECT_OCTAVE, MINOR_SECOND, MAJOR_SEVENTH],
  [PERFECT_OCTAVE, MAJOR_SECOND, MINOR_SEVENTH],
  [PERFECT_OCTAVE, MINOR_THIRD, MAJOR_SIXTH],
  [PERFECT_OCTAVE, MAJOR_THIRD, MINOR_SIXTH],
  [PERFECT_OCTAVE, PERFECT_FOURTH, PERFECT_FIFTH],
  [PERFECT_OCTAVE, AUGMENTED_FOURTH, DIMINISHED_FIFTH],
  [PERFECT_OCTAVE, DIMINISHED_FIFTH, AUGMENTED_FOURTH],
  [PERFECT_OCTAVE, AUGMENTED_FIFTH, Intervals.fromIntervalQuality(FOURTH, DIMINISHED) as Interval],
  [MAJOR_THIRD, PERFECT_UNISON, MAJOR_THIRD],
  [PERFECT_UNISON, MAJOR_THIRD, neg(MAJOR_THIRD)],
  [PERFECT_UNISON, PERFECT_TWELFTH, neg(PERFECT_TWELFTH)],
  [PERFECT_OCTAVE, PERFECT_ELEVENTH, neg(PERFECT_FOURTH)],
  [PERFECT_ELEVENTH, PERFECT_OCTAVE, PERFECT_FOURTH],
];
const CASES_SUMA = [...CASES_AmB.map(
  (t) => [t[2], t[1], t[0]],
),
[PERFECT_OCTAVE, PERFECT_FOURTH, PERFECT_ELEVENTH],
];

describe("a + B", () => {
  describe.each(
    CASES_SUMA,
  )("tests", (a, b, c) => {
    it(`${String(a)} + ${String(b)} = ${String(c)}`, () => {
      const actual = add(a, b);

      expect(actual).toBe(c);
    } );

    it(`-${String(b)} + -${String(a)} = -${String(c)}`, () => {
      const actual = add(neg(b), neg(a));

      expect(actual).toBe(neg(c));
    } );

    it(`-${String(b)} + ${String(c)} = ${String(a)}`, () => {
      const actual = add(neg(b), c);

      expect(actual).toBe(a);
    } );

    it(`${String(c)} + -${String(b)} = ${String(a)}`, () => {
      const actual = add(c, neg(b));

      expect(actual).toBe(a);
    } );

    it(`${String(c)} - ${String(b)} = ${String(a)}`, () => {
      const actual = sub(c, b);

      expect(actual).toBe(a);
    } );

    it(`${String(c)} - ${String(a)} = ${String(b)}`, () => {
      const actual = sub(c, a);

      expect(actual).toBe(b);
    } );
  } );
} );
