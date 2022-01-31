import { I, II, III, IV, V, VI, VII } from "degrees/alt";
import { LOCRIAN, LYDIAN, MAJOR, MINOR } from "scales/alt";
import { TestInit } from "tests";
import compare from ".";

TestInit.loadAll();
it("Scale.MAJOR and itself nonenharmonic", () => {
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
    expect(common.has(degree)).toEqual(true);
} );

it("Scale.MAJOR and Scale.MINOR nonenharmonic", () => {
  const { common } = compare(MAJOR, MINOR);
  const expected = [
    I,
    II,
    IV,
    V,
  ];

  expect(common.size).toEqual(4);

  for (const degree of expected)
    expect(common.has(degree)).toEqual(true);
} );

it("Scale.LYDIAN and Scale.LOCRIAN nonenharmonic", () => {
  const { common } = compare(LYDIAN, LOCRIAN);
  const expected = [
    I,
  ];

  expect(common.size).toEqual(1);

  for (const degree of expected)
    expect(common.has(degree)).toEqual(true);
} );
