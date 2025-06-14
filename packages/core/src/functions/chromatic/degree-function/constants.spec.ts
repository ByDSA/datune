/* eslint-disable @typescript-eslint/naming-convention */
import type { DegreeFunc } from "./DegreeFunc";
import type { IntervalSet } from "sets/interval-sets/chromatic";
import { Degrees as D, Degree } from "degrees/chromatic";
import { IntervalSets } from "sets/interval-sets/chromatic";
import { Funcs as F } from "..";
import { fromDegreeIntervalSet } from "./building/fromDegreeIntervalSet";
import { getDegrees } from "./conversions";

const { I, Im, IVMaj7, VII0 } = F;
const { SEVENTH_MAJ7, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR } = IntervalSets;

describe.each([
  [I, D.I, TRIAD_MAJOR, [D.I, D.III, D.V]],
  [Im, D.I, TRIAD_MINOR, [D.I, D.bIII, D.V]],
  [VII0, D.VII, TRIAD_DIMINISHED, [D.VII, D.II, D.IV]],
  [IVMaj7, D.IV, SEVENTH_MAJ7, [D.IV, D.VI, D.I, D.III]],
])("%s", (
  degreeFunc: DegreeFunc,
  expectedDegree: Degree,
  expectedIntervalSet: IntervalSet,
  expectedDegrees: Degree[],
) => {
  it("degree", () => {
    expect(degreeFunc.baseDegree).toBe(expectedDegree);
  } );

  it("intervalSets", () => {
    expect(degreeFunc.intervalSet).toBe(expectedIntervalSet);
  } );

  it("degrees", () => {
    const degrees = getDegrees(degreeFunc);
    const expected = expectedDegrees;

    expect(degrees).toStrictEqual(expected);
  } );
} );

it("from: I + TRIAD_MAJOR = I", () => {
  const degreeFunc = fromDegreeIntervalSet(D.I, TRIAD_MINOR);
  const expected = Im;

  expect(degreeFunc).toEqual(expected);
} );
