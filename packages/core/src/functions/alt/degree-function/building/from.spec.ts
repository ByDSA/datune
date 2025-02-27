import { Im } from "../constants";
import from from "./from";
import { Degrees } from "degrees/alt";
import { TestInit } from "tests";
import { Voicings } from "voicings/alt";

TestInit.diatonicAltFunction();
TestInit.diatonicAltVoicing();
TestInit.diatonicAltDegree();

it("from: I + TRIAD_MINOR = Im", () => {
  const degreeFunction = from( {
    degree: Degrees.I,
    voicing: Voicings.TRIAD_MINOR,
  } );
  const expected = Im;

  expect(degreeFunction).toEqual(expected);
} );
