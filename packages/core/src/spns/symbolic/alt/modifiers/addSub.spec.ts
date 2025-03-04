import type { SPN } from "../SPN";
import type { Interval } from "intervals/alt";
import { Intervals } from "intervals/alt";
import { Pitches } from "pitches/alt";
import { TestInit } from "tests";
import { C4, C5, CC5, FF4, G4 } from "../constants";
import { fromPitchOctave } from "../building";
import { add, sub } from ".";

TestInit.diatonicAltSPN();
TestInit.diatonicAltInterval();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { BBB, Dbb, Gb } = Pitches;
  const { d5, da4, P5, P8, P1 } = Intervals;
  const withShiftCases = <[SPN, Interval, SPN][]>[
    [C4, P1, C4],
    [C4, P8, C5],
    [C4, P5, G4],
    [FF4, d5, C5],
    [FF4, da4, fromPitchOctave(BBB, 4)],
    [fromPitchOctave(Gb, 4), d5, fromPitchOctave(Dbb, 5)],
    [FF4, P5, CC5],
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
