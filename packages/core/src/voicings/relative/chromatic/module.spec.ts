import { TestInit } from "tests";
import { inv } from "./modifiers";
import { Voicings } from ".";

TestInit.chromaticVoicing();

describe("static properties should be defined", () => {
  it("modifiers", () => {
    expect(Voicings.inv).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("building", () => {
    expect(Voicings.fromIntraIntervals).toBeDefined();
    expect(Voicings.fromRootIntervals).toBeDefined();
    expect(Voicings.fromPitches).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Voicings.MINOR_SECOND).toBeDefined();
    expect(Voicings.THIRTEENTH_b5b9).toBeDefined();
    expect(Voicings.COMMON).toBeDefined();
    expect(Voicings.COMMON_NON_INVERSIONS).toBeDefined();
    expect(Voicings.COMMON.size).toBeGreaterThan(0);
    expect(Voicings.COMMON_NON_INVERSIONS.size).toBeGreaterThan(0);
  } );
} );

it("allNonInversions is fine", () => {
  const voicings = Voicings.COMMON_NON_INVERSIONS;

  for (const v of voicings) {
    let pInv = v;

    for (let i = 1; i < v.length; i++) {
      pInv = inv(pInv);

      if (pInv === v) // simétrico
        break;

      expect(voicings).not.toContain(pInv);
    }
  }
} );
