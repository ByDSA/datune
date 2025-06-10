import { Keys, PitchSets } from "@datune/core";
import { getNRegionalCircleOfFifthsRule, regionalCircleOfFifthsRule } from "./regional-circle-of-fifths-rule";

describe.each([
  // Figure 2.16, p. 60:
  [Keys.C.pitches, 1, Keys.G.pitches],
  // Anothers:
  [Keys.C.pitches, -1, Keys.F.pitches],
])("regionalCircleOfFifthsRule", (diatonicLevel, n: number, expected) => {
  describe(diatonicLevel + " n=" + n + " => " + expected, () => {
    it("returns the correct pitches", () => {
      const actual = regionalCircleOfFifthsRule(diatonicLevel, n);

      expect(actual).toStrictEqual(expected);
    } );

    describe("getNRegionalCircleOfFifthsRule", () => {
      it("calc n should be " + n, () => {
        const from = PitchSets.fromPitches(...diatonicLevel);
        const to = PitchSets.fromPitches(...expected);
        const actual = getNRegionalCircleOfFifthsRule( {
          from,
          to,
        } );

        expect(actual).toBe(n);
      } );

      it("calc n should be reversible", () => {
        const from = PitchSets.fromPitches(...diatonicLevel);
        const to = PitchSets.fromPitches(...expected);
        const actual = getNRegionalCircleOfFifthsRule( {
          from,
          to,
        } );
        const actualReversed = getNRegionalCircleOfFifthsRule( {
          from,
          to,
        } );

        expect(actualReversed).toBe(actual);
      } );
    } );
  } );
} );
