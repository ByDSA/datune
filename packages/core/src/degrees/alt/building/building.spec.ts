import { Degrees as AD } from "..";
import { hash } from "../caching/hash";

const { I, II, III, IV, V, VI, VII } = AD;

describe.each([
  [I, "I"],
  [II, "II"],
  [III, "III"],
  [IV, "IV"],
  [V, "V"],
  [VI, "VI"],
  [VII, "VII"],
])("toString", (degree, expected) => {
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
