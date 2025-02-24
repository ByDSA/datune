/* eslint-disable camelcase */
import { C as ChromaticC } from "keys/chromatic";
import { TestInit } from "tests";
import { C } from "../constants";
import toChromatic from "./chromatic";

TestInit.diatonicAltKey();
TestInit.chromaticKey();

it("toChromatic", () => {
  const actual = toChromatic(C);
  const expected = ChromaticC;

  expect(actual).toBe(expected);
} );
