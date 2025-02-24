import { DIMINISHED_FIFTH, Interval as IntervalDiatonicAlt, PERFECT_FIFTH, PERFECT_OCTAVE, PERFECT_UNISON } from "intervals/chromatic";
import { C, CC, Gb } from "pitches/chromatic";
import { TestInit } from "tests";
import { add, sub } from ".";
import { fromPitchOctave } from "../building";
import { C4, C5, CC5, FF4, G4 } from "../constants";
import SPN from "../SPN";

TestInit.chromaticSPN();
const withShiftCases = <[SPN, IntervalDiatonicAlt, SPN][]>[
  [C4, PERFECT_UNISON, C4],
  [C4, PERFECT_OCTAVE, C5],
  [C4, PERFECT_FIFTH, G4],
  [FF4, DIMINISHED_FIFTH, C5],
  [FF4, PERFECT_FIFTH, fromPitchOctave(CC, 5)],
  [fromPitchOctave(Gb, 4), DIMINISHED_FIFTH, fromPitchOctave(C, 5)],
  [FF4, PERFECT_FIFTH, CC5],
];

describe.each(withShiftCases)("add-sub", (base: SPN, interval: IntervalDiatonicAlt, expected: SPN) => {
  const baseName = base.toString();
  const intervalName = interval.toString();
  const expectedName = expected.toString();

  it(`add: ${baseName} + ${intervalName} = ${expectedName}`, () => {
    const actual = add(base, interval);

    expect(actual).toBe(expected);
  } );

  it(`sub: ${expectedName} - ${intervalName} = ${baseName}`, () => {
    const actual = sub(expected, interval);

    expect(actual).toBe(base);
  } );
} );
