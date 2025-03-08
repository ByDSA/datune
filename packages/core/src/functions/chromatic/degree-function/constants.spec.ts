/* eslint-disable @typescript-eslint/naming-convention */
import type { DegreeFunc } from "./DegreeFunc";
import type { Voicing } from "voicings/chromatic";
import { Degrees as D, Degree } from "degrees/chromatic";
import { Voicings as V } from "voicings/chromatic";
import { Funcs as F } from "..";
import { fromDegreeVoicing } from "./building/fromDegreeVoicing";
import { getDegrees } from "./conversions";

const { I, Im, IVMaj7, VII0 } = F;
const { SEVENTH_MAJ7, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = V;

describe.each([
  [I, D.I, TRIAD_MAJOR, [D.I, D.III, D.V]],
  [Im, D.I, TRIAD_MINOR, [D.I, D.bIII, D.V]],
  [VII0, D.VII, TRIAD_DIMINISHED, [D.VII, D.II, D.IV]],
  [IVMaj7, D.IV, SEVENTH_MAJ7, [D.IV, D.VI, D.I, D.III]],
])("%s", (
  degreeFunc: DegreeFunc,
  expectedDegree: Degree,
  expectedVoicing: Voicing,
  expectedDegrees: Degree[],
) => {
  it("degree", () => {
    expect(degreeFunc.degree).toBe(expectedDegree);
  } );

  it("voicing", () => {
    expect(degreeFunc.voicing).toBe(expectedVoicing);
  } );

  it("degrees", () => {
    const degrees = getDegrees(degreeFunc);
    const expected = expectedDegrees;

    expect(degrees).toStrictEqual(expected);
  } );
} );

it("from: I + TRIAD_MAJOR = I", () => {
  const degreeFunc = fromDegreeVoicing(D.I, TRIAD_MINOR);
  const expected = Im;

  expect(degreeFunc).toEqual(expected);
} );
