import { fromIntervals as DAIFromIntervals, Interval, MINOR_THIRD, PERFECT_UNISON } from "intervals/alt";
import { UNISON } from "intervals/diatonic";
import { TestInit } from "tests";
import { add, sub } from ".";
import { bIII, bVII, I, VII } from "../constants";

beforeAll(() => {
  TestInit.diatonicAltDegree();
  TestInit.diatonicAltInterval();
  TestInit.diatonicInterval();
} );
describe("add", () => {
  it("bVII + a1 = VII", () => {
    const diatonicAltDegree = bVII;
    const diatonicInterval = UNISON;
    const intervalDiatonicAlt = DAIFromIntervals( {
      chromaticInterval: 1,
      diatonicInterval,
    } ) as Interval;
    const sum = add(diatonicAltDegree, intervalDiatonicAlt);
    const expected = VII;

    expect(sum).toEqual(expected);
  } );

  it("I + m3 = bIII", () => {
    const diatonicAltDegree = I;
    const intervalDiatonicAlt = MINOR_THIRD;
    const sum = add(diatonicAltDegree, intervalDiatonicAlt);
    const expected = bIII;

    expect(sum).toEqual(expected);
  } );

  it("I + P1 = I", () => {
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
