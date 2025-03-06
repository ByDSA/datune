import type { RhythmPattern } from "./Pattern";
import { RhythmPatterns as RP } from ".";

const { CINQUILLO, QUARTER, QUARTER_THIRD, RUMBA, THIRD, TRESILLO } = RP;

describe.each([
  QUARTER, THIRD, QUARTER_THIRD, TRESILLO, CINQUILLO, RUMBA,
])("constants", (pattern: RhythmPattern) => {
  it("defined", () => {
    expect(pattern).toBeDefined();
  } );
} );
