/* eslint-disable camelcase */
import { bIII as C_bIII, Degree, I as C_I, II as C_II, III as C_III, IV as C_IV, V as C_V, VI as C_VI, VII as C_VII } from "degrees/chromatic";
import { TestInit } from "tests";
import { SEVENTH_MAJ7, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, Voicing } from "voicings/chromatic";
import { from } from "./building";
import { I, Im, IVMaj7, VII0 } from "./constants";
import DegreeFunction from "./DegreeFunction";

TestInit.chromaticFunction();
describe.each([
  [I, C_I, TRIAD_MAJOR, [C_I, C_III, C_V]],
  [Im, C_I, TRIAD_MINOR, [C_I, C_bIII, C_V]],
  [VII0, C_VII, TRIAD_DIMINISHED, [C_VII, C_II, C_IV]],
  [IVMaj7, C_IV, SEVENTH_MAJ7, [C_IV, C_VI, C_I, C_III]],
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
    degree: C_I,
    voicing: TRIAD_MINOR,
  } );
  const expected = Im;

  expect(degreeFunction).toEqual(expected);
} );
