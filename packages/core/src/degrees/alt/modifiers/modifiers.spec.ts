import { bIII, bVII, I, VII } from "../constants";
import { add, sub } from ".";
import type { Interval } from "intervals/alt";
import { Intervals } from "intervals/alt";
import { Intervals as DIntervals } from "intervals/diatonic";
import { TestInit } from "tests";

TestInit.diatonicAltDegree();
TestInit.diatonicAltInterval();
TestInit.diatonicInterval();

describe("tests", () => {
  const { UNISON } = DIntervals;
  const { MINOR_THIRD, PERFECT_UNISON } = Intervals;

  describe("add", () => {
    it("bVII + a1 = VII", () => {
      const diatonicAltDegree = bVII;
      const diatonicInterval = UNISON;
      const intervalDiatonicAlt = Intervals.fromIntervals( {
        chromaticInterval: 1,
        diatonicInterval,
      } ) as Interval;
      const sum = add(diatonicAltDegree, intervalDiatonicAlt);
      const expected = VII;

      expect(sum).toEqual(expected);
    } );

    it("i + m3 = bIII", () => {
      const diatonicAltDegree = I;
      const intervalDiatonicAlt = MINOR_THIRD;
      const sum = add(diatonicAltDegree, intervalDiatonicAlt);
      const expected = bIII;

      expect(sum).toEqual(expected);
    } );

    it("i + P1 = I", () => {
      const diatonicAltDegree = I;
      const intervalDiatonicAlt = PERFECT_UNISON;
      const sum = add(diatonicAltDegree, intervalDiatonicAlt);
      const expected = I;

      expect(sum).toBe(expected);
    } );
  } );

  it("withSub: I - P1 = I", () => {
    const diatonicAltDegree = I;
    const intervalDiatonicAlt = PERFECT_UNISON;
    const sum = sub(diatonicAltDegree, intervalDiatonicAlt);
    const expected = I;

    expect(sum).toBe(expected);
  } );
} );
