import { AUGMENTED_OCTAVE, AUGMENTED_SEVENTH, AUGMENTED_UNISON, DIMINISHED_OCTAVE, DIMINISHED_UNISON, PERFECT_FIFTH, PERFECT_OCTAVE } from "../constants";
import { neg } from "../modifiers/neg";
import { toChromaticInterval } from "./chromaticInterval";
import { TestInit } from "tests";
import { Intervals as CIntervals } from "intervals/chromatic";

// eslint-disable-next-line max-len
const { MAJOR_SEVENTH: C_MAJOR_SEVENTH, MINOR_NINTH: C_MINOR_NINTH, MINOR_SECOND: C_MINOR_SECOND, PERFECT_FIFTH: C_PERFECT_FIFTH, PERFECT_OCTAVE: C_PERFECT_OCTAVE } = CIntervals;

TestInit.diatonicAltInterval();

describe.each([
  [AUGMENTED_UNISON, C_MINOR_SECOND],
  [DIMINISHED_UNISON, -C_MINOR_SECOND],
  [PERFECT_FIFTH, C_PERFECT_FIFTH],
  [PERFECT_OCTAVE, C_PERFECT_OCTAVE],
  [AUGMENTED_SEVENTH, C_PERFECT_OCTAVE],
  [DIMINISHED_OCTAVE, C_MAJOR_SEVENTH],
  [AUGMENTED_OCTAVE, C_MINOR_NINTH],
])("tests", (interval, expected) => {
  it(`${String(interval)} => ${expected}`, () => {
    const actual = toChromaticInterval(interval);

    expect(actual).toBe(expected);
  } );

  it(`negative: ${String(neg(interval))} => ${-expected}`, () => {
    const actual = toChromaticInterval(neg(interval));

    expect(actual).toBe(-expected);
  } );
} );
