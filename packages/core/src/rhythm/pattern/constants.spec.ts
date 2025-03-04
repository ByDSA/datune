import type { RhythmPattern } from "./Pattern";
import { TestInit } from "tests";
import { CINQUILLO, QUARTER, QUARTER_THIRD, RUMBA, THIRD, TRESILLO } from "./constants";

beforeAll(() => {
  TestInit.rhythmPattern();
} );

describe.each([
  QUARTER, THIRD, QUARTER_THIRD, TRESILLO, CINQUILLO, RUMBA,
])("constants", (pattern: RhythmPattern) => {
  it("defined", () => {
    expect(pattern).toBeDefined();
  } );
} );
