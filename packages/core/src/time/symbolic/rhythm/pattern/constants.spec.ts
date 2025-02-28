import { CINQUILLO, QUARTER, QUARTER_THIRD, RUMBA, THIRD, TRESILLO } from "./constants";
import type { Pattern } from "./Pattern";
import { TestInit } from "tests";

beforeAll(() => {
  TestInit.rhythmPattern();
} );

describe.each([
  QUARTER, THIRD, QUARTER_THIRD, TRESILLO, CINQUILLO, RUMBA,
])("constants", (pattern: Pattern) => {
  it("defined", () => {
    expect(pattern).toBeDefined();
  } );
} );
