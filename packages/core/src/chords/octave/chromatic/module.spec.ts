import { TestInit } from "tests";
import { Chords } from ".";

TestInit.chromaticChord();

describe("static properties should be defined", () => {
  it("modifiers", () => {
    expect(Chords.inv).toBeDefined();
    expect(Chords.add).toBeDefined();
    expect(Chords.sub).toBeDefined();
    expect(Chords.bass).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("building", () => {
    expect(Chords.fromKeyFunction).toBeDefined();
    expect(Chords.fromPitches).toBeDefined();
    expect(Chords.fromRootVoicing).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Chords.C).toBeDefined();
    expect(Chords.CC5).toBeDefined();
    expect(Chords.B9).toBeDefined();
    expect(Chords.ALL.length).toBeGreaterThan(0);
    expect(Chords.ALL_NON_INVERSIONS.length).toBeGreaterThan(0);
  } );

  it("conversions", () => {
    expect(Chords.toVoicing).toBeDefined();
  } );
} );
