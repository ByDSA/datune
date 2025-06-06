import type { Pitch } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Scales as S } from "scales/chromatic";
import { PitchSets as PS } from "sets/pitch-set/chromatic";
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

describe.each([
  [K.C],
  [K.Dm],
  [K.from(P.C, S.ORIENTAL)],
  [K.from(P.C, S.BLUES_MINOR)],
])("pitch set for %s", (key) => {
  it("should have a defined pitch set", () => {
    expect(key.pitchSet).toBeDefined();
  } );

  it("should include all key pitches in the pitch set", () => {
    expect(key.pitchSet.hasAll(...key.pitches)).toBeTruthy();
  } );

  it("should match the pitch set created from pitches", () => {
    expect(PS.fromPitches(...key.pitches)).toBe(key.pitchSet);
  } );
} );
