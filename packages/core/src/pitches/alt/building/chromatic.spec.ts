import { Pitches as CP } from "pitches/chromatic";
import { Pitches as P } from "..";
import { fromChromatic } from "./chromatic";

describe.each([
  [CP.C, P.C],
  [CP.CC, P.CC],
  [CP.Db, P.CC],
  [CP.D, P.D],
  [CP.DD, P.DD],
  [CP.Eb, P.DD],
  [CP.E, P.E],
  [CP.F, P.F],
  [CP.FF, P.FF],
  [CP.Gb, P.FF],
  [CP.G, P.G],
  [CP.GG, P.GG],
  [CP.Ab, P.GG],
  [CP.A, P.A],
  [CP.AA, P.AA],
  [CP.Bb, P.AA],
  [CP.B, P.B],
  [CP.Cb, P.B],
])("tests", (chromatic, expected) => {
  it(`${chromatic}`, () => {
    const actual = fromChromatic(chromatic);

    expect(actual).toBe(expected);
  } );
} );
