import { Pitches as P } from "pitches/alt";
import { fromPitchOctave } from "..";
import { Spns as N } from "../..";

const { B4, C4, FF4 } = N;

describe("range", () => {
  describe("below limit", () => {
    it("min value -1 from below", () => {
      const actual = fromPitchOctave(P.B, -2);

      expect(actual).toBeNull();
    } );

    it("min value -1 from above", () => {
      const actual = fromPitchOctave(P.Cb, -1);

      expect(actual).toBeDefined();
    } );

    it("min value from above", () => {
      const actual = fromPitchOctave(P.C, -1);

      expect(actual).toBeDefined();
    } );

    it("min value from below", () => {
      const actual = fromPitchOctave(P.BB, -2);

      expect(actual).toBeNull();
    } );
  } );

  describe("above limit", () => {
    it("max value from below", () => {
      const actual = fromPitchOctave(P.B, 10);

      expect(actual).toBeDefined();
    } );

    it("max value from above", () => {
      const actual = fromPitchOctave(P.Cb, 11);

      expect(actual).toBeNull();
    } );

    it("max value +1 from below", () => {
      const actual = fromPitchOctave(P.BB, 10);

      expect(actual).toBeDefined();
    } );

    it("max value +1 from above", () => {
      const actual = fromPitchOctave(P.C, 11);

      expect(actual).toBeNull();
    } );
  } );

  it("in range", () => {
    const expected = C4;
    const actual = fromPitchOctave(P.C, 4);

    expect(actual).toBe(expected);
  } );

  it("out of range", () => {
    const actual = fromPitchOctave(P.C, 15);

    expect(actual).toBeNull();
  } );
} );

describe("enharmonic", () => {
  it("fF, 4 === Gb, 4", () => {
    const expected = FF4;
    const actual = fromPitchOctave(P.Gb, 4);

    expect(actual).not.toBe(expected);
  } );

  it("bB, 4 === C, 4", () => {
    const expected = C4;
    const actual = fromPitchOctave(P.BB, 4);

    expect(actual).not.toBe(expected);
  } );

  it("cb, 4 === B, 4", () => {
    const expected = B4;
    const actual = fromPitchOctave(P.Cb, 4);

    expect(actual).not.toBe(expected);
  } );
} );
