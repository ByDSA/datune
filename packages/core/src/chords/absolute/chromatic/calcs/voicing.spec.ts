import { fromSPNs } from "../building";
import { SPNs, SPN, SPNArray } from "spns/chromatic";
import { TestInit } from "tests";
import { Voicings, Voicing } from "voicings/chromatic";

TestInit.chromaticSPN();
TestInit.chromaticVoicing();

describe("tests", () => {
  const { TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;

  describe.each([
    [[SPNs.D4, SPNs.F4, SPNs.A4], TRIAD_MINOR],
    [[SPNs.C4, SPNs.E4, SPNs.G4], TRIAD_MAJOR],
    [[SPNs.C4, SPNs.DD4, SPNs.G4], TRIAD_MINOR],
    [[SPNs.B4, SPNs.D5, SPNs.F5], TRIAD_DIMINISHED],
    [[SPNs.C4, SPNs.E4, SPNs.GG4], TRIAD_AUGMENTED],
  ])("tests", (spns: SPN[], expected: Voicing) => {
    it(`voicing (${spns}) => ${expected}`, () => {
      const chord = fromSPNs(...spns as SPNArray);

      expect(chord.pitches).toStrictEqual(spns);
    } );
  } );
} );
