import { Pitches as P } from "pitches/alt";
import { Degrees as D } from "alt";
import { Intervals as I } from "..";
import { betweenNext } from "./betweenNext";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { A, AA, B, C, DD, E, Gb, G, GG } = P;

describe.each([
  [C, E, I.M3],
  [P.Gb, P.DD, I.da5],
  [B, C, I.m2],
  [C, B, I.M7],
  [DD, Gb, I.dd4],
  [A, AA, I.a1],
  [A, GG, I.M7],
  [GG, G, I.d8],
])("betweenNext pitches", (from, to, expected) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    expect(from).toBeDefined();
    expect(to).toBeDefined();

    const interval = betweenNext(from, to);

    expect(interval).toBe(expected);
  } );
} );

describe.each([
  [D.I, D.III, I.M3],
  [D.bV, D.aII, I.da5],
  [D.VII, D.I, I.m2],
  [D.I, D.VII, I.M7],
  [D.aII, D.bV, I.dd4],
  [D.VI, D.aVI, I.a1],
  [D.VI, D.aV, I.M7],
  [D.aV, D.V, I.d8],
])("betweenNext degrees", (from, to, expected) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    expect(from).toBeDefined();
    expect(to).toBeDefined();

    const interval = betweenNext(from, to);

    expect(interval).toBe(expected);
  } );
} );
