import type { DegreeFunc } from "./DegreeFunc";
import { Degrees, Degree } from "degrees/alt";
import { TestInit } from "tests";
import { Voicings, Voicing } from "voicings/alt";
import { I, I0, Im, IVMaj7, VII0 } from "./constants";
import { calcDegrees } from "./calcs/degrees";

TestInit.diatonicAltFunc();

describe("tests", () => {
  const { SEVENTH_MAJ7, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;

  describe.each([
    [I, Degrees.I, TRIAD_MAJOR, [Degrees.I, Degrees.III, Degrees.V]],
    [I0, Degrees.I, TRIAD_DIMINISHED, [Degrees.I, Degrees.bIII, Degrees.bV]],
    [Im, Degrees.I, TRIAD_MINOR, [Degrees.I, Degrees.bIII, Degrees.V]],
    [VII0, Degrees.VII, TRIAD_DIMINISHED, [Degrees.VII, Degrees.II, Degrees.IV]],
    [IVMaj7, Degrees.IV, SEVENTH_MAJ7, [Degrees.IV, Degrees.VI, Degrees.I, Degrees.III]],
  ])("constants", (
    degreeFunc: DegreeFunc,
    expectedDegree: Degree,
    expectedVoicing: Voicing,
    expectedDegrees: Degree[],
  ) => {
    describe(`${String(degreeFunc)}`, () => {
      it(`degree => ${String(expectedDegree)}`, () => {
        expect(degreeFunc.degree).toBe(expectedDegree);
      } );

      it(`voicing => ${expectedVoicing}`, () => {
        expect(degreeFunc.voicing).toBe(expectedVoicing);
      } );

      it(`degrees => ${expectedDegrees.map(String).join("-")}`, () => {
        const degrees = calcDegrees(degreeFunc);
        const expected = expectedDegrees;

        expect(degrees).toStrictEqual(expected);
      } );
    } );
  } );
} );
