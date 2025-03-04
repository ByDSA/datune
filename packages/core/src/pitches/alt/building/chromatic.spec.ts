import { Pitches as CP } from "pitches/chromatic";
import { TestInit } from "tests";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "../constants";
import { fromChromatic } from "./chromatic";

TestInit.diatonicAlt();

describe.each([
  [CP.C, C],
  [CP.CC, CC],
  [CP.Db, CC],
  [CP.D, D],
  [CP.DD, DD],
  [CP.Eb, DD],
  [CP.E, E],
  [CP.F, F],
  [CP.FF, FF],
  [CP.Gb, FF],
  [CP.G, G],
  [CP.GG, GG],
  [CP.Ab, GG],
  [CP.A, A],
  [CP.AA, AA],
  [CP.Bb, AA],
  [CP.B, B],
  [CP.Cb, B],
])("tests", (chromatic, expected) => {
  it(`${chromatic}`, () => {
    const actual = fromChromatic(chromatic);

    expect(actual).toBe(expected);
  } );
} );
