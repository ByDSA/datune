import { Keys as K, Pitches as P, Scales as S } from "@datune/core/alt";
import { regionalDistanceRule } from "./regional-distance-rule";

describe.each([
  {
    from: K.C,
    to: K.Gm,
    expected: 7 + 7, // I->v = I->V + I->i
  },
  {
    from: K.C,
    to: K.E,
    expected: 9 + 7, // I->III = I->iii + i->I
  },
  {
    from: K.C,
    to: K.CCm,
    expected: 9 + 7 + 7, // I->i# = I->iii + i->I + I->vi
  },
  {
    from: K.C,
    to: K.from(P.Db, S.MINOR),
    expected: 7 + 9 + 7 + 7, // I->bii = C->c + c->Ab + Ab->Db + Db->db
  },
  // p.69 Figure 2.27a (I to vii):
  {
    from: K.C,
    to: K.Cm,
    expected: 7,
  },
  {
    from: K.C,
    to: K.from(P.Db, S.MAJOR),
    expected: 23,
  },
  {
    from: K.C,
    to: K.CCm,
    expected: 23,
  },
  {
    from: K.C,
    to: K.D,
    expected: 14,
  },
  {
    from: K.C,
    to: K.Dm,
    expected: 10,
  },
  {
    from: K.C,
    to: K.from(P.Eb, S.MAJOR),
    expected: 14,
  },
  {
    from: K.C,
    to: K.from(P.Eb, S.MINOR),
    expected: 21,
  },
  {
    from: K.C,
    to: K.E,
    expected: 16,
  },
  {
    from: K.C,
    to: K.Em,
    expected: 9,
  },
  {
    from: K.C,
    to: K.F,
    expected: 7,
  },
  {
    from: K.C,
    to: K.Fm,
    expected: 14,
  },
  {
    from: K.C,
    to: K.FF,
    // En la Figure 2.27b pone 30, pero habría que seguir un camino
    // más largo:   I->IIIm->III->VII->#IV = 9 + 7 + 7 + 7 = 30
    expected: 28, // I->VIm->VI->#IVm->#IV = 7 + 7 + 7 + 7 = 28
  },
  {
    from: K.C,
    to: K.FFm,
    expected: 21,
  },
  {
    from: K.C,
    to: K.G,
    expected: 7,
  },
  {
    from: K.C,
    to: K.Gm,
    expected: 14,
  },
  {
    from: K.C,
    to: K.from(P.Ab, S.MAJOR),
    expected: 16,
  },
  {
    from: K.C,
    to: K.from(P.Ab, S.MINOR),
    expected: 23,
  },
  {
    from: K.C,
    to: K.A,
    expected: 14,
  },
  {
    from: K.C,
    to: K.Am,
    expected: 7,
  },
  {
    from: K.C,
    to: K.from(P.Bb, S.MAJOR),
    expected: 14,
  },
  {
    from: K.C,
    to: K.from(P.Bb, S.MINOR),
    expected: 21,
  },
  {
    from: K.C,
    to: K.B,
    expected: 23,
  },
  {
    from: K.C,
    to: K.Bm,
    expected: 16,
  },
])("regionalDistanceRule", ( { from, to, expected } ) => {
  it(`(${from}) -> (${to}) should be ${expected}`, () => {
    const actual = regionalDistanceRule( {
      from,
      to,
    } );

    expect(actual.dist).toBe(expected);
  } );
} );
