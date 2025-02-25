import { CI_MAJOR_SEVENTH, CI_MINOR_NINTH, CI_MINOR_SECOND, CI_PERFECT_FIFTH, CI_PERFECT_OCTAVE } from "intervals";
import { TestInit } from "tests";
import { AUGMENTED_OCTAVE, AUGMENTED_SEVENTH, AUGMENTED_UNISON, DIMINISHED_OCTAVE, DIMINISHED_UNISON, PERFECT_FIFTH, PERFECT_OCTAVE } from "../constants";
import { neg } from "../modifiers";
import toChromaticInterval from "./chromaticInterval";

TestInit.diatonicAltInterval();
describe.each([
  [AUGMENTED_UNISON, CI_MINOR_SECOND],
  [DIMINISHED_UNISON, -CI_MINOR_SECOND],
  [PERFECT_FIFTH, CI_PERFECT_FIFTH],
  [PERFECT_OCTAVE, CI_PERFECT_OCTAVE],
  [AUGMENTED_SEVENTH, CI_PERFECT_OCTAVE],
  [DIMINISHED_OCTAVE, CI_MAJOR_SEVENTH],
  [AUGMENTED_OCTAVE, CI_MINOR_NINTH],
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
