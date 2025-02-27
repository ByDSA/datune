import { Degrees } from ".";
import { TestInit } from "tests";

TestInit.diatonicAltDegree();

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Degrees.from).toBeDefined();
    expect(Degrees.fromDegrees).toBeDefined();
  } );

  it("modifiers", () => {
    expect(Degrees.add).toBeDefined();
    expect(Degrees.sub).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("conversions", () => {
    expect(Degrees.toChromaticDegree).toBeDefined();
    expect(Degrees.toDto).toBeDefined();
    expect(Degrees.hash).toBeDefined();
    expect(Degrees.toInterval).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Degrees.I).toBeDefined();
    expect(Degrees.bII).toBeDefined();
    expect(Degrees.bVII).toBeDefined();
    expect(Degrees.aVII).toBeDefined();
  } );
} );
