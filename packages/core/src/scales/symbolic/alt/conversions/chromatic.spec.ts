import { MAJOR } from "../constants";
import { toChromatic } from "./chromatic";
import { Scales as CScales } from "scales/chromatic";
import { TestInit } from "tests";

TestInit.diatonicAltScale();

it("chromatic", () => {
  const actual = toChromatic(MAJOR);
  const expected = CScales.MAJOR;

  expect(actual).toBe(expected);
} );
