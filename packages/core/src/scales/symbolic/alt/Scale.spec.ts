import type { DegreeArray } from "degrees/alt";
import { Degrees as D } from "degrees/alt";
import { Degrees as DD } from "degrees/diatonic";
import { Funcs as F } from "functions/alt";
import { getDegreeFuncs } from "./modifiers";
import { Scales as S } from ".";

const { CHROMATIC } = S;

it("hasEnharmonicDegrees - CHROMATIC - II# and bIII", () => {
  const degrees: DegreeArray = [
    D.from(DD.II, 1),
    D.bIII,
  ];

  expect(CHROMATIC.hasEnharmonicDegrees(...degrees)).toBeTruthy();
} );

it("degreeFuncs - CHROMATIC - I (mayor)", () => {
  const actual = getDegreeFuncs(CHROMATIC);

  expect(actual.includes(F.I)).toBeTruthy();
} );
