import { Pitches as P, Voicings as V } from "chromatic";
import { Chords as AC } from "alt";
import { Chords as C } from ".";

describe("withShift", () => {
  it("c7 + 2 = D7", () => {
    const actual = C.C7.withShift(2);
    const expected = C.D7;

    expect(actual).toBe(expected);
  } );

  it("c7 + (-1) = B7", () => {
    const actual = C.C7.withShift(-1);
    const expected = C.B7;

    expect(actual).toBe(expected);
  } );

  it("c7 - 1 = B7", () => {
    const actual = C.C7.withShiftDown(1);
    const expected = C.B7;

    expect(actual).toBe(expected);
  } );

  it("c7 + (-1) = c7 - 1", () => {
    const a = C.C7.withShift(-1);
    const b = C.C7.withShiftDown(1);

    expect(a).toBe(b);
  } );
} );

describe("withInv", ()=> {
  it("inv 1", () => {
    const expected = C.inv(C.C);
    const actual = C.C.withInv();

    expect(actual).toBe(expected);
  } );

  it("inv 2", () => {
    const expected = C.inv(C.C, 2);
    const actual = C.C.withInv(2);

    expect(actual).toBe(expected);
  } );
} );

describe("withBass", ()=> {
  it("test", () => {
    const expected = C.bass(C.C, P.E);
    const actual = C.C.withBass(P.E);

    expect(actual).toBe(expected);
  } );
} );

describe("toVoicing", ()=> {
  it("test", () => {
    const expected = C.C.toVoicing();
    const actual = V.TRIAD_MAJOR;

    expect(actual).toBe(expected);
  } );
} );

describe("toAlt", () => {
  it("test", () => {
    const expected = AC.FFm;
    const base = C.FFm;
    const actual = base.toAlt();

    expect(actual).toBe(expected);

    expect(actual.toChromatic()).toBe(base);
  } );
} );
