import { Keys } from ".";
import { TestInit } from "tests";

TestInit.diatonicAltKey();

describe("static properties should be defined", () => {
  it("modifiers", () => {
    expect(Keys.rootChord3).toBeDefined();
    expect(Keys.rootChord4).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("building", () => {
    expect(Keys.from).toBeDefined();
  } );

  it("conversions", () => {
    expect(Keys.hash).toBeDefined();
    expect(Keys.toChromatic).toBeDefined();
    expect(Keys.toDto).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Keys.C).toBeDefined();
    expect(Keys.Cm).toBeDefined();
    expect(Keys.Bm).toBeDefined();
  } );
} );
