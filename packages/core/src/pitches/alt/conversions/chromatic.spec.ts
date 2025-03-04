import type { Pitch } from "../Pitch";
import type { Pitch as CPitch } from "pitches/chromatic";
import { TestInit } from "tests";
import { Pitches as DP } from "pitches/diatonic";
import { Pitches as CP } from "pitches/chromatic";
import { fromDiatonicAlts } from "../building/diatonicAlts";
import { BB, BBB, C, Cb, Cbb, E } from "../constants";
import { toChromatic } from "./chromatic";

TestInit.diatonicAlt();

describe.each([
  [C, CP.C],
  [E, CP.E],
  [Cb, CP.B],
  [BBB, CP.CC],
  [BB, CP.C],
  [Cbb, CP.AA],
  [fromDiatonicAlts(DP.C, -3), CP.A],
  [fromDiatonicAlts(DP.E, -4), CP.C],
])("toChromatic", (diatonicAlt: Pitch, expectedChromatic: CPitch) => {
  it(`${diatonicAlt} -> ${expectedChromatic}`, () => {
    const actual = toChromatic(diatonicAlt);

    expect(actual).toEqual(expectedChromatic);
  } );
} );
