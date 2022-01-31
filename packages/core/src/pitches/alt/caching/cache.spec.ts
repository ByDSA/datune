import { C as D_C } from "pitches/diatonic";
import { TestInit } from "tests";
import { fromDiatonicAlts } from "../building";
import { C } from "../constants";

beforeAll(() => {
  TestInit.diatonicAlt();
} );

it("cache", () => {
  const actual = fromDiatonicAlts(D_C, 0);
  const expected = C;

  expect(actual).toBe(expected);
} );
