/* eslint-disable camelcase */
import { A as P_A, AA as P_AA, B as P_B, C as P_C, D as P_D, DD as P_DD, E as P_E, F as P_F, G as P_G, GG as P_GG } from "pitches/chromatic";
import { BLUES_MINOR, MAJOR, ORIENTAL } from "scales/chromatic";
import { TestInit } from "tests";
import { C } from ".";
import { from } from "../building";

TestInit.chromaticKey();
describe.each([
  [C, P_C, MAJOR],
  [from(P_C, ORIENTAL), P_C, ORIENTAL],
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
  [C, [P_C, P_D, P_E, P_F, P_G, P_A, P_B]],
  [from(P_C, BLUES_MINOR), [P_C, P_DD, P_F, P_GG, P_AA],
  ],
])("pitches", (key, expectedPitches) => {
  const keyName = String(key);
  const pitchesName = String(expectedPitches as any);

  it(`${keyName} => ${pitchesName}`, () => {
    const { pitches: actualPitches } = key;

    expect(actualPitches.length).toBe(expectedPitches.length);

    actualPitches.forEach((n, i) => {
      expect(actualPitches[i]).toBe(expectedPitches[i]);
    } );
  } );
} );
