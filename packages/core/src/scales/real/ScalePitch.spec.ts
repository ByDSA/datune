import { ET12_MAJOR, PT_MAJOR } from "./constants";
import { Intervals } from "intervals/real";
import { TestInit } from "tests";

TestInit.realScale();

describe("tests", () =>{
  const { ET12_MAJOR_SECOND, ET12_MAJOR_SEVENTH, ET12_MAJOR_SIXTH, ET12_MAJOR_THIRD, ET12_PERFECT_FIFTH, ET12_PERFECT_FOURTH, PT_MAJOR_SECOND, PT_MAJOR_SEVENTH, PT_MAJOR_SIXTH, PT_MAJOR_THIRD, PT_PERFECT_FIFTH, PT_PERFECT_FOURTH, UNISON } = Intervals;

  it("precalc - MAJOR 12-ET", () => {
    const scale = ET12_MAJOR;

    expect(scale).toBeDefined();
  } );

  it("intraintervals: MAJOR ET-12", () => {
    const scale = ET12_MAJOR;
    const { intraIntervals } = scale;

    expect(intraIntervals).toStrictEqual([
      UNISON,
      ET12_MAJOR_SECOND,
      ET12_MAJOR_THIRD,
      ET12_PERFECT_FOURTH,
      ET12_PERFECT_FIFTH,
      ET12_MAJOR_SIXTH,
      ET12_MAJOR_SEVENTH,
    ]);
  } );

  it("intervals: MAJOR PYTHAGOREAN", () => {
    const scale = PT_MAJOR;
    const { intraIntervals } = scale;

    expect(intraIntervals).toStrictEqual([
      UNISON,
      PT_MAJOR_SECOND,
      PT_MAJOR_THIRD,
      PT_PERFECT_FOURTH,
      PT_PERFECT_FIFTH,
      PT_MAJOR_SIXTH,
      PT_MAJOR_SEVENTH,
    ]);
  } );
} );
