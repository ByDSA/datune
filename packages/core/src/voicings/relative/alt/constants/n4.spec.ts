import * as V from "./n4";
import * as I from "intervals/symbolic/alt/constants";
import { expectIntervals } from "intervals/symbolic/alt/tests/intervals";
import { TestInit } from "tests";

TestInit.diatonicInterval();
TestInit.diatonicAltVoicing();

describe("tests", () => {
  const { PERFECT_UNISON: P1, MINOR_SEVENTH: m7,
    MAJOR_NINTH: M9, PERFECT_ELEVENTH: P11, MAJOR_SEVENTH: M7,
    AUGMENTED_NINTH: a9, AUGMENTED_ELEVENTH: a11, MAJOR_SIXTH: M6,
    AUGMENTED_OCTAVE: a8, MAJOR_TENTH: M10, PERFECT_FIFTH: P5,
    MAJOR_SECOND: M2, PERFECT_FOURTH: P4, DIMINISHED_FOURTH: d4, DIMINISHED_OCTAVE: d8,
    MINOR_SIXTH: m6, AUGMENTED_SIXTH: a6, AUGMENTED_FOURTH: a4, MINOR_TENTH: m10,
    MINOR_NINTH: m9 } = I;

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
} );
