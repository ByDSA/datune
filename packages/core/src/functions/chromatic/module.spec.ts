import { TestInit } from "tests";
import { Functions } from ".";

TestInit.chromaticFunction();

describe("static properties should be defined", () => {
  it("calcs/building", () => {
    expect(Functions.from).toBeDefined();
    expect(Functions.compose).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Functions.I).toBeDefined();
    expect(Functions.V).toBeDefined();
    expect(Functions.V_V).toBeDefined();
    expect(Functions.V7ALT).toBeDefined();
  } );
} );
