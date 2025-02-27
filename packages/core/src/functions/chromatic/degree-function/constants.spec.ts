import { from } from "./building/from";
import { I, Im, IVMaj7, VII0 } from "./constants";
import { DegreeFunction } from "./DegreeFunction";
import { Degrees as C, Degree } from "degrees/chromatic";
import { TestInit } from "tests";
import { Voicings, Voicing } from "voicings/chromatic";

TestInit.chromaticFunction();

describe("tests", () => {
  const { SEVENTH_MAJ7, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = Voicings;

  describe.each([
    [I, C.I, TRIAD_MAJOR, [C.I, C.III, C.V]],
    [Im, C.I, TRIAD_MINOR, [C.I, C.bIII, C.V]],
    [VII0, C.VII, TRIAD_DIMINISHED, [C.VII, C.II, C.IV]],
    [IVMaj7, C.IV, SEVENTH_MAJ7, [C.IV, C.VI, C.I, C.III]],
  ])("%s", (
    degreeFunction: DegreeFunction,
    expectedDegree: Degree,
    expectedVoicing: Voicing,
    expectedDegrees: Degree[],
  ) => {
    it("degree", () => {
      expect(degreeFunction.degree).toBe(expectedDegree);
    } );

    it("voicing", () => {
      expect(degreeFunction.voicing).toBe(expectedVoicing);
    } );

    it("degrees", () => {
      const { degrees } = degreeFunction;
      const expected = expectedDegrees;

      expect(degrees).toStrictEqual(expected);
    } );
  } );

  it("from: I + TRIAD_MAJOR = I", () => {
    const degreeFunction = from( {
      degree: C.I,
      voicing: TRIAD_MINOR,
    } );
    const expected = Im;

    expect(degreeFunction).toEqual(expected);
  } );
} );
