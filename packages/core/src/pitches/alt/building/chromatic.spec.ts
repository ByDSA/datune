import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "../constants";
import { fromChromatic } from "./chromatic";
import { Pitches as CPitches } from "pitches/chromatic";
import { TestInit } from "tests";

TestInit.diatonicAlt();

describe.each([
  [CPitches.C, C],
  [CPitches.CC, CC],
  [CPitches.Db, CC],
  [CPitches.D, D],
  [CPitches.DD, DD],
  [CPitches.Eb, DD],
  [CPitches.E, E],
  [CPitches.F, F],
  [CPitches.FF, FF],
  [CPitches.Gb, FF],
  [CPitches.G, G],
  [CPitches.GG, GG],
  [CPitches.Ab, GG],
  [CPitches.A, A],
  [CPitches.AA, AA],
  [CPitches.Bb, AA],
  [CPitches.B, B],
  [CPitches.Cb, B],
])("tests", (chromatic, expected) => {
  it(`${chromatic}`, () => {
    const actual = fromChromatic(chromatic);

    expect(actual).toBe(expected);
  } );
} );
