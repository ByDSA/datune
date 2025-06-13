import type { Spn } from "../Spn";
import { Pitches as P } from "pitches/alt";
import { fromPitchOctave } from "../building";
import { Spns as N } from "..";
import { Spns as CN, Spn as CSpn } from "../../chromatic";
import { toChromaticSpn } from "./chromatic";

const { A4, AA4, C4, COMMON } = N;
const cases = [
  [C4, CN.C4],
  [A4, CN.A4],
  [AA4, CN.AA4],
  [fromPitchOctave(P.Bb, 4), CN.AA4],
] as [Spn, CSpn][];

describe.each(cases)("specific cases", (spn: Spn, expectedChromaticSpn: CSpn) => {
  it("toChromaticSpn", () => {
    const actual = toChromaticSpn(spn);

    expect(actual).toBe(expectedChromaticSpn);
  } );
} );

describe.each(COMMON)("common toChromaticSpn", (spn: Spn) => {
  const spnName = spn.toString();

  describe("name: " + spnName, () => {
    it("ok", () => {
      const actual = toChromaticSpn(spn);

      expect(actual).toBeDefined();
    } );

    it("in ChromaticSpn.ALL", () => {
      const actual = toChromaticSpn(spn);

      expect(CN.ALL).toContain(actual);
    } );
  } );
} );
