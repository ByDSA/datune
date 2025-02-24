import { A, AA, B, C, DD, E, Gb, GG } from "pitches/alt";
import { TestInit } from "tests";
import { AUGMENTED_UNISON, DOUBLY_AUGMENTED_FIFTH, DOUBLY_DIMINISHED_FOURTH, MAJOR_SEVENTH, MAJOR_THIRD, MINOR_SECOND } from "../constants";
import betweenNext from "./betweenNext";

beforeAll(() => {
  TestInit.diatonicAlt();
  TestInit.diatonicAltInterval();
} );
it("fromRootNotes: get from ImmutableCache", () => {
  const intervalDiatonicAlt = betweenNext(C, E);
  const expected = MAJOR_THIRD;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("Gb to D#: DOUBLY DIMINISHED FIFTH", () => {
  const a = Gb;
  const b = DD;
  const intervalDiatonicAlt = betweenNext(a, b);
  const expected = DOUBLY_AUGMENTED_FIFTH;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("B to C: MINOR SECOND", () => {
  const a = B;
  const b = C;
  const intervalDiatonicAlt = betweenNext(a, b);
  const expected = MINOR_SECOND;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("C to B: MAJOR SEVENTH", () => {
  const a = C;
  const b = B;
  const intervalDiatonicAlt = betweenNext(a, b);
  const expected = MAJOR_SEVENTH;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("D# to Gb: DOUBLY DIMINISHED FIFTH", () => {
  const a = DD;
  const b = Gb;
  const intervalDiatonicAlt = betweenNext(a, b);
  const expected = DOUBLY_DIMINISHED_FOURTH;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("A to A#: ", () => {
  const a = A;
  const b = AA;
  const intervalDiatonicAlt = betweenNext(a, b);
  const expected = AUGMENTED_UNISON;

  expect(intervalDiatonicAlt).toBe(expected);
} );

it("A to G#: ", () => {
  const a = A;
  const b = GG;
  const intervalDiatonicAlt = betweenNext(a, b);
  const expected = MAJOR_SEVENTH;

  expect(intervalDiatonicAlt).toBe(expected);
} );
