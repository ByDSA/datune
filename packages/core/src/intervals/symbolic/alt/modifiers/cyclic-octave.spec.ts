import { cyclicMod } from "datils/math";
import { IntervalDirection, Intervals as DI } from "diatonic";
import { expectInterval } from "../tests/interval";
import { Intervals as I, type Interval } from "..";
import { cyclicOctave } from "./cyclic-octave";

describe.each([
  [I.P4, I.P4],
  [I.P11, I.P4],
  [I.m2.withNeg(), I.M7],
  [I.M7.withNeg(), I.m2],
  [I.P5.withNeg(), I.P4],
  [I.P12.withNeg(), I.P4],
  [I.a7, I.a7],
  [I.a7.withNeg(), I.d2],
  [I.d8, I.d1],
  [I.d1.withNeg(), I.a1],
  [I.d8.withNeg(), I.a1],
  [I.d15.withNeg(), I.a1],
])("tests", (interval, expected) => {
  describe(`${String(interval)} => ${String(expected)}`, () => {
    let actual: Interval;

    beforeAll(()=> {
      actual = cyclicOctave(interval);
    } );

    it(`${String(interval)} => ${String(expected)}`, () => {
      expectInterval(actual, expected);
    } );

    it("semitones should match", () => {
      const actualChromatic = cyclicMod(cyclicOctave(interval).toChromaticInterval(), 12);
      const expectedChromatic = cyclicMod(expected.toChromaticInterval(), 12);

      expect(actualChromatic).toBe(expectedChromatic);
    } );

    it("should to be ascendent interval", () => {
      expect(actual.diatonicInterval.direction).toBe(IntervalDirection.ASCENDENT);
    } );

    it("should to be lower than octave", () => {
      expect(actual.diatonicInterval.magnitude).toBeLessThan(DI.OCTAVE.magnitude);
    } );

    if (interval.diatonicInterval.direction === IntervalDirection.DESCENDENT) {
      it(`abs(simplify(${interval})) + (${expected}) should sum up an octave or P1`, () => {
        const shouldBeAnOctave = interval
          .withSimplified()
          .withNeg()
          .withShifted(expected);

        expect(shouldBeAnOctave === I.P8 || shouldBeAnOctave === I.P1).toBeTruthy();
      } );
    }
  } );
} );
