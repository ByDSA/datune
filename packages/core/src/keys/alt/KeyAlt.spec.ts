/* eslint-disable camelcase */
import { A as DA_A, Ab as DA_Ab, B as DA_B, Bb as DA_Bb, C as DA_C, D as DA_D, E as DA_E, Eb as DA_Eb, F as DA_F, G as DA_G, Pitch } from "pitches/alt";
import { BLUES_MINOR, MAJOR, ORIENTAL } from "scales/alt";
import { TestInit } from "tests";
import { from } from "./building";
import { C } from "./constants";

TestInit.diatonicAltChord();
TestInit.diatonicAltScale();
TestInit.diatonicAltKey();
describe.each([
  [C, DA_C, MAJOR],
  [from(DA_C, ORIENTAL), DA_C, ORIENTAL],
])("scales & root", (key, root, scale) => {
  it(`${key} => root=${root}, scale=${scale}`, () => {
    expect(key.scale).toBe(scale);
    expect(key.root).toBe(root);
  } );
} );

it("notes: C", () => {
  const { pitches } = C;

  expect(pitches.length).toBe(7);
  const expected = [
    DA_C,
    DA_D,
    DA_E,
    DA_F,
    DA_G,
    DA_A,
    DA_B,
  ];

  pitches.forEach((n: Pitch, i: number) => {
    expect(pitches[i]).toBe(expected[i]);
  } );
} );

it("notes: C BLUES MINOR", () => {
  const key = from(DA_C, BLUES_MINOR);
  const { pitches } = key;

  expect(pitches.length).toBe(5);
  expect(pitches).toStrictEqual(
    [
      DA_C,
      DA_Eb,
      DA_F,
      DA_Ab,
      DA_Bb,
    ],
  );
} );
