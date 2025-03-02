import { Voicings } from ".";
import { TestInit } from "tests";

TestInit.diatonicVoicing();

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Voicings.fromRootIntervalInts).toBeDefined();
  } );

  it("modifiers", () => {
    expect(Voicings.inv).toBeDefined();
    expect(Voicings.add).toBeDefined();
    expect(Voicings.sub).toBeDefined();
    expect(Voicings.bass).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("constants (some)", () => {
    expect(Voicings.SECOND_INTERVAL).toBeDefined();
    expect(Voicings.SEVENTH_SUS4).toBeDefined();
  } );
} );
