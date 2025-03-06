import { Intervals as I } from "intervals/alt";
import { expectIntervals } from "intervals/symbolic/alt/tests/intervals";
import { Voicings as V } from "..";

const { P1, m7,
  M9, P11, M7,
  a9, a11, M6,
  a8, M10, P5,
  M2, P4, d4, d8,
  m6, a6, a4, m10,
  m9 } = I;

describe.each([
  ["M/M2", V.MAJOR_OVER_M2, [P1, m7, M9, P11]],
  ["M/m2", V.MAJOR_OVER_m2, [P1, M7, a9, a11]],
  ["M/m3", V.MAJOR_OVER_m3, [P1, M6, a8, M10]],
  ["M/P4", V.MAJOR_OVER_P4, [P1, P5, M7, M9]],
  ["M/d5", V.MAJOR_OVER_d5, [P1, a4, a6, a8]],
  ["M/a5", V.MAJOR_OVER_a5, [P1, d4, m6, d8]],
  ["m/m2", V.MINOR_OVER_m2, [P1, M7, M9, a11]],
  ["m/M2", V.MINOR_OVER_M2, [P1, m7, m9, P11]],
  ["m/M3", V.MINOR_OVER_M3, [P1, m6, d8, m10]],
  ["m/P4", V.MINOR_OVER_P4, [P1, P5, m7, M9]],
  ["m/d5", V.MINOR_OVER_d5, [P1, a4, M6, a8]],
  ["m/m7", V.MINOR_OVER_m7, [P1, M2, P4, M6]],
])("should have intervals", (tag, v, ints) => {
  it("voicing constant for " + tag + " should have been initialized correctly", () => {
    expect(v).toBeDefined();
    expect(v).not.toBeNull();
  } );

  it("voicing " + tag + " should have intervals: " + ints, () => {
    expectIntervals(v.rootIntervals, ints);
  } );
} );
