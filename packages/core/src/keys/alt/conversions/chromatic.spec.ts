/* eslint-disable camelcase */
import { Keys as CKeys } from "keys/chromatic";
import { TestInit } from "tests";
import { C } from "../constants";
import { toChromatic } from "./chromatic";

TestInit.diatonicAltKey();
TestInit.chromaticKey();

it("toChromatic", () => {
  const actual = toChromatic(C);
  const expected = CKeys.C;

  expect(actual).toBe(expected);
} );
