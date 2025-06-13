import { Funcs as F, Keys as K } from "@datune/core/alt";
import { chordRegionDistanceRule } from "./chord-region-distance-rule";

describe.each([
  // p. 70
  {
    start: {
      chord: K.F.getChord(F.VIm),
      key: K.F,
      region: K.C,
    },
    goal: {
      chord: K.Bm.getChord(F.V),
      key: K.Bm,
      region: K.Em,
    },
    expectedStartDist: 10,
    expectedShifts: 9,
    expectedEndDist: 11,
  },
])("chordRegionDistanceRule", ( { expectedStartDist,
  expectedShifts,
  expectedEndDist,
  start,
  goal } ) => {
  const actual = chordRegionDistanceRule( {
    start,
    goal,
  } );

  it("should return correct start distance", () => {
    expect(actual.meta.startToTonicPivotRegion?.dist).toBe(expectedStartDist);
  } );

  it("should return correct pivot region shifts distance", () => {
    expect(actual.meta.pivotRegionShifts?.dist).toBe(expectedShifts);
  } );

  it("should return correct end distance", () => {
    expect(actual.meta.endTonicPivotRegionToGoal?.dist).toBe(expectedEndDist);
  } );

  it("should return correct overall distance", () => {
    const expected = expectedStartDist + expectedShifts + expectedEndDist;

    expect(actual.dist).toBe(expected);
  } );
} );
