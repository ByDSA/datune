import type { Interval } from "intervals/alt";
import { Intervals } from "intervals/alt";
import { Intervals as DIntervals } from "intervals/diatonic";
import { TestInit } from "tests";
import { bIII, bVII, I, VII } from "../constants";
import { add, sub } from ".";

TestInit.diatonicAltDegree();
TestInit.diatonicAltInterval();
TestInit.diatonicInterval();

describe("tests", () => {
  const { UNISON } = DIntervals;
  const { m3, P1 } = Intervals;

  describe("add", () => {
    it("bVII + a1 = VII", () => {
      const degree = bVII;
      const dInterval = UNISON;
      const interval = Intervals.fromIntervals( {
        chromaticInterval: 1,
        diatonicInterval: dInterval,
      } ) as Interval;
      const sum = add(degree, interval);
      const expected = VII;

      expect(sum).toEqual(expected);
    } );

    it("i + m3 = bIII", () => {
      const degree = I;
      const interval = m3;
      const sum = add(degree, interval);
      const expected = bIII;

      expect(sum).toEqual(expected);
    } );

    it("i + P1 = I", () => {
      const degree = I;
      const dInterval = P1;
      const sum = add(degree, dInterval);
      const expected = I;

      expect(sum).toBe(expected);
    } );
  } );

  it("withSub: I - P1 = I", () => {
    const degree = I;
    const dInterval = P1;
    const sum = sub(degree, dInterval);
    const expected = I;

    expect(sum).toBe(expected);
  } );
} );
