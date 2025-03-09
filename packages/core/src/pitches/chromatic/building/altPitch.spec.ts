import type { Pitch as APitch } from "../../alt/Pitch";
import type { Pitch } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Pitches as P } from "pitches/chromatic";
import { fromDPitchAlts } from "../../alt/building/diatonicAlts";
import { Pitches as AP } from "../../alt";
import { fromAltPitch } from "./altPitch";

describe.each([
  [AP.C, P.C],
  [AP.E, P.E],
  [AP.Cb, P.B],
  [AP.BBB, P.CC],
  [AP.BB, P.C],
  [AP.Cbb, P.AA],
  [fromDPitchAlts(DP.C, -3), P.A],
  [fromDPitchAlts(DP.E, -4), P.C],
])("fromAltPitch", (altPitch: APitch, expectedChromatic: Pitch) => {
  it(`${altPitch} -> ${expectedChromatic}`, () => {
    const actual = fromAltPitch(altPitch);

    expect(actual).toEqual(expectedChromatic);
  } );
} );
