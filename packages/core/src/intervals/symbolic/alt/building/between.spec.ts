import { TestInit } from "tests";
import { Pitches as P } from "pitches/alt";
import { a1, dd4, M3, m2 } from "../constants";
import { neg } from "../modifiers/neg";
import { between } from "./between";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

describe("tests", () => {
// eslint-disable-next-line @typescript-eslint/naming-convention
  const { A, AA, B, C, DD, E, Gb, GG } = P;

  it("fromRootNotes: get from ImmutableCache", () => {
    const interval = between(C, E);
    const expected = M3;

    expect(interval).toBe(expected);
  } );

  it("gb to D#: DOUBLY DIMINISHED FOURTH", () => {
    const a = Gb;
    const b = DD;
    const interval = between(a, b);
    const expected = neg(dd4);

    expect(interval).toBe(expected);
  } );

  it("b to C: MINOR SECOND", () => {
    const a = B;
    const b = C;
    const interval = between(a, b);
    const expected = m2;

    expect(interval).toBe(expected);
  } );

  it("c to B: MINOR SECOND", () => {
    const a = C;
    const b = B;
    const interval = between(a, b);
    const expected = neg(m2);

    expect(interval).toBe(expected);
  } );

  it("d# to Gb: DOUBLY DIMINISHED FOURTH", () => {
    const a = DD;
    const b = Gb;
    const interval = between(a, b);
    const expected = dd4;

    expect(interval).toBe(expected);
  } );

  it("a to A#:", () => {
    const a = A;
    const b = AA;
    const interval = between(a, b);
    const expected = a1;

    expect(interval).toBe(expected);
  } );

  it("a# to A:", () => {
    const a = AA;
    const b = A;
    const interval = between(a, b);
    const expected = neg(a1);

    expect(interval).toBe(expected);
  } );

  it("a to G#:", () => {
    const a = A;
    const b = GG;
    const interval = between(a, b);
    const expected = neg(m2);

    expect(interval).toBe(expected);
  } );
} );
