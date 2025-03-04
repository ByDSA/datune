import { Pitches as DP } from "pitches/diatonic";
import { TestInit } from "tests";
import { fromDiatonicAlts } from "../building/diatonicAlts";
import { C } from "../constants";

beforeAll(() => {
  TestInit.diatonicAlt();
} );

it("cache", () => {
  const actual = fromDiatonicAlts(DP.C, 0);
  const expected = C;

  expect(actual).toBe(expected);
} );
