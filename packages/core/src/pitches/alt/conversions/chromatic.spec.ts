import { fromDiatonicAlts } from "../building/diatonicAlts";
import { BB, BBB, C, Cb, Cbb, E } from "../constants";
import type { Pitch } from "../Pitch";
import { toChromatic } from "./chromatic";
import { TestInit } from "tests";
import { Pitches as DPitches } from "pitches/diatonic";
import type { Pitch as Chromatic } from "pitches/chromatic";
import { Pitches as CPitches } from "pitches/chromatic";

TestInit.diatonicAlt();

describe.each([
  [C, CPitches.C],
  [E, CPitches.E],
  [Cb, CPitches.B],
  [BBB, CPitches.CC],
  [BB, CPitches.C],
  [Cbb, CPitches.AA],
  [fromDiatonicAlts(DPitches.C, -3), CPitches.A],
  [fromDiatonicAlts(DPitches.E, -4), CPitches.C],
])("toChromatic", (diatonicAlt: Pitch, expectedChromatic: Chromatic) => {
  it(`${diatonicAlt} -> ${expectedChromatic}`, () => {
    const actual = toChromatic(diatonicAlt);

    expect(actual).toEqual(expectedChromatic);
  } );
} );
