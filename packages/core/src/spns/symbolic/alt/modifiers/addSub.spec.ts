import { DIMINISHED_FIFTH, DOUBLY_AUGMENTED_FOURTH, Interval as IntervalDiatonicAlt, PERFECT_FIFTH, PERFECT_OCTAVE, PERFECT_UNISON } from "intervals/alt";
import { BBB, Dbb, Gb } from "pitches/alt";
import { TestInit } from "tests";
import { add, sub } from ".";
import { fromPitchOctave } from "../building";
import { C4, C5, CC5, FF4, G4 } from "../constants";
import SPN from "../SPN";

TestInit.diatonicAltSPN();
TestInit.diatonicAltInterval();

const withShiftCases = <[SPN, IntervalDiatonicAlt, SPN][]>[
  [C4, PERFECT_UNISON, C4],
  [C4, PERFECT_OCTAVE, C5],
  [C4, PERFECT_FIFTH, G4],
  [FF4, DIMINISHED_FIFTH, C5],
  [FF4, DOUBLY_AUGMENTED_FOURTH, fromPitchOctave(BBB, 4)],
  [fromPitchOctave(Gb, 4), DIMINISHED_FIFTH, fromPitchOctave(Dbb, 5)],
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
