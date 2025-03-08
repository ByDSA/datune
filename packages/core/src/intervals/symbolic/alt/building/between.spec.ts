/* eslint-disable @typescript-eslint/naming-convention */
import { Pitches as P } from "pitches/alt";
import { Degrees as D } from "alt";
import { neg } from "../modifiers/neg";
import { Intervals as I } from "..";
import { between } from "./between";

const { a1, m2 } = I;
const { A, AA, B, C, DD, E, Gb, GG } = P;

describe.each([
  [D.I, D.III, I.M3],
  [D.bV, D.aII, neg(I.dd4)],
  [D.VII, D.I, I.m2],
  [D.I, D.VII, neg(m2)],
  [D.aII, D.bV, I.dd4],
  [D.VI, D.aVI, I.a1],
  [D.aVI, D.VI, neg(I.a1)],
  [D.VI, D.aV, neg(m2)],
])("between degrees", (from, to, expected) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    expect(from).toBeDefined();
    expect(to).toBeDefined();

    const interval = between(from, to);

    expect(interval).toBe(expected);
  } );
} );

describe.each([
  [C, E, I.M3],
  [P.Gb, P.DD, neg(I.dd4)],
  [B, C, I.m2],
  [C, B, neg(m2)],
  [DD, Gb, I.dd4],
  [A, AA, I.a1],
  [AA, A, neg(a1)],
  [A, GG, neg(m2)],
])("between pitches", (from, to, expected) => {
  it(`between ${from} and ${to} => ${expected}`, () => {
    expect(from).toBeDefined();
    expect(to).toBeDefined();

    const interval = between(from, to);

    expect(interval).toBe(expected);
  } );
} );
