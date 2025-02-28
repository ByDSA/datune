import { fromPitchOctave } from "../building";
import { C4, C5, CC5, FF4, G4 } from "../constants";
import type { SPN } from "../SPN";
import { add, sub } from ".";
import type { Interval } from "intervals/alt";
import { Intervals } from "intervals/alt";
import { Pitches } from "pitches/alt";
import { TestInit } from "tests";

TestInit.diatonicAltSPN();
TestInit.diatonicAltInterval();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { BBB, Dbb, Gb } = Pitches;
  // eslint-disable-next-line max-len
  const { DIMINISHED_FIFTH, DOUBLY_AUGMENTED_FOURTH, PERFECT_FIFTH, PERFECT_OCTAVE, PERFECT_UNISON } = Intervals;
  const withShiftCases = <[SPN, Interval, SPN][]>[
    [C4, PERFECT_UNISON, C4],
    [C4, PERFECT_OCTAVE, C5],
    [C4, PERFECT_FIFTH, G4],
    [FF4, DIMINISHED_FIFTH, C5],
    [FF4, DOUBLY_AUGMENTED_FOURTH, fromPitchOctave(BBB, 4)],
    [fromPitchOctave(Gb, 4), DIMINISHED_FIFTH, fromPitchOctave(Dbb, 5)],
    [FF4, PERFECT_FIFTH, CC5],
  ];

  describe.each(withShiftCases)("add-sub", (base: SPN, interval: Interval, expected: SPN) => {
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
} );
