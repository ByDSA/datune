import { Funcs as F, Intervals as I, IntervalSets } from "@datune/core/alt";
import { DegreeFunc } from "@datune/core/functions/alt/degree-function/DegreeFunc";
import { Degrees as DD } from "@datune/core/diatonic";
import { findAllShortestPaths, getAllNeighbors } from "./regional-space-motion";

const pathsImTobVm = [
  [
    F.Im,
    F.bIII,
    F.bIIIm,
    F.bV,
    F.bVm,
  ],
  [
    F.Im,
    F.IVm,
    F.bVIIm,
    F.bV,
    F.bVm,
  ],
  [
    F.Im,
    F.IVm,
    F.bII,
    F.bIIm,
    F.bVm,
  ],
  [
    F.Im,
    F.IVm,
    F.bII,
    F.bV,
    F.bVm,
  ],
  [
    F.Im,
    F.bVII,
    F.bVIIm,
    F.bV,
    F.bVm,
  ],
  [
    F.Im,
    F.bVI,
    F.bVIm,
    F.bIIm,
    F.bVm,
  ],
  [
    F.Im,
    F.bVI,
    F.bVIm,
    F.bV,
    F.bVm,
  ],
  [
    F.Im,
    F.bVI,
    F.bVIm,
    F.fromDegreeIntervalSet(I.fromDiatonicInterval(DD.IV, -1), IntervalSets.TRIAD_MAJOR), // bIV
    F.bVm,
  ],
  [
    F.Im,
    F.bVI,
    F.bII,
    F.bIIm,
    F.bVm,
  ],
  [
    F.Im,
    F.bVI,
    F.bII,
    F.bV,
    F.bVm,
  ],
  [
    F.Im,
    F.bVI,
    F.bVIIm,
    F.bV,
    F.bVm,
  ],
];

describe.each([
  // From I
  [F.I, F.I, [[F.I]], 0],
  [F.I, F.Im, [[F.I, F.Im]], 1], // right
  [F.I, F.IV, [[F.I, F.IV]], 1], // bottom
  [F.I, F.IIm, [[F.I, F.IIm]], 1], // left-bottom
  [F.I, F.VIm, [[F.I, F.VIm]], 1], // left
  [F.I, F.IIIm, [[F.I, F.IIIm]], 1], // left-up
  [F.I, F.V, [[F.I, F.V]], 1], // up
  // Otros:
  [F.I, F.VI, [[F.I, F.VIm, F.VI]], 2],
  [F.Im, F.bVm, pathsImTobVm, 4, 11],
])("findAllShortestPaths: (%s) -> (%s) %s %s %s", (from: DegreeFunc, to: DegreeFunc, expected: DegreeFunc[][], expectedN: number, expectedNumberOfPaths = 1) => {
  let actual: DegreeFunc[][];

  beforeAll(() => {
    actual = findAllShortestPaths( {
      start: from,
      goal: to,
    } );
  } );

  it("returns the expected paths", () => {
    expect(new Set(actual)).toStrictEqual(new Set(expected));
  } );

  it("returns the expected number of paths", () => {
    expect(actual).toHaveLength(expectedNumberOfPaths);
  } );

  it("returns the expected minimum number of steps", () => {
    const actualN = Math.min(...actual.map(p => p.length - 1));

    expect(actualN).toBe(expectedN);
  } );
} );

describe.each([
  [F.I, [F.Im, F.IV, F.IIm, F.VIm, F.IIIm, F.V]],
  [F.bII, [F.bIIm, F.bV, F.bIIIm, F.bVIIm, F.IVm, F.bVI]],
])("getAllNeighbors from %s", (from, expected) => {
  it("returns the expected neighbors", () => {
    const actual = getAllNeighbors(from);

    expect(new Set(actual)).toStrictEqual(new Set(expected));
  } );
} );
