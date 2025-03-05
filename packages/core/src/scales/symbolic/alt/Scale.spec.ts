import { DegreeArray as DegreeAltArray, Degrees } from "degrees/alt";
import { Degrees as D } from "degrees/diatonic";
import { Funcs as F } from "functions/alt";
import { TestInit } from "tests";
import { getDegreeFuncs } from "./modifiers";
import { CHROMATIC } from "./constants";

TestInit.diatonicAltScale();
TestInit.diatonicAltFunc();
TestInit.diatonicAltVoicing();

it("hasEnharmonicDegrees - CHROMATIC - II# and bIII", () => {
  const degrees: DegreeAltArray = [
    Degrees.from(D.II, 1),
    Degrees.bIII,
  ];

  expect(CHROMATIC.hasEnharmonicDegrees(...degrees)).toBeTruthy();
} );

it("degreeFuncs - CHROMATIC - I (mayor)", () => {
  const actual = getDegreeFuncs(CHROMATIC);

  expect(actual.includes(F.I)).toBeTruthy();
} );
