import { Degrees } from "../../diatonic";
import { from } from "../building";
import { I, II, III, IV, V, VI, VII } from "../constants";
import { hash } from "../caching/hash";
import { toChromaticDegree } from ".";
import { TestInit } from "tests";

TestInit.diatonicAltDegree();

describe.each([
  [I, "I"],
  [II, "II"],
  [III, "III"],
  [IV, "IV"],
  [V, "V"],
  [VI, "VI"],
  [VII, "VII"],
])("stringify", (degree, expected) => {
  it(`${+degree} matches`, () => {
    expect(String(degree)).toBe(expected);
  } );
} );

describe.each([
  [I, "0:0"],
  [II, "1:0"],
  [III, "2:0"],
  [IV, "3:0"],
  [V, "4:0"],
  [VI, "5:0"],
  [VII, "6:0"],
])("hashCode", (degree, expected) => {
  it(`${String(degree)} matches`, () => {
    expect(hash(degree)).toBe(expected);
  } );
} );

it("toChromaticDegree", () => {
  const diatonicAltDegree1 = from(Degrees.I, -1);
  const diatonicAltDegree2 = VII;

  expect(toChromaticDegree(diatonicAltDegree1)).toBe(toChromaticDegree(diatonicAltDegree2));
} );
