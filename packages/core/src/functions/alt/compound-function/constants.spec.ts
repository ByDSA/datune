import * as DegreeFunctions from "../degree-function/constants";
import * as Constants from "./constants";
import { Degrees } from "degrees/alt";
import { TestInit } from "tests";

TestInit.diatonicAltDegree();
TestInit.diatonicAltFunction();

describe("tests", () => {
  const { V, V7 } = DegreeFunctions;
  const { V7_V, V_V } = Constants;

  describe.each([
    [V_V, V, [Degrees.V]],
    [V7_V, V7, [Degrees.V]],
  ])("constants", (func, expectedDegreeFunction, expectedDegreeChain) => {
    describe(`${String(func)}`, () => {
      it(`degreeFunction => ${String(expectedDegreeFunction)}`, () => {
        const actual = func.degreeFunction;

        expect(actual).toBe(expectedDegreeFunction);
      } );

      it(`degreeChain => ${expectedDegreeChain.map(String).join("-")}`, () => {
        const actual = func.degreeChain;

        expect(actual).toStrictEqual(expectedDegreeChain);
      } );
    } );
  } );
} );
