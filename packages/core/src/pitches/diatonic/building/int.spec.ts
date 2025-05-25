import { inspect } from "node:util";
import { Pitches as P } from "diatonic";
import { A, B, C, D, E, F, G } from "../constants";
import { fromInt } from ".";

describe("fromInt", () => {
  describe.each([
    [0, C],
    [1, D],
    [2, E],
    [3, F],
    [4, G],
    [5, A],
    [6, B],
    // < 0
    [-1, B],
    [-2, A],
    [-7, C],
    [-8, B],
    // > 6
    [7, C],
    [8, D],
    [15, D],
  ])("tests", (int, expected) => {
    it(`${int} => ${expected}`, () => {
      const actual = fromInt(int);

      expect(actual).toBe(expected);
    } );
  } );
} );

it("should get custom inspect", () => {
  const ps = P.C;
  const output = inspect(ps);

  expect(output).toBe("Pitch(C)");
} );
