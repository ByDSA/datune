import { Scales } from ".";
import { TestInit } from "tests";

TestInit.chromaticScale();

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Scales.generateByIntervals).toBeDefined();
    expect(Scales.fromIntraIntervals).toBeDefined();
    expect(Scales.fromRootIntervals).toBeDefined();
  } );

  it("caching", () => {
    expect(Scales.hashDto).toBeDefined();
    expect(Scales.hash).toBeDefined();
    expect(Scales.toDto).toBeDefined();
    expect(Scales.toObj).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("conversions", () => {
    expect(Scales.toAlt).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Scales.MAJOR).toBeDefined();
    expect(Scales.MINOR).toBeDefined();
    expect(Scales.MAJOR_SCALE_DEGREES).toBeDefined();
    expect(Scales.BEBOP_HARMONIC_MINOR).toBeDefined();
    expect(Scales.DIATONIC_SCALES.size).toBeGreaterThan(0);
    expect(Scales.COMMON.size).toBeGreaterThan(0);
  } );
} );
