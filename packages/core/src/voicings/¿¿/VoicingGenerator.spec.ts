import { PitchArray as APitchArray, Pitches as AP } from "pitches/alt";
import { PitchArray as CPitchArray, Pitches as CP } from "pitches/chromatic";
import { PitchArray as DPitchArray, Pitches as DP } from "pitches/diatonic";
import { TestInit } from "tests";
import { VoicingGenerator } from "./VoicingGenerator";

beforeAll(() => {
  TestInit.diatonicAlt();
} );

describe("closed", () => {
  describe("should be without changes, in the same octave", () => {
    it("input: C E G", () => {
      const degrees: CPitchArray = [CP.C, CP.E, CP.G];
      const actual = VoicingGenerator.CLOSED.apply(...degrees);

      expect(actual).toHaveLength(3);
      expect(actual[0].pitch).toEqual(CP.C);
      expect(actual[0].octaveRelative).toBe(0);
      expect(actual[1].pitch).toEqual(CP.E);
      expect(actual[1].octaveRelative).toBe(0);
      expect(actual[2].pitch).toEqual(CP.G);
      expect(actual[2].octaveRelative).toBe(0);
    } );

    it("c E G B", () => {
      const degrees: CPitchArray = [CP.C, CP.E, CP.G, CP.B];
      const actual = VoicingGenerator.CLOSED.apply(...degrees);

      expect(actual).toHaveLength(4);
      expect(actual[0].pitch).toEqual(CP.C);
      expect(actual[0].octaveRelative).toBe(0);
      expect(actual[1].pitch).toEqual(CP.E);
      expect(actual[1].octaveRelative).toBe(0);
      expect(actual[2].pitch).toEqual(CP.G);
      expect(actual[2].octaveRelative).toBe(0);
      expect(actual[3].pitch).toEqual(CP.B);
      expect(actual[3].octaveRelative).toBe(0);
    } );
  } );

  it("rEPEAT DEGREE - C E G C. should omit last C", () => {
    const degrees: CPitchArray = [CP.C, CP.E, CP.G, CP.C];
    const actual = VoicingGenerator.CLOSED.apply(...degrees);

    expect(actual).toHaveLength(3);
    expect(actual[0].pitch).toEqual(CP.C);
    expect(actual[0].octaveRelative).toBe(0);
    expect(actual[1].pitch).toEqual(CP.E);
    expect(actual[1].octaveRelative).toBe(0);
    expect(actual[2].pitch).toEqual(CP.G);
    expect(actual[2].octaveRelative).toBe(0);
  } );

  describe("should resort in the same octave", () => {
    it("c E G B D", () => {
      const degrees: CPitchArray = [CP.C, CP.E, CP.G, CP.B, CP.D];
      const actual = VoicingGenerator.CLOSED.apply(...degrees);

      expect(actual).toHaveLength(5);
      expect(actual[0].pitch).toEqual(CP.C);
      expect(actual[0].octaveRelative).toBe(0);
      expect(actual[1].pitch).toEqual(CP.D);
      expect(actual[1].octaveRelative).toBe(0);
      expect(actual[2].pitch).toEqual(CP.E);
      expect(actual[2].octaveRelative).toBe(0);
      expect(actual[3].pitch).toEqual(CP.G);
      expect(actual[3].octaveRelative).toBe(0);
      expect(actual[4].pitch).toEqual(CP.B);
      expect(actual[4].octaveRelative).toBe(0);
    } );
  } );

  it("diatonicAlt: C Eb G Bb", () => {
    const degrees: APitchArray = [AP.C, AP.Eb, AP.G, AP.Bb];
    const actual = VoicingGenerator.CLOSED.apply(...degrees);

    expect(actual).toHaveLength(4);
    expect(actual[0].pitch).toEqual(AP.C);
    expect(actual[0].octaveRelative).toBe(0);
    expect(actual[1].pitch).toEqual(AP.Eb);
    expect(actual[1].octaveRelative).toBe(0);
    expect(actual[2].pitch).toEqual(AP.G);
    expect(actual[2].octaveRelative).toBe(0);
    expect(actual[3].pitch).toEqual(AP.Bb);
    expect(actual[3].octaveRelative).toBe(0);
  } );
} );

describe("closed unsorted", () => {
  it("rEPEAT DEGREE - C G E C", () => {
    const degrees: CPitchArray = [CP.C, CP.G, CP.E, CP.C];
    const actual = VoicingGenerator.CLOSED_UNSORTED.apply(...degrees);

    expect(actual).toHaveLength(3);
    expect(actual[0].pitch).toEqual(CP.C);
    expect(actual[0].octaveRelative).toBe(0);
    expect(actual[1].pitch).toEqual(CP.G);
    expect(actual[1].octaveRelative).toBe(0);
    expect(actual[2].pitch).toEqual(CP.E);
    expect(actual[2].octaveRelative).toBe(1);
  } );

  it("c E G B D", () => {
    const degrees: CPitchArray = [CP.C, CP.E, CP.G, CP.B, CP.D];
    const actual = VoicingGenerator.CLOSED_UNSORTED.apply(...degrees);

    expect(actual).toHaveLength(5);
    expect(actual[0].pitch).toEqual(CP.C);
    expect(actual[0].octaveRelative).toBe(0);
    expect(actual[1].pitch).toEqual(CP.E);
    expect(actual[1].octaveRelative).toBe(0);
    expect(actual[2].pitch).toEqual(CP.G);
    expect(actual[2].octaveRelative).toBe(0);
    expect(actual[3].pitch).toEqual(CP.B);
    expect(actual[3].octaveRelative).toBe(0);
    expect(actual[4].pitch).toEqual(CP.D);
    expect(actual[4].octaveRelative).toBe(1);
  } );

  it("diatonic: C E G B D", () => {
    const degrees: DPitchArray = [DP.C, DP.E, DP.G, DP.B, DP.D];
    const actual = VoicingGenerator.CLOSED_UNSORTED.apply(...degrees);

    expect(actual).toHaveLength(5);
    expect(actual[0].pitch).toEqual(DP.C);
    expect(actual[0].octaveRelative).toBe(0);
    expect(actual[1].pitch).toEqual(DP.E);
    expect(actual[1].octaveRelative).toBe(0);
    expect(actual[2].pitch).toEqual(DP.G);
    expect(actual[2].octaveRelative).toBe(0);
    expect(actual[3].pitch).toEqual(DP.B);
    expect(actual[3].octaveRelative).toBe(0);
    expect(actual[4].pitch).toEqual(DP.D);
    expect(actual[4].octaveRelative).toBe(1);
  } );
} );
