import { DIMINISHED_FIFTH, MAJOR_SECOND, MAJOR_SEVENTH, MAJOR_SIXTH, MAJOR_THIRD, MINOR_SECOND, MINOR_SEVENTH, MINOR_SIXTH, MINOR_THIRD, PERFECT_FIFTH, PERFECT_FOURTH, PERFECT_OCTAVE, PERFECT_UNISON } from "intervals/chromatic";
import { ET12_PERFECT_FIFTH, ET12_PERFECT_FOURTH, J_DIMINISHED_FIFTH, J_MAJOR_SEVENTH, J_MAJOR_SIXTH, J_MAJOR_THIRD, J_MAJOR_TONE, J_MINOR_SECOND, J_MINOR_SEVENTH_GREATER, J_MINOR_SEVENTH_SMALL, J_MINOR_SIXTH, J_MINOR_THIRD, J_MINOR_TONE, J_PERFECT_FIFTH, J_PERFECT_FOURTH, OCTAVE, PT_DIMINISHED_FIFTH, PT_MAJOR_SECOND, PT_MAJOR_SEVENTH, PT_MAJOR_SIXTH, PT_MAJOR_THIRD, PT_MINOR_SECOND, PT_MINOR_SEVENTH, PT_MINOR_SIXTH, PT_MINOR_THIRD, PT_PERFECT_FIFTH, PT_PERFECT_FOURTH, UNISON } from "intervals/real";
import { TestInit } from "tests";
import { ET12, LIMIT_5_SYMMETRIC_N1, LIMIT_5_SYMMETRIC_N2, PYTHAGOREAN } from ".";

TestInit.chromaticTemperament();
describe.each([
  [ET12, PERFECT_UNISON, UNISON],
  [ET12, PERFECT_FIFTH, ET12_PERFECT_FIFTH],
  [ET12, PERFECT_FOURTH, ET12_PERFECT_FOURTH],
  [ET12, PERFECT_OCTAVE, OCTAVE],
  [LIMIT_5_SYMMETRIC_N1, PERFECT_UNISON, UNISON],
  [LIMIT_5_SYMMETRIC_N1, MINOR_SECOND, J_MINOR_SECOND],
  [LIMIT_5_SYMMETRIC_N1, MAJOR_SECOND, J_MAJOR_TONE],
  [LIMIT_5_SYMMETRIC_N1, MINOR_THIRD, J_MINOR_THIRD],
  [LIMIT_5_SYMMETRIC_N1, MAJOR_THIRD, J_MAJOR_THIRD],
  [LIMIT_5_SYMMETRIC_N1, PERFECT_FOURTH, J_PERFECT_FOURTH],
  [LIMIT_5_SYMMETRIC_N1, DIMINISHED_FIFTH, J_DIMINISHED_FIFTH],
  [LIMIT_5_SYMMETRIC_N1, PERFECT_FIFTH, J_PERFECT_FIFTH],
  [LIMIT_5_SYMMETRIC_N1, MINOR_SIXTH, J_MINOR_SIXTH],
  [LIMIT_5_SYMMETRIC_N1, MAJOR_SIXTH, J_MAJOR_SIXTH],
  [LIMIT_5_SYMMETRIC_N1, MINOR_SEVENTH, J_MINOR_SEVENTH_SMALL],
  [LIMIT_5_SYMMETRIC_N1, MAJOR_SEVENTH, J_MAJOR_SEVENTH],
  [LIMIT_5_SYMMETRIC_N1, PERFECT_OCTAVE, OCTAVE],
  [LIMIT_5_SYMMETRIC_N2, MAJOR_SECOND, J_MINOR_TONE],
  [LIMIT_5_SYMMETRIC_N2, MINOR_SEVENTH, J_MINOR_SEVENTH_GREATER],
  [LIMIT_5_SYMMETRIC_N2, PERFECT_OCTAVE, OCTAVE],
  [PYTHAGOREAN, PERFECT_UNISON, UNISON],
  [PYTHAGOREAN, MINOR_SECOND, PT_MINOR_SECOND],
  [PYTHAGOREAN, MAJOR_SECOND, PT_MAJOR_SECOND],
  [PYTHAGOREAN, MINOR_THIRD, PT_MINOR_THIRD],
  [PYTHAGOREAN, MAJOR_THIRD, PT_MAJOR_THIRD],
  [PYTHAGOREAN, PERFECT_FOURTH, PT_PERFECT_FOURTH],
  [PYTHAGOREAN, DIMINISHED_FIFTH, PT_DIMINISHED_FIFTH],
  [PYTHAGOREAN, PERFECT_FIFTH, PT_PERFECT_FIFTH],
  [PYTHAGOREAN, MINOR_SIXTH, PT_MINOR_SIXTH],
  [PYTHAGOREAN, MAJOR_SIXTH, PT_MAJOR_SIXTH],
  [PYTHAGOREAN, MINOR_SEVENTH, PT_MINOR_SEVENTH],
  [PYTHAGOREAN, MAJOR_SEVENTH, PT_MAJOR_SEVENTH],
  [PYTHAGOREAN, PERFECT_OCTAVE, OCTAVE],
])("conversion", (temperament, interval, expected) => {
  it(`temperament=${temperament} interval=${interval} => ${expected}`, () => {
    const actual = temperament(interval);

    expect(actual).toBe(expected);
  } );
} );

// alt:
/*
it("Pythagorean - A to A#4 - AUGMENTED UNISON", () => {
  const noteAlt = DA_AA;
  const root = DA_A;
  const intervalDiatonicAlt: IntervalDiatonicAlt = DAIBetween(root, noteAlt);
  const actual: number = PYTHAGOREAN(intervalDiatonicAlt).ratio.value;
  const expected: number = 1.06787109375;

  expect(actual).toBeCloseTo(expected);
} );
*/
