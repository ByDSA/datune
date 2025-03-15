import { Intervals as I } from "alt";
import { Degrees as AD, Degrees as D } from "..";
import { getId } from "../caching/cache";
import { fromInterval } from ".";

const { II, III, IV, V, VI, VII } = AD;

describe.each([
  [AD.I, "I"],
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
  [AD.I, "0:0"],
  [II, "1:0"],
  [III, "2:0"],
  [IV, "3:0"],
  [V, "4:0"],
  [VI, "5:0"],
  [VII, "6:0"],
])("getId", (degree, expected) => {
  it(`${String(degree)} matches`, () => {
    expect(getId(degree)).toBe(expected);
  } );
} );

it("fromInterval", () => {
  const expected = D.aVII;
  const actual = fromInterval(I.a7);

  expect(actual).toBe(expected);
} );
