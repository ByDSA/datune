import { Pitches as OctavePitches } from "pitches/alt";
import { SPNs as CSPNs, SPN as ChromaticSPN } from "spns/chromatic";
import { TestInit } from "tests";
import { fromPitchOctave } from "../building";
import { A4, AA4, C4, COMMON } from "../constants";
import SPN from "../SPN";
import toChromaticSPN from "./chromatic";

TestInit.diatonicAltSPN();
TestInit.chromaticSPN();
const cases = [
  [C4, CSPNs.C4],
  [A4, CSPNs.A4],
  [AA4, CSPNs.AA4],
  [fromPitchOctave(OctavePitches.Bb, 4), CSPNs.AA4],
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

      expect(CSPNs.ALL).toContain(actual);
    } );
  } );
} );
