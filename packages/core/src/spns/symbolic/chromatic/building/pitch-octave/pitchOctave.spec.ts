import { B4, C4, FF4 } from "../../constants";
import { fromPitchOctave } from "./index";
import { Pitches } from "pitches/chromatic";
import { TestInit } from "tests";

TestInit.chromaticSPN();

describe("range", () => {
  describe("below limit", () => {
    it("min value -1 from below", () => {
      const actual = fromPitchOctave(Pitches.B, -2);

      expect(actual).toBeNull();
    } );

    it("min value -1 from above", () => {
      const actual = fromPitchOctave(Pitches.Cb, -1); // Cb, -1 === B-1

      expect(actual).toBeDefined();
    } );

    it("min value from above", () => {
      const actual = fromPitchOctave(Pitches.C, -1);

      expect(actual).toBeDefined();
    } );

    it("min value from below", () => {
      const actual = fromPitchOctave(Pitches.BB, -2); // BB, -2 === C-2

      expect(actual).toBeNull();
    } );
  } );

  describe("above limit", () => {
    it("max value from below", () => {
      const actual = fromPitchOctave(Pitches.B, 10);

      expect(actual).toBeDefined();
    } );

    it("max value from above", () => {
      const actual = fromPitchOctave(Pitches.Cb, 11); // Cb, 11 === B11

      expect(actual).toBeNull();
    } );

    it("max value +1 from below", () => {
      const actual = fromPitchOctave(Pitches.BB, 10); // BB, 10 === C10

      expect(actual).toBeDefined();
    } );

    it("max value +1 from above", () => {
      const actual = fromPitchOctave(Pitches.C, 11);

      expect(actual).toBeNull();
    } );
  } );

  it("in range", () => {
    const expected = C4;
    const actual = fromPitchOctave(Pitches.C, 4);

    expect(actual).toBe(expected);
  } );

  it("out of range", () => {
    const actual = fromPitchOctave(Pitches.C, 15);

    expect(actual).toBeNull();
  } );
} );

describe("enharmonic", () => {
  it("fF, 4 === Gb, 4", () => {
    const expected = FF4;
    const actual = fromPitchOctave(Pitches.Gb, 4);

    expect(actual).toBe(expected);
  } );

  it("bB, 4 === C, 4", () => {
    const expected = C4;
    const actual = fromPitchOctave(Pitches.BB, 4);

    expect(actual).toBe(expected);
  } );

  it("cb, 4 === B, 4", () => {
    const expected = B4;
    const actual = fromPitchOctave(Pitches.Cb, 4);

    expect(actual).toBe(expected);
  } );
} );
