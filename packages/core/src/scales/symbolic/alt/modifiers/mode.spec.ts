/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Degrees as D } from "degrees/alt";
import { Scales as S } from "..";
import { mode } from "./mode";

const { BLUES_b5, DORIAN, LOCRIAN, MAJOR } = S;
const { aI, aIV, I, III, VI, VII } = D;

it("getMode - I = MAJOR", () => {
  const scale = mode(MAJOR, 1);
  const expected = MAJOR;

  expect(scale).toBe(expected);
} );

it("getMode - -I = MAJOR", () => {
  const scale = mode(MAJOR, -1);
  const expected = MAJOR;

  expect(scale).toBe(expected);
} );

it("getMode - II = DORIAN", () => {
  const scale = mode(MAJOR, 2);
  const expected = DORIAN;

  expect(scale).toBe(expected);
} );

it("getMode - -II = LOCRIAN", () => {
  const s = mode(MAJOR, -2);
  const expected = LOCRIAN;

  expect(s).toBe(expected);
} );

it("scale - degrees: BLUES_b5, mode V", () => {
  const scale = mode(BLUES_b5, 4);
  const { degrees } = scale;

  expect(degrees).toStrictEqual([
    I,
    aI,
    III,
    aIV,
    VI,
    VII,
  ]);
} );
