/* eslint-disable camelcase */
import { C_MAJOR } from "scales";
import { TestInit } from "tests";
import { MAJOR } from "../constants";
import toChromatic from "./chromatic";

TestInit.diatonicAltScale();

it("chromatic", () => {
  const actual = toChromatic(MAJOR);
  const expected = C_MAJOR;

  expect(actual).toBe(expected);
} );
