import { AUGMENTED_UNISON, DOUBLY_DIMINISHED_FOURTH, MAJOR_THIRD, MINOR_SECOND } from "../constants";
import { betweenMin } from "./betweenMin";
import { Pitches } from "pitches/alt";
import { TestInit } from "tests";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

describe("tests", () => {
// eslint-disable-next-line @typescript-eslint/naming-convention
  const { A, AA, B, C, DD, E, Gb, GG } = Pitches;

  it("fromRootNotes: get from ImmutableCache", () => {
    const intervalDiatonicAlt = betweenMin(C, E);
    const expected = MAJOR_THIRD;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("gb to D#: DOUBLY DIMINISHED FOURTH", () => {
    const a = Gb;
    const b = DD;
    const intervalDiatonicAlt = betweenMin(a, b);
    const expected = DOUBLY_DIMINISHED_FOURTH;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("b to C: MINOR SECOND", () => {
    const a = B;
    const b = C;
    const intervalDiatonicAlt = betweenMin(a, b);
    const expected = MINOR_SECOND;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("c to B: MINOR SECOND", () => {
    const a = C;
    const b = B;
    const intervalDiatonicAlt = betweenMin(a, b);
    const expected = MINOR_SECOND;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("d# to Gb: DOUBLY DIMINISHED FOURTH", () => {
    const a = DD;
    const b = Gb;
    const intervalDiatonicAlt = betweenMin(a, b);
    const expected = DOUBLY_DIMINISHED_FOURTH;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("a to A#:", () => {
    const a = A;
    const b = AA;
    const intervalDiatonicAlt = betweenMin(a, b);
    const expected = AUGMENTED_UNISON;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("a# to A:", () => {
    const a = AA;
    const b = A;
    const intervalDiatonicAlt = betweenMin(a, b);
    const expected = AUGMENTED_UNISON;

    expect(intervalDiatonicAlt).toBe(expected);
  } );

  it("a to G#:", () => {
    const a = A;
    const b = GG;
    const intervalDiatonicAlt = betweenMin(a, b);
    const expected = MINOR_SECOND;

    expect(intervalDiatonicAlt).toBe(expected);
  } );
} );
