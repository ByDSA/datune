/* eslint-disable camelcase */
import { A as C_A, AA as C_AA, Ab as C_Ab, B as C_B, Bb as C_Bb, C as C_C, Cb as C_Cb, CC as C_CC, D as C_D, Db as C_Db, DD as C_DD, E as C_E, Eb as C_Eb, F as C_F, FF as C_FF, G as C_G, Gb as C_Gb, GG as C_GG } from "pitches/chromatic";
import { TestInit } from "tests";
import { fromChromatic } from ".";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "../constants";

TestInit.diatonicAlt();
describe.each([
  [C_C, C],
  [C_CC, CC],
  [C_Db, CC],
  [C_D, D],
  [C_DD, DD],
  [C_Eb, DD],
  [C_E, E],
  [C_F, F],
  [C_FF, FF],
  [C_Gb, FF],
  [C_G, G],
  [C_GG, GG],
  [C_Ab, GG],
  [C_A, A],
  [C_AA, AA],
  [C_Bb, AA],
  [C_B, B],
  [C_Cb, B],
])("tests", (chromatic, expected) => {
  it(`${chromatic}`, () => {
    const actual = fromChromatic(chromatic);

    expect(actual).toBe(expected);
  } );
} );
