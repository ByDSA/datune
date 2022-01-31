/* eslint-disable camelcase */
import { aI, aIV, I, III, VI, VII } from "degrees/alt";
import { TestInit } from "tests";
import { BLUES_b5, DORIAN, LOCRIAN, MAJOR } from "../constants";
import mode from "./mode";

TestInit.diatonicAltScale();

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

it("Scale - degrees: BLUES_b5, mode V", () => {
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
