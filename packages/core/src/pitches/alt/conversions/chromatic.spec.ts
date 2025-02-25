import { A as C_A, AA as C_AA, B as C_B, C as C_C, CC as C_CC, E as C_E, Pitch as Chromatic } from "pitches/chromatic";
import { C as D_C, E as D_E } from "pitches/diatonic";
import { TestInit } from "tests";
import { fromDiatonicAlts } from "../building";
import { BB, BBB, C, Cb, Cbb, E } from "../constants";
import Pitch from "../Pitch";
import toChromatic from "./chromatic";

TestInit.diatonicAlt();

describe.each([
  [C, C_C],
  [E, C_E],
  [Cb, C_B],
  [BBB, C_CC],
  [BB, C_C],
  [Cbb, C_AA],
  [fromDiatonicAlts(D_C, -3), C_A],
  [fromDiatonicAlts(D_E, -4), C_C],
])("toChromatic", (diatonicAlt: Pitch, expectedChromatic: Chromatic) => {
  it(`${diatonicAlt} -> ${expectedChromatic}`, () => {
    const actual = toChromatic(diatonicAlt);

    expect(actual).toEqual(expectedChromatic);
  } );
} );
