import { Pitches as P } from "@datune/core/pitches/alt";
import { Pitches as CP } from "@datune/core/pitches/chromatic";
import { Pitches as DP } from "@datune/core/pitches/diatonic";
import { TestInit } from "tests";
import { find } from "./finder";

TestInit.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { BB, C, Cb, Cbb, CC, CCC, Dbb, Eb, fromDPitchAlts } = P;

it("from Chromatic and Diatonic", () => {
  const actual1 = find( {
    cPitch: CP.C,
    possibleDPitches: [DP.B],
  } );

  expect(actual1[0]).toBe(BB);

  const actual2 = find( {
    cPitch: CP.DD,
    possibleDPitches: [DP.E],
  } );

  expect(actual2[0]).toBe(Eb);
} );

it("diatonic = C: Cbb, Cbb,C, C#, C##", () => {
  const result = find( {
    possibleDPitches: [DP.C],
  } );

  expect(result).toHaveLength(5);

  expect(result).toContain(Cbb);
  expect(result).toContain(Cb);
  expect(result).toContain(C);
  expect(result).toContain(CC);
  expect(result).toContain(CCC);
} );

it("chromatic = C: B#, C, Dbb", () => {
  const result = find( {
    cPitch: CP.C,
  } );

  expect(result).toHaveLength(3);

  expect(result).toContain(BB);
  expect(result).toContain(C);
  expect(result).toContain(Dbb);
} );

it("chromatic = C, diatonics = C, D: C, Dbb", () => {
  const result = find( {
    cPitch: CP.C,
    possibleDPitches: [DP.C, DP.D],
  } );

  expect(result).toHaveLength(2);

  expect(result).toContain(C);
  expect(result).toContain(Dbb);
} );

it("chromatic = C, maxSharp = 3, maxBemol = 1: A###, B#, C", () => {
  const result = find( {
    cPitch: CP.C,
    maxSharps: 3,
    maxFlats: 1,
  } );

  expect(result).toHaveLength(3);

  expect(result).toContain(fromDPitchAlts(DP.A, 3));
  expect(result).toContain(BB);
  expect(result).toContain(C);
} );
