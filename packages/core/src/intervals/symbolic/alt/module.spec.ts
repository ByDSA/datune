import { Intervals } from ".";
import { TestInit } from "tests";

TestInit.diatonicAltInterval();

describe("lazy properties should be defined", () => {
  it("building", () => {
    expect(Intervals.between).toBeDefined();
    expect(Intervals.betweenNext).toBeDefined();
    expect(Intervals.fromIntervalQuality).toBeDefined();
    expect(Intervals.fromIntervals).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Intervals.PERFECT_UNISON).toBeDefined();
    expect(Intervals.MAJOR_THIRD).toBeDefined();
    expect(Intervals.PERFECT_FIFTH).toBeDefined();
    expect(Intervals.DOUBLY_AUGMENTED_FIFTEENTH).toBeDefined();
  } );

  it("modifiers", () => {
    expect(Intervals.serie).toBeDefined();
    expect(Intervals.abs).toBeDefined();
    expect(Intervals.add).toBeDefined();
    expect(Intervals.cyclic).toBeDefined();
    expect(Intervals.mult).toBeDefined();
    expect(Intervals.neg).toBeDefined();
    expect(Intervals.simplify).toBeDefined();
    expect(Intervals.sub).toBeDefined();
  } );

  it("conversions", () => {
    expect(Intervals.toChromaticInterval).toBeDefined();
  } );
} );
