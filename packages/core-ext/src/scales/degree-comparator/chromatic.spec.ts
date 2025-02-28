/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Degrees } from "@datune/core/degrees/chromatic";
import { Scales } from "@datune/core/scales/chromatic";
import { compare } from ".";
import { TestInit } from "tests";

TestInit.loadAll();

const { bIII, bV, bVII, I, II, III, IV, V, VI, VII } = Degrees;
const { BLUES_a4, BLUES_b5, LOCRIAN, LYDIAN, MAJOR } = Scales;

it("scale.MAJOR and itself enharmonic", () => {
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

it("scale.LYDIAN and Scale.LOCRIAN enharmonic", () => {
  const { common } = compare(LYDIAN, LOCRIAN);
  const expected = [
    I,
    bV,
  ];

  expect(common.size).toBe(2);

  for (const degree of expected)
    expect(common.has(degree)).toBeTruthy();
} );

it("scale.BLUES_b5 and Scale.BLUES_a4 are enharmonic", () => {
  const { common } = compare(BLUES_b5, BLUES_a4);
  const expected = [
    I,
    bIII,
    IV,
    bV,
    V,
    bVII,
  ];

  expect(common.size).toBe(6);

  for (const degree of expected)
    expect(common.has(degree)).toBeTruthy();
} );
