import { Scales } from ".";
import { TestInit } from "tests";

TestInit.realScale();

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Scales.fromIntervals).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("constants", () => {
    expect(Scales.ET12_MAJOR).toBeDefined();
    expect(Scales.PT_MAJOR).toBeDefined();
  } );
} );
