import { Degrees } from "degrees/alt";
import { TestInit } from "tests";
import { Voicings } from "voicings/alt";
import { Im } from "../constants";
import { from } from "./from";

TestInit.diatonicAltFunc();
TestInit.diatonicAltVoicing();
TestInit.diatonicAltDegree();

it("from: I + TRIAD_MINOR = Im", () => {
  const degreeFunc = from( {
    degree: Degrees.I,
    voicing: Voicings.TRIAD_MINOR,
  } );
  const expected = Im;

  expect(degreeFunc).toEqual(expected);
} );
