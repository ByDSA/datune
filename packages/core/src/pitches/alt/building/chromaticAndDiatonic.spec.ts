import { Pitches as P } from "pitches/alt";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { expectPitch } from "pitches/alt/tests/expect";
import { fromChromaticAndDiatonic } from "./chromaticAndDiatonic";

describe.each([
  [CP.C, DP.B, P.BB],
  [CP.DD, DP.E, P.Eb],
  [CP.GG, DP.A, P.Ab],
  [CP.AA, DP.B, P.Bb],
  [CP.CC, DP.B, P.BBB],
  [CP.AA, DP.C, P.Cbb],
  [CP.C, DP.C, P.C],
  [CP.G, DP.G, P.G],
  [CP.E, DP.F, P.Fb],
  [CP.F, DP.E, P.EE],
])("builder", (cPitch, dPitch, expected) => {
  it(`cPitch=${cPitch} and dPitch=${dPitch} should be ${expected}`, () => {
    const actual = fromChromaticAndDiatonic(cPitch, dPitch);

    expectPitch(actual, expected);
  } );
} );
