import { Chords as AC } from "alt";
import { Chords as C } from "chromatic";

describe("toAlt", () => {
  it("test", () => {
    const expected = AC.FFm;
    const base = C.FFm;
    const actual = base.toAlt();

    expect(actual).toBe(expected);

    expect(actual.toChromatic()).toBe(base);
  } );
} );
