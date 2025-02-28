import { PERFECT_UNISON } from "./constants";
import { Intervals } from ".";

describe("static properties should be defined", () => {
  it("building", () => {
    expect(Intervals.between).toBeDefined();
    expect(Intervals.betweenNext).toBeDefined();
    expect(Intervals.betweenSPN).toBeDefined();
  } );

  it("constants (some)", () => {
    expect(Intervals.PERFECT_UNISON).toBeDefined();
    expect(Intervals.MAJOR_THIRD).toBeDefined();
    expect(Intervals.PERFECT_FIFTEENTH).toBeDefined();
  } );

  it("modifiers", () => {
    expect(Intervals.add).toBeDefined();
    expect(Intervals.sub).toBeDefined();
    expect(Intervals.neg).toBeDefined();
    expect(Intervals.simplify).toBeDefined();
    expect(Intervals.octaves).toBeDefined();
    expect(Intervals.abs).toBeDefined();
  } );
} );

it("should be same ref", () => {
  expect(PERFECT_UNISON).toBe(Intervals.PERFECT_UNISON);
} );
