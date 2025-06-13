import { Chords as AC } from "alt";
import { Chords as C } from "chromatic";

describe("toAltChord", () => {
  it("test", () => {
    const expected = AC.FFm;
    const base = C.FFm;
    const actual = base.toAltChord();

    expect(actual).toBe(expected);

    expect(actual.toChromaticChord()).toBe(base);
  } );
} );
