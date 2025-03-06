import { Pitches as P } from "pitches/alt";
import { Intervals as I } from "..";
import { betweenNext } from "./betweenNext";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { A, AA, B, C, DD, E, Gb, G, GG } = P;

it("fromRootNotes: get from ImmutableCache", () => {
  const interval = betweenNext(C, E);
  const expected = I.M3;

  expect(interval).toBe(expected);
} );

it("gb to D#: DOUBLY DIMINISHED FIFTH", () => {
  const a = P.Gb;
  const b = P.DD;

  expect(a).toBeDefined();
  expect(b).toBeDefined();

  const interval = betweenNext(a, b);
  const expected = I.da5;

  expect(expected).toBeDefined();

  expect(interval).toBe(expected);
} );

it("b to C: MINOR SECOND", () => {
  const a = B;
  const b = C;
  const interval = betweenNext(a, b);
  const expected = I.m2;

  expect(interval).toBe(expected);
} );

it("c to B: MAJOR SEVENTH", () => {
  const a = C;
  const b = B;
  const interval = betweenNext(a, b);
  const expected = I.M7;

  expect(interval).toBe(expected);
} );

it("d# to Gb: DOUBLY DIMINISHED FIFTH", () => {
  const a = DD;
  const b = Gb;
  const interval = betweenNext(a, b);
  const expected = I.dd4;

  expect(interval).toBe(expected);
} );

it("a to A#:", () => {
  const a = A;
  const b = AA;
  const interval = betweenNext(a, b);
  const expected = I.a1;

  expect(interval).toBe(expected);
} );

it("a to G#:", () => {
  const a = A;
  const b = GG;
  const interval = betweenNext(a, b);
  const expected = I.M7;

  expect(interval).toBe(expected);
} );

it("g# to G:", () => {
  const a = GG;
  const b = G;
  const interval = betweenNext(a, b);
  const expected = I.d8;

  expect(interval).toBe(expected);
} );
