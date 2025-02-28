import { fromPitchOctave } from "../building/pitch-octave";
import { C4, C5, CC5, FF4, G4 } from "../constants";
import type { SPN } from "../SPN";
import { add } from "./add";
import { sub } from "./sub";
import type { Interval as CInterval } from "intervals/chromatic";
import { Intervals } from "intervals/chromatic";
import { Pitches } from "pitches/chromatic";
import { TestInit } from "tests";

TestInit.chromaticSPN();

describe("tests", () => {
  const { DIMINISHED_FIFTH, PERFECT_FIFTH, PERFECT_OCTAVE, PERFECT_UNISON } = Intervals;
  const withShiftCases = <[SPN, CInterval, SPN][]>[
    [C4, PERFECT_UNISON, C4],
    [C4, PERFECT_OCTAVE, C5],
    [C4, PERFECT_FIFTH, G4],
    [FF4, DIMINISHED_FIFTH, C5],
    [FF4, PERFECT_FIFTH, fromPitchOctave(Pitches.CC, 5)],
    [fromPitchOctave(Pitches.Gb, 4), DIMINISHED_FIFTH, fromPitchOctave(Pitches.C, 5)],
    [FF4, PERFECT_FIFTH, CC5],
  ];

  describe.each(withShiftCases)("add-sub", (base: SPN, interval: CInterval, expected: SPN) => {
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
