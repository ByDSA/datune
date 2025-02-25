import { B, BB, C, Cb, Gb } from "pitches/chromatic";
import { TestInit } from "tests";
import { fromPitchOctave } from "..";
import { B4, C4, FF4 } from "../../constants";

TestInit.chromaticSPN();

describe("range", () => {
  describe("below limit", () => {
    it("min value -1 from below", () => {
      const actual = fromPitchOctave(B, -2);

      expect(actual).toBeNull();
    } );
    it("min value -1 from above", () => {
      const actual = fromPitchOctave(Cb, -1); // Cb, -1 === B-1

      expect(actual).toBeDefined();
    } );

    it("min value from above", () => {
      const actual = fromPitchOctave(C, -1);

      expect(actual).toBeDefined();
    } );

    it("min value from below", () => {
      const actual = fromPitchOctave(BB, -2); // BB, -2 === C-2

      expect(actual).toBeNull();
    } );
  } );

  describe("above limit", () => {
    it("max value from below", () => {
      const actual = fromPitchOctave(B, 10);

      expect(actual).toBeDefined();
    } );

    it("max value from above", () => {
      const actual = fromPitchOctave(Cb, 11); // Cb, 11 === B11

      expect(actual).toBeNull();
    } );
    it("max value +1 from below", () => {
      const actual = fromPitchOctave(BB, 10); // BB, 10 === C10

      expect(actual).toBeDefined();
    } );
    it("max value +1 from above", () => {
      const actual = fromPitchOctave(C, 11);

      expect(actual).toBeNull();
    } );
  } );

  it("in range", () => {
    const expected = C4;
    const actual = fromPitchOctave(C, 4);

    expect(actual).toBe(expected);
  } );

  it("out of range", () => {
    const actual = fromPitchOctave(C, 15);

    expect(actual).toBeNull();
  } );
} );

describe("enharmonic", () => {
  it("FF, 4 === Gb, 4", () => {
    const expected = FF4;
    const actual = fromPitchOctave(Gb, 4);

    expect(actual).toBe(expected);
  } );
  it("BB, 4 === C, 4", () => {
    const expected = C4;
    const actual = fromPitchOctave(BB, 4);

    expect(actual).toBe(expected);
  } );

  it("Cb, 4 === B, 4", () => {
    const expected = B4;
    const actual = fromPitchOctave(Cb, 4);

    expect(actual).toBe(expected);
  } );
} );
