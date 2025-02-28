import { C } from "../constants";
import { toChromatic } from "./chromatic";
import { Keys as CKeys } from "keys/chromatic";
import { TestInit } from "tests";

TestInit.diatonicAltKey();
TestInit.chromaticKey();

it("toChromatic", () => {
  const actual = toChromatic(C);
  const expected = CKeys.C;

  expect(actual).toBe(expected);
} );
