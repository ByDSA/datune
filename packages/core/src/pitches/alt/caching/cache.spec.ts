import { fromDiatonicAlts } from "../building/diatonicAlts";
import { C } from "../constants";
import { Pitches as DPitches } from "pitches/diatonic";
import { TestInit } from "tests";

beforeAll(() => {
  TestInit.diatonicAlt();
} );

it("cache", () => {
  const actual = fromDiatonicAlts(DPitches.C, 0);
  const expected = C;

  expect(actual).toBe(expected);
} );
