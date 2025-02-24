/* eslint-disable camelcase */
import { Array as DegreeAltArray, bIII, from } from "degrees/alt";
import { II as D_II } from "degrees/diatonic";
import { I as F_I } from "functions/alt";
import { TestInit } from "tests";
import { CHROMATIC } from "./constants";
import { getDegreeFunctions } from "./modifiers";

TestInit.diatonicAltScale();
TestInit.diatonicAltFunction();
TestInit.diatonicAltVoicing();

it("hasEnharmonicDegrees - CHROMATIC - II# and bIII", () => {
  const degrees: DegreeAltArray = [
    from(D_II, 1),
    bIII,
  ];

  expect(CHROMATIC.hasEnharmonicDegrees(...degrees)).toBeTruthy();
} );

it("degreeFunctions - CHROMATIC - I (mayor)", () => {
  const actual = getDegreeFunctions(CHROMATIC);

  expect(actual.includes(F_I)).toBeTruthy();
} );
