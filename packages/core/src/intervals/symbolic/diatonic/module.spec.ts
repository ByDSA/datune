import { UNISON } from "./constants";
import { Intervals } from ".";
import { TestInit } from "tests";

TestInit.diatonicInterval();

describe("static properties should be defined", () => {
  it("others", () => {
    expect(Intervals.fromInt).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("modifiers", () => {
    expect(Intervals.abs).toBeDefined();
    expect(Intervals.add).toBeDefined();
    expect(Intervals.neg).toBeDefined();
    expect(Intervals.simplify).toBeDefined();
    expect(Intervals.sub).toBeDefined();
  } );

  it("isMainInterval", () => {
    expect(Intervals.isMainInterval).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Intervals.UNISON).toBeDefined();
    expect(Intervals.THIRD).toBeDefined();
    expect(Intervals.FIFTEENTH).toBeDefined();
  } );
} );

it("should be same ref", () => {
  expect(UNISON).toBe(Intervals.UNISON);
} );
