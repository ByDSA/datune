import { Chords as C } from "..";
import { add } from ".";

describe("withShift", () => {
  it("c7 + 2 = D7", () => {
    const actual = add(C.C7, 2);
    const expected = C.D7;

    expect(actual).toBe(expected);
  } );

  it("c7 - 1 = B7", () => {
    const actual = add(C.C7, -1);
    const expected = C.B7;

    expect(actual).toBe(expected);
  } );
} );
