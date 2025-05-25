import { Pitches as P, PitchSets as PS } from "@datune/core";
import { voiceLeadingDistance } from "./chord-distances";
import { matchingDistance } from "./chord-distances";

describe("voiceLeadingDistance", () => {
  it("should return 0 for identical chords", () => {
    const chord = PS.fromPitches(P.C, P.E, P.G);

    expect(voiceLeadingDistance(chord, chord)).toBe(0);
  } );

  it("should calculate minimal voice leading distance between two chords", () => {
    const chord1 = PS.fromPitches(P.C, P.E, P.G);
    const chord2 = PS.fromPitches(P.D, P.F, P.A);

    expect(voiceLeadingDistance(chord1, chord2)).toBe(5);
  } );

  it("should handle chords with different numbers of notes", () => {
    const chord1 = PS.fromPitches(P.C, P.E);
    const chord2 = PS.fromPitches(P.C, P.E, P.G);

    expect(voiceLeadingDistance(chord1, chord2)).toBe(0);
  } );

  describe("voiceLeadingDistance", () => {
    it("should return 0 for identical chords", () => {
      const chord = PS.fromPitches(P.C, P.E, P.G);

      expect(voiceLeadingDistance(chord, chord)).toBe(0);
    } );

    it("should calculate minimal voice leading distance between two chords", () => {
      const chord1 = PS.fromPitches(P.C, P.E, P.G);
      const chord2 = PS.fromPitches(P.D, P.F, P.A);

      expect(voiceLeadingDistance(chord1, chord2)).toBe(5);
    } );

    it("should handle chords with different numbers of notes", () => {
      const chord1 = PS.fromPitches(P.C, P.E);
      const chord2 = PS.fromPitches(P.C, P.E, P.G);

      expect(voiceLeadingDistance(chord1, chord2)).toBe(0);
    } );
  } );

  describe("matchingDistance", () => {
    it("should return all matches when both pitch sets are identical", () => {
      const ps1 = PS.fromPitches(P.C, P.E, P.G);
      const ps2 = PS.fromPitches(P.C, P.E, P.G);
      const result = matchingDistance(ps1, ps2);

      expect(result).toEqual( {
        matches: 3,
        missing: 0,
        extras: 0,
      } );
    } );

    it("should count missing notes when ps1 is a subset of ps2", () => {
      const ps1 = PS.fromPitches(P.C, P.E);
      const ps2 = PS.fromPitches(P.C, P.E, P.G);
      const result = matchingDistance(ps1, ps2);

      expect(result).toEqual( {
        matches: 2,
        missing: 1,
        extras: 0,
      } );
    } );

    it("should count extra notes when ps1 is a superset of ps2", () => {
      const ps1 = PS.fromPitches(P.C, P.E, P.G);
      const ps2 = PS.fromPitches(P.C, P.E);
      const result = matchingDistance(ps1, ps2);

      expect(result).toEqual( {
        matches: 2,
        missing: 0,
        extras: 1,
      } );
    } );

    it("should count extras and missing when both pitch sets are disjoint", () => {
      const ps1 = PS.fromPitches(P.C, P.E);
      const ps2 = PS.fromPitches(P.G, P.B);
      const result = matchingDistance(ps1, ps2);

      expect(result).toEqual( {
        matches: 0,
        missing: 2,
        extras: 2,
      } );
    } );

    it("should return 0 matches, extras and missing for two empty pitch sets", () => {
      const ps1 = PS.EMPTY;
      const ps2 = PS.EMPTY;
      const result = matchingDistance(ps1, ps2);

      expect(result).toEqual( {
        matches: 0,
        missing: 0,
        extras: 0,
      } );
    } );
  } );
} );
