import { Functions } from ".";
import { TestInit } from "tests";

TestInit.diatonicAltFunction();

describe("static properties should be defined", () => {
  it("calcs/building", () => {
    expect(Functions.calcDegrees).toBeDefined();
    expect(Functions.compose).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Functions.I).toBeDefined();
    expect(Functions.V).toBeDefined();
    expect(Functions.V_V).toBeDefined();
    expect(Functions.V7ALT).toBeDefined();
  } );
} );
