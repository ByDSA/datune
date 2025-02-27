import { Pitches as P } from ".";
import { TestInit } from "tests";

TestInit.diatonicAlt();

describe("static properties should be defined", () => {
  it("modifiers", () => {
    expect(P.add).toBeDefined();
    expect(P.rootIntervals).toBeDefined();
    expect(P.sub).toBeDefined();
  } );

  it("others", () => {
    expect(P.calcAlts).toBeDefined();
    expect(P.fixAlts).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("conversions", () => {
    expect(P.toChromatic).toBeDefined();
    expect(P.hash).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(P.C).toBeDefined();
    expect(P.CCCC).toBeDefined();
    expect(P.Bbbb).toBeDefined();
    expect(P.ALL).toBeDefined();
  } );

  it("building/chromatic", () => {
    expect(P.fromChromatic).toBeDefined();
  } );

  it("building/diatonicAlts", () => {
    expect(P.fromDiatonicAlts).toBeDefined();
  } );
} );
