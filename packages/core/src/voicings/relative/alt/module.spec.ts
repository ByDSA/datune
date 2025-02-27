import { TestInit } from "tests";
import { Voicings } from ".";

TestInit.diatonicAltVoicing();

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Voicings.fromIntraIntervals).toBeDefined();
    expect(Voicings.fromRootIntervals).toBeDefined();
    expect(Voicings.fromVoicings).toBeDefined();
  } );

  it("caching", () => {
    expect(Voicings.hashDto).toBeDefined();
    expect(Voicings.hash).toBeDefined();
  } );

  it("modifiers", () => {
    expect(Voicings.inv).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("conversions", () => {
    expect(Voicings.toChromaticInterval).toBeDefined();
    expect(Voicings.toDiatonicInterval).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Voicings.POWER_CHORD).toBeDefined();
    expect(Voicings.MINOR_SECOND).toBeDefined();
    expect(Voicings.SEVENTH).toBeDefined();
    expect(Voicings.THIRTEENTH_MAJ13_a5b9).toBeDefined();
    expect(Voicings.COMMON.size).toBeGreaterThan(0);
    expect(Voicings.COMMON_NON_INVERSIONS.size).toBe(55);
  } );
} );
