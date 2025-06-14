import { Intervals as I } from "intervals/alt";
import { expectIntervals } from "intervals/symbolic/alt/tests/intervals";
import { IntervalSets } from "..";

const { P1, m7,
  M9, P11, M7,
  a9, a11, M6,
  a8, M10, P5,
  M2, P4, d4, d8,
  m6, a6, a4, m10,
  m9 } = I;

describe.each([
  ["M/M2", IntervalSets.MAJOR_OVER_M2, [P1, m7, M9, P11]],
  ["M/m2", IntervalSets.MAJOR_OVER_m2, [P1, M7, a9, a11]],
  ["M/m3", IntervalSets.MAJOR_OVER_m3, [P1, M6, a8, M10]],
  ["M/P4", IntervalSets.MAJOR_OVER_P4, [P1, P5, M7, M9]],
  ["M/d5", IntervalSets.MAJOR_OVER_d5, [P1, a4, a6, a8]],
  ["M/a5", IntervalSets.MAJOR_OVER_a5, [P1, d4, m6, d8]],
  ["m/m2", IntervalSets.MINOR_OVER_m2, [P1, M7, M9, a11]],
  ["m/M2", IntervalSets.MINOR_OVER_M2, [P1, m7, m9, P11]],
  ["m/M3", IntervalSets.MINOR_OVER_M3, [P1, m6, d8, m10]],
  ["m/P4", IntervalSets.MINOR_OVER_P4, [P1, P5, m7, M9]],
  ["m/d5", IntervalSets.MINOR_OVER_d5, [P1, a4, M6, a8]],
  ["m/m7", IntervalSets.MINOR_OVER_m7, [P1, M2, P4, M6]],
])("should have intervals", (tag, intervalSet, ints) => {
  it("intervalSet constant for " + tag + " should have been initialized correctly", () => {
    expect(intervalSet).toBeDefined();
    expect(intervalSet).not.toBeNull();
  } );

  it("intervalSet " + tag + " should have intervals: " + ints, () => {
    expectIntervals(intervalSet.rootIntervals, ints);
  } );
} );
