import { A, AA, B, C, DD, E, Gb, GG } from "pitches/alt";
import { TestInit } from "tests";
import { AUGMENTED_UNISON, DIMINISHED_UNISON, DOUBLY_DIMINISHED_FOURTH, MAJOR_THIRD, MINOR_SECOND } from "../constants";
import betweenMin from "./betweenMin";

beforeAll(() => {
  TestInit.diatonicAlt();
  TestInit.diatonicAltInterval();
} );
it("fromRootNotes: get from ImmutableCache", () => {
  const intervalDiatonicAlt = betweenMin(C, E);
  const expected = MAJOR_THIRD;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("Gb to D#: DOUBLY DIMINISHED FOURTH", () => {
  const a = Gb;
  const b = DD;
  const intervalDiatonicAlt = betweenMin(a, b);
  const expected = DOUBLY_DIMINISHED_FOURTH;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("B to C: MINOR SECOND", () => {
  const a = B;
  const b = C;
  const intervalDiatonicAlt = betweenMin(a, b);
  const expected = MINOR_SECOND;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("C to B: MINOR SECOND", () => {
  const a = C;
  const b = B;
  const intervalDiatonicAlt = betweenMin(a, b);
  const expected = MINOR_SECOND;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("D# to Gb: DOUBLY DIMINISHED FOURTH", () => {
  const a = DD;
  const b = Gb;
  const intervalDiatonicAlt = betweenMin(a, b);
  const expected = DOUBLY_DIMINISHED_FOURTH;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("A to A#: ", () => {
  const a = A;
  const b = AA;
  const intervalDiatonicAlt = betweenMin(a, b);
  const expected = AUGMENTED_UNISON;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("A# to A: ", () => {
  const a = AA;
  const b = A;
  const intervalDiatonicAlt = betweenMin(a, b);
  const expected = DIMINISHED_UNISON;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("A to G#: ", () => {
  const a = A;
  const b = GG;
  const intervalDiatonicAlt = betweenMin(a, b);
  const expected = MINOR_SECOND;

  expect(intervalDiatonicAlt).toBe(expected);
} );
