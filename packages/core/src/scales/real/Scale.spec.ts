import { Intervals } from "intervals/real";
import { TestInit } from "tests";
import { ET12_MAJOR, PT_MAJOR } from "./constants";

TestInit.realScale();

describe("tests", () =>{
  // eslint-disable-next-line max-len
  const { ET12_M2, ET12_M7, ET12_M6, ET12_M3, ET12_P5, ET12_P4, PT_M2, PT_M7, PT_M6, PT_M3, PT_P5, PT_P4, UNISON } = Intervals;

  it("precalc - MAJOR 12-ET", () => {
    const scale = ET12_MAJOR;

    expect(scale).toBeDefined();
  } );

  it("intraintervals: MAJOR ET-12", () => {
    const scale = ET12_MAJOR;
    const { intraIntervals } = scale;

    expect(intraIntervals).toStrictEqual([
      UNISON,
      ET12_M2,
      ET12_M3,
      ET12_P4,
      ET12_P5,
      ET12_M6,
      ET12_M7,
    ]);
  } );

  it("intervals: MAJOR PYTHAGOREAN", () => {
    const scale = PT_MAJOR;
    const { intraIntervals } = scale;

    expect(intraIntervals).toStrictEqual([
      UNISON,
      PT_M2,
      PT_M3,
      PT_P4,
      PT_P5,
      PT_M6,
      PT_M7,
    ]);
  } );
} );
