/* eslint-disable camelcase */
import { bIII, bV, bVII, I, II, III, IV, V, VI, VII } from "@datune/core/degrees/chromatic";
import { BLUES_a4, BLUES_b5, LOCRIAN, LYDIAN, MAJOR } from "@datune/core/scales/chromatic";
import { TestInit } from "tests";
import compare from ".";

TestInit.loadAll();
it("Scale.MAJOR and itself enharmonic", () => {
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

it("Scale.LYDIAN and Scale.LOCRIAN enharmonic", () => {
  const { common } = compare(LYDIAN, LOCRIAN);
  const expected = [
    I,
    bV,
  ];

  expect(common.size).toEqual(2);

  for (const degree of expected)
    expect(common.has(degree)).toBeTruthy();
} );

it("Scale.BLUES_b5 and Scale.BLUES_a4 are enharmonic", () => {
  const { common } = compare(BLUES_b5, BLUES_a4);
  const expected = [
    I,
    bIII,
    IV,
    bV,
    V,
    bVII,
  ];

  expect(common.size).toEqual(6);

  for (const degree of expected)
    expect(common.has(degree)).toBeTruthy();
} );
