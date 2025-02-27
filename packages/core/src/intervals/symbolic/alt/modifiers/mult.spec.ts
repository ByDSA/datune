import { AUGMENTED_FOURTH, AUGMENTED_SEVENTH, DIMINISHED_FIFTH, DIMINISHED_NINTH, DIMINISHED_SEVENTH, MINOR_THIRD, PERFECT_UNISON } from "../constants";
import Interval from "../Interval";
import { mult } from "./mult";
import { neg } from "./neg";
import { TestInit } from "tests";

TestInit.diatonicAltInterval();

describe.each([
  [MINOR_THIRD, 1, MINOR_THIRD],
  [MINOR_THIRD, 2, DIMINISHED_FIFTH],
  [MINOR_THIRD, -2, neg(DIMINISHED_FIFTH)],
  [MINOR_THIRD, -0.5, PERFECT_UNISON],
  [MINOR_THIRD, 0.5, PERFECT_UNISON],
  [MINOR_THIRD, -1.5, neg(MINOR_THIRD)],
  [MINOR_THIRD, 1.5, MINOR_THIRD],
  [AUGMENTED_FOURTH, 2, AUGMENTED_SEVENTH],
  [MINOR_THIRD, 4, DIMINISHED_NINTH],
  [MINOR_THIRD, 3, DIMINISHED_SEVENTH],
  [MINOR_THIRD, 0, PERFECT_UNISON],
  [neg(MINOR_THIRD), 0, PERFECT_UNISON],
  [PERFECT_UNISON, 500, PERFECT_UNISON],
  [PERFECT_UNISON, -500, PERFECT_UNISON],
  [neg(PERFECT_UNISON), 500, PERFECT_UNISON],
])("tests", (interval: Interval, num: number, expectedInterval: Interval) => {
  it(`${String(interval)} * ${num} = ${String(expectedInterval)}`, () => {
    const actual = mult(interval, num);

    expect(actual).toBe(expectedInterval);
  } );
} );
