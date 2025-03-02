import * as Const from "../constants";
import { betweenNext } from "./betweenNext";
import { Pitches as P } from "pitches/alt";
import { TestInit } from "tests";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

describe("tests", () => {
// eslint-disable-next-line @typescript-eslint/naming-convention
  const { A, AA, B, C, DD, E, Gb, G, GG } = P;

  it("fromRootNotes: get from ImmutableCache", () => {
    const intervalDiatonicAlt = betweenNext(C, E);
    const expected = Const.MAJOR_THIRD;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("gb to D#: DOUBLY DIMINISHED FIFTH", () => {
    const a = P.Gb;
    const b = P.DD;

    expect(a).toBeDefined();
    expect(b).toBeDefined();

    const intervalDiatonicAlt = betweenNext(a, b);
    const expected = Const.DOUBLY_AUGMENTED_FIFTH;

    expect(expected).toBeDefined();

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("b to C: MINOR SECOND", () => {
    const a = B;
    const b = C;
    const intervalDiatonicAlt = betweenNext(a, b);
    const expected = Const.MINOR_SECOND;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("c to B: MAJOR SEVENTH", () => {
    const a = C;
    const b = B;
    const intervalDiatonicAlt = betweenNext(a, b);
    const expected = Const.MAJOR_SEVENTH;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("d# to Gb: DOUBLY DIMINISHED FIFTH", () => {
    const a = DD;
    const b = Gb;
    const intervalDiatonicAlt = betweenNext(a, b);
    const expected = Const.DOUBLY_DIMINISHED_FOURTH;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("a to A#:", () => {
    const a = A;
    const b = AA;
    const intervalDiatonicAlt = betweenNext(a, b);
    const expected = Const.AUGMENTED_UNISON;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("a to G#:", () => {
    const a = A;
    const b = GG;
    const intervalDiatonicAlt = betweenNext(a, b);
    const expected = Const.MAJOR_SEVENTH;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("g# to G:", () => {
    const a = GG;
    const b = G;
    const intervalDiatonicAlt = betweenNext(a, b);
    const expected = Const.DIMINISHED_OCTAVE;

    expect(intervalDiatonicAlt).toBe(expected);
  } );
} );
