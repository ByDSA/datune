import { DegreeArray as DegreeAltArray, Degrees } from "degrees/alt";
import { Degrees as D } from "degrees/diatonic";
import { Functions as F } from "functions/alt";
import { TestInit } from "tests";
import { getDegreeFunctions } from "./modifiers";
import { CHROMATIC } from "./constants";

TestInit.diatonicAltScale();
TestInit.diatonicAltFunction();
TestInit.diatonicAltVoicing();

it("hasEnharmonicDegrees - CHROMATIC - II# and bIII", () => {
  const degrees: DegreeAltArray = [
    Degrees.from(D.II, 1),
    Degrees.bIII,
  ];

  expect(CHROMATIC.hasEnharmonicDegrees(...degrees)).toBeTruthy();
} );

it("degreeFunctions - CHROMATIC - I (mayor)", () => {
  const actual = getDegreeFunctions(CHROMATIC);

  expect(actual.includes(F.I)).toBeTruthy();
} );
