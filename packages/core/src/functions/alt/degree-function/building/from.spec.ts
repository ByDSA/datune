/* eslint-disable camelcase */
import { I as D_I } from "degrees/alt";
import { TestInit } from "tests";
import { TRIAD_MINOR } from "voicings/alt";
import { Im } from "../constants";
import from from "./from";

TestInit.diatonicAltFunction();
TestInit.diatonicAltVoicing();
TestInit.diatonicAltDegree();
it("from: I + TRIAD_MINOR = Im", () => {
  const degreeFunction = from( {
    degree: D_I,
    voicing: TRIAD_MINOR,
  } );
  const expected = Im;

  expect(degreeFunction).toEqual(expected);
} );
