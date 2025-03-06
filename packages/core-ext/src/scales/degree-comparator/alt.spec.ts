import { Degrees as D, Scales as S } from "@datune/core/alt";
import { TestInit } from "tests";
import { compare } from ".";

TestInit.loadAll();
const { LOCRIAN, LYDIAN, MAJOR, MINOR } = S;
const { I, II, III, IV, V, VI, VII } = D;

it("scale.MAJOR and itself nonenharmonic", () => {
  const { common } = compare(MAJOR, MAJOR);
  const expected = [
    I,
    II,
    III,
    IV,
    V,
    VI,
    VII,
  ];

  for (const degree of expected)
    expect(common.has(degree)).toBe(true);
} );

it("scale.MAJOR and Scale.MINOR nonenharmonic", () => {
  const { common } = compare(MAJOR, MINOR);
  const expected = [
    I,
    II,
    IV,
    V,
  ];

  expect(common.size).toBe(4);

  for (const degree of expected)
    expect(common.has(degree)).toBe(true);
} );

it("scale.LYDIAN and Scale.LOCRIAN nonenharmonic", () => {
  const { common } = compare(LYDIAN, LOCRIAN);
  const expected = [
    I,
  ];

  expect(common.size).toBe(1);

  for (const degree of expected)
    expect(common.has(degree)).toBe(true);
} );
