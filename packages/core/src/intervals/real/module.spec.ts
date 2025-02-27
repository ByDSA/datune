import { Intervals } from ".";
import { TestInit } from "tests";

TestInit.realInterval();

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Intervals.fromCents).toBeDefined();
    expect(Intervals.dtoHash).toBeDefined();
    expect(Intervals.from).toBeDefined();
  } );

  it("independent modifiers", () => {
    expect(Intervals.add).toBeDefined();
    expect(Intervals.sub).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("modifiers", () => {
    expect(Intervals.shiftOctaves).toBeDefined();
    expect(Intervals.mult).toBeDefined();
    expect(Intervals.neg).toBeDefined();
  } );

  it("conversions", () => {
    expect(Intervals.hash).toBeDefined();
    expect(Intervals.toDto).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Intervals.UNISON).toBeDefined();
    expect(Intervals.CENT).toBeDefined();
    expect(Intervals.OCTAVE).toBeDefined();
    expect(Intervals.ET12_TRITONE).toBeDefined();
    expect(Intervals.J_QUARTER_TONE).toBeDefined();
    expect(Intervals.PT_MAJOR_THIRD).toBeDefined();
  } );
} );
