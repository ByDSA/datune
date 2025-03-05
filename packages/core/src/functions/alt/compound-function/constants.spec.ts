import { Degrees } from "degrees/alt";
import { TestInit } from "tests";
import * as DegreeFuncs from "../degree-function/constants";
import * as Constants from "./constants";

TestInit.diatonicAltDegree();
TestInit.diatonicAltFunc();

describe("tests", () => {
  const { V, V7 } = DegreeFuncs;
  const { V7_V, V_V } = Constants;

  describe.each([
    [V_V, V, [Degrees.V]],
    [V7_V, V7, [Degrees.V]],
  ])("constants", (func, expectedDegreeFunc, expectedDegreeChain) => {
    describe(`${String(func)}`, () => {
      it(`degreeFunc => ${String(expectedDegreeFunc)}`, () => {
        const actual = func.degreeFunc;

        expect(actual).toBe(expectedDegreeFunc);
      } );

      it(`degreeChain => ${expectedDegreeChain.map(String).join("-")}`, () => {
        const actual = func.degreeChain;

        expect(actual).toStrictEqual(expectedDegreeChain);
      } );
    } );
  } );
} );
