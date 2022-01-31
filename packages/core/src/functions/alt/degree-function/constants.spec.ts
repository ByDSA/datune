/* eslint-disable camelcase */
import { bIII as C_bIII, bV as C_bV, Degree, I as C_I, II as C_II, III as C_III, IV as C_IV, V as C_V, VI as C_VI, VII as C_VII } from "degrees/alt";
import { TestInit } from "tests";
import { SEVENTH_MAJ7, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, Voicing } from "voicings/alt";
import calcDegrees from "./calcs/degrees";
import { I, I0, Im, IVMaj7, VII0 } from "./constants";
import DegreeFunction from "./DegreeFunction";

TestInit.diatonicAltFunction();
TestInit.diatonicAltVoicing();
TestInit.diatonicAltDegree();
describe.each([
  [I, C_I, TRIAD_MAJOR, [C_I, C_III, C_V]],
  [I0, C_I, TRIAD_DIMINISHED, [C_I, C_bIII, C_bV]],
  [Im, C_I, TRIAD_MINOR, [C_I, C_bIII, C_V]],
  [VII0, C_VII, TRIAD_DIMINISHED, [C_VII, C_II, C_IV]],
  [IVMaj7, C_IV, SEVENTH_MAJ7, [C_IV, C_VI, C_I, C_III]],
])("constants", (
  degreeFunction: DegreeFunction,
  expectedDegree: Degree,
  expectedVoicing: Voicing,
  expectedDegrees: Degree[],
) => {
  describe(`${String(degreeFunction)}`, () => {
    it(`degree => ${String(expectedDegree)}`, () => {
      expect(degreeFunction.degree).toBe(expectedDegree);
    } );

    it(`voicing => ${expectedVoicing}`, () => {
      expect(degreeFunction.voicing).toBe(expectedVoicing);
    } );

    it(`degrees => ${expectedDegrees.map(String).join("-")}`, () => {
      const degrees = calcDegrees(degreeFunction);
      const expected = expectedDegrees;

      expect(degrees).toStrictEqual(expected);
    } );
  } );
} );
