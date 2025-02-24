import { TestInit } from "tests";
import { CINQUILLO, QUARTER, QUARTER_THIRD, RUMBA, THIRD, TRESILLO } from "./constants";
import Pattern from "./Pattern";

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
