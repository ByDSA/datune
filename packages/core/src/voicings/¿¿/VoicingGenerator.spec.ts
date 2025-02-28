import { VoicingGenerator } from "./VoicingGenerator";
import { PitchArray as DiatonicAltArray, Pitches as DAP } from "pitches/alt";
import { PitchArray as ChromaticArray, Pitches as CP } from "pitches/chromatic";
import { PitchArray as DiatonicArray, Pitches as DP } from "pitches/diatonic";
import { TestInit } from "tests";

beforeAll(() => {
  TestInit.diatonicAlt();
} );

describe("closed", () => {
  describe("should be without changes, in the same octave", () => {
    it("input: C E G", () => {
      const degrees: ChromaticArray = [CP.C, CP.E, CP.G];
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
      const degrees: ChromaticArray = [CP.C, CP.E, CP.G, CP.B];
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
    const degrees: ChromaticArray = [CP.C, CP.E, CP.G, CP.C];
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
      const degrees: ChromaticArray = [CP.C, CP.E, CP.G, CP.B, CP.D];
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
    const degrees: DiatonicAltArray = [DAP.C, DAP.Eb, DAP.G, DAP.Bb];
    const actual = VoicingGenerator.CLOSED.apply(...degrees);

    expect(actual).toHaveLength(4);
    expect(actual[0].pitch).toEqual(DAP.C);
    expect(actual[0].octaveRelative).toBe(0);
    expect(actual[1].pitch).toEqual(DAP.Eb);
    expect(actual[1].octaveRelative).toBe(0);
    expect(actual[2].pitch).toEqual(DAP.G);
    expect(actual[2].octaveRelative).toBe(0);
    expect(actual[3].pitch).toEqual(DAP.Bb);
    expect(actual[3].octaveRelative).toBe(0);
  } );
} );

describe("closed unsorted", () => {
  it("rEPEAT DEGREE - C G E C", () => {
    const degrees: ChromaticArray = [CP.C, CP.G, CP.E, CP.C];
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
    const degrees: ChromaticArray = [CP.C, CP.E, CP.G, CP.B, CP.D];
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
    const degrees: DiatonicArray = [DP.C, DP.E, DP.G, DP.B, DP.D];
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
