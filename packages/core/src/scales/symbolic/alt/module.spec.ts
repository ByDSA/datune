import { TestInit } from "tests";
import { Scales } from ".";

TestInit.diatonicAltScale();

describe("lazy properties should be defined", () => {
  it("building", () => {
    expect(Scales.fromDegrees).toBeDefined();
    expect(Scales.fromDiatonicAlts).toBeDefined();
    expect(Scales.generateByIntervals).toBeDefined();
    expect(Scales.fromIntraIntervals).toBeDefined();
    expect(Scales.fromRootIntervals).toBeDefined();
  } );

  it("modifiers", () => {
    expect(Scales.getDegreeFunctions).toBeDefined();
    expect(Scales.calcIntraIntervals).toBeDefined();
    expect(Scales.mode).toBeDefined();
    expect(Scales.getModeIntraIntervals).toBeDefined();
    expect(Scales.modes).toBeDefined();
  } );

  it("conversions", () => {
    expect(Scales.toChromatic).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Scales.MAJOR).toBeDefined();
    expect(Scales.MINOR).toBeDefined();
    expect(Scales.BEBOP_HARMONIC_MINOR).toBeDefined();
    expect(Scales.DIATONIC_SCALES.size).toBe(7);
    expect(Scales.COMMON.size).toBeGreaterThan(0);
    expect(Scales.SYMMETRIC_SCALES.size).toBeGreaterThan(0);
  } );
} );
