import { Pitches as P } from "pitches/alt";
import { TestInit } from "tests";
import * as Const from "../constants";
import { betweenNext } from "./betweenNext";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

describe("tests", () => {
// eslint-disable-next-line @typescript-eslint/naming-convention
  const { A, AA, B, C, DD, E, Gb, G, GG } = P;

  it("fromRootNotes: get from ImmutableCache", () => {
    const interval = betweenNext(C, E);
    const expected = Const.M3;

    expect(interval).toBe(expected);
  } );

  it("gb to D#: DOUBLY DIMINISHED FIFTH", () => {
    const a = P.Gb;
    const b = P.DD;

    expect(a).toBeDefined();
    expect(b).toBeDefined();

    const interval = betweenNext(a, b);
    const expected = Const.da5;

    expect(expected).toBeDefined();

    expect(interval).toBe(expected);
  } );

  it("b to C: MINOR SECOND", () => {
    const a = B;
    const b = C;
    const interval = betweenNext(a, b);
    const expected = Const.m2;

    expect(interval).toBe(expected);
  } );

  it("c to B: MAJOR SEVENTH", () => {
    const a = C;
    const b = B;
    const interval = betweenNext(a, b);
    const expected = Const.M7;

    expect(interval).toBe(expected);
  } );

  it("d# to Gb: DOUBLY DIMINISHED FIFTH", () => {
    const a = DD;
    const b = Gb;
    const interval = betweenNext(a, b);
    const expected = Const.dd4;

    expect(interval).toBe(expected);
  } );

  it("a to A#:", () => {
    const a = A;
    const b = AA;
    const interval = betweenNext(a, b);
    const expected = Const.a1;

    expect(interval).toBe(expected);
  } );

  it("a to G#:", () => {
    const a = A;
    const b = GG;
    const interval = betweenNext(a, b);
    const expected = Const.M7;

    expect(interval).toBe(expected);
  } );

  it("g# to G:", () => {
    const a = GG;
    const b = G;
    const interval = betweenNext(a, b);
    const expected = Const.d8;

    expect(interval).toBe(expected);
  } );
} );
