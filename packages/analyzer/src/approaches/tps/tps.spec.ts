import { Pitches as P } from "@datune/core";
import { fifthDistance } from "./tps";

describe("fifthDistance", () => {
  describe.each([
  // should return 0 when both pitches are equal
    [P.C, P.C, 0],
    // should return 1 for adjacent pitches in the fifths circle
    [P.C, P.G, 1],
    // should correctly handle wrap-around cases
    [P.C, P.F, -1],
    // should correctly handle wrap-around cases 2
    [P.G, P.C, -1],
    // should correctly handle wrap-around cases 3
    [P.F, P.C, 1],
    // should calculate the distance for non-adjacent pitches
    [P.E, P.B, 1],
    // should return the max distance over the circle
    [P.D, P.GG, 6, false],
    [P.GG, P.D, 6, false],
  ])("fifthDistance(%p, %p)", (pitchA, pitchB, expected, reversible: boolean = true) => {
    it(`should return ${expected}`, () => {
      expect(fifthDistance(pitchA, pitchB)).toBe(expected);
    } );

    if (reversible) {
      it(`should be reversible: ${-expected}`, () => {
        expect(fifthDistance(pitchB, pitchA)).toBe(expected !== 0 ? -expected : 0);
      } );
    }
  } );

  describe("fifthDistance boundary tests", () => {
    it("should always return a value between -5 and 6 for every combination of pitches", () => {
      for (let a = 0; a < P.NUMBER; a++) {
        for (let b = 0; b < P.NUMBER; b++) {
          const aPitch = P.ALL[a];
          const bPitch = P.ALL[b];
          const result = fifthDistance(aPitch, bPitch);

          expect(result).toBeGreaterThanOrEqual(-5);
          expect(result).toBeLessThanOrEqual(6);
        }
      }
    } );
  } );
} );
