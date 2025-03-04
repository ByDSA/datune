import { Pitches as P } from "pitches/chromatic";
import { Scales } from "scales/chromatic";
import { TestInit } from "tests";
import { fromRootScale } from "../building";
import { C } from ".";

TestInit.chromaticKey();
const { BLUES_MINOR, MAJOR, ORIENTAL } = Scales;

describe.each([
  [C, P.C, MAJOR],
  [fromRootScale(P.C, ORIENTAL), P.C, ORIENTAL],
])("scales & root", (key, root, scale) => {
  const scaleName = String(scale);
  const rootName = String(root);
  const keyName = String(key.pitches);

  it(`${keyName} => root=${rootName}, scale=${scaleName}`, () => {
    expect(key.scale).toBe(scale);
    expect(key.root).toBe(root);
  } );
} );

describe.each([
  [C, [P.C, P.D, P.E, P.F, P.G, P.A, P.B]],
  [fromRootScale(P.C, BLUES_MINOR), [P.C, P.DD, P.F, P.GG, P.AA],
  ],
])("pitches", (key, expectedPitches) => {
  const keyName = String(key);
  const pitchesName = String(expectedPitches as any);

  it(`${keyName} => ${pitchesName}`, () => {
    const { pitches: actualPitches } = key;

    expect(actualPitches).toHaveLength(expectedPitches.length);

    actualPitches.forEach((_n, i) => {
      expect(actualPitches[i]).toBe(expectedPitches[i]);
    } );
  } );
} );
