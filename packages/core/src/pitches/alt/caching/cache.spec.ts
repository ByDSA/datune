import { Pitches as DP } from "pitches/diatonic";
import { fromDPitchAlts } from "../building/diatonicAlts";
import { Pitches as P } from "..";

it("cache", () => {
  const actual = fromDPitchAlts(DP.C, 0);
  const expected = P.C;

  expect(actual).toBe(expected);
} );
