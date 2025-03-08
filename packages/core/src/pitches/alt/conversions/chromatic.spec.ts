import type { Pitch } from "../Pitch";
import type { Pitch as CPitch } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Pitches as CP } from "pitches/chromatic";
import { fromDPitchAlts } from "../building/diatonicAlts";
import { Pitches as P } from "..";
import { toChromatic } from "./chromatic";

describe.each([
  [P.C, CP.C],
  [P.E, CP.E],
  [P.Cb, CP.B],
  [P.BBB, CP.CC],
  [P.BB, CP.C],
  [P.Cbb, CP.AA],
  [fromDPitchAlts(DP.C, -3), CP.A],
  [fromDPitchAlts(DP.E, -4), CP.C],
])("toChromatic", (diatonicAlt: Pitch, expectedChromatic: CPitch) => {
  it(`${diatonicAlt} -> ${expectedChromatic}`, () => {
    const actual = toChromatic(diatonicAlt);

    expect(actual).toEqual(expectedChromatic);
  } );
} );
