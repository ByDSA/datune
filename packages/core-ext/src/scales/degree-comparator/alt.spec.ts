import { I, II, III, IV, V, VI, VII } from "@datune/core/degrees/alt/constants";
import { LOCRIAN, LYDIAN, MAJOR, MINOR } from "@datune/core/scales/symbolic/alt/constants";
import { compare } from ".";
import { TestInit } from "tests";

TestInit.loadAll();

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
