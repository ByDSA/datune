import type { Pitch } from "pitches/alt";
import { Pitches as P } from "pitches/alt";
import { Scales as S } from "scales/alt";
import { from } from "./building";
import { Keys as K } from ".";

const { BLUES_MINOR, MAJOR, ORIENTAL } = S;

describe.each([
  [K.C, P.C, MAJOR],
  [from(P.C, ORIENTAL), P.C, ORIENTAL],
])("scales & root", (key, root, scale) => {
  it(`${key} => root=${root}, scale=${scale}`, () => {
    expect(key.scale).toBe(scale);
    expect(key.root).toBe(root);
  } );
} );

it("notes: C", () => {
  const { pitches } = K.C;

  expect(pitches).toHaveLength(7);

  const expected = [
    P.C,
    P.D,
    P.E,
    P.F,
    P.G,
    P.A,
    P.B,
  ];

  pitches.forEach((_n: Pitch, i: number) => {
    expect(pitches[i]).toBe(expected[i]);
  } );
} );

it("notes: C BLUES MINOR", () => {
  const key = from(P.C, BLUES_MINOR);
  const { pitches } = key;

  expect(pitches).toHaveLength(5);
  expect(pitches).toStrictEqual(
    [
      P.C,
      P.Eb,
      P.F,
      P.Ab,
      P.Bb,
    ],
  );
} );
