import type { DegreeArray as CDegreeArray } from "degrees/chromatic";
import { Degrees as D } from "degrees/alt";
import { Funcs as F } from "functions/alt";
import { Scales as CS } from "chromatic";
import { getDegreeFuncs } from "./modifiers";
import { Scales as S } from ".";

const { CHROMATIC } = S;

it("hasChromaticDegrees - CHROMATIC - II# and bIII", () => {
  const degrees: CDegreeArray = [
    D.aII.toChromaticDegree(),
    D.bIII.toChromaticDegree(),
  ];

  expect(CHROMATIC.hasChromaticDegrees(...degrees)).toBeTruthy();
} );

it("degreeFuncs - CHROMATIC - I (mayor)", () => {
  const actual = getDegreeFuncs(CHROMATIC);

  expect(actual.includes(F.I)).toBeTruthy();
} );

it("toChromatic", () => {
  const expected = CS.MAJOR;
  const base = S.MAJOR;
  const actual = S.MAJOR.toChromatic();

  expect(actual).toBe(expected);
  expect(actual.toAlt()).toBe(base);
} );
