import { Bb } from "pitches/alt";
import { A4 as C_A4, AA4 as C_AA4, ALL as CSPN_ALL, C4 as C_C4, SPN as ChromaticSPN } from "spns/chromatic";
import { TestInit } from "tests";
import { fromPitchOctave } from "../building";
import { A4, AA4, C4, COMMON } from "../constants";
import SPN from "../SPN";
import toChromaticSPN from "./chromatic";

TestInit.diatonicAltSPN();
TestInit.chromaticSPN();
const cases = [
  [C4, C_C4],
  [A4, C_A4],
  [AA4, C_AA4],
  [fromPitchOctave(Bb, 4), C_AA4],
] as [SPN, ChromaticSPN][];

describe.each(cases)("specific cases", (spn: SPN, expectedChromaticSPN: ChromaticSPN) => {
  it("toChromatic", () => {
    const actual = toChromaticSPN(spn);

    expect(actual).toBe(expectedChromaticSPN);
  } );
} );

describe.each(COMMON)("common toChromatic", (spn: SPN) => {
  const spnName = spn.toString();

  describe(spnName, () => {
    it("ok", () => {
      const actual = toChromaticSPN(spn);

      expect(actual).toBeDefined();
    } );

    it("in ChromaticSPN.ALL", () => {
      const actual = toChromaticSPN(spn);

      expect(CSPN_ALL).toContain(actual);
    } );
  } );
} );
