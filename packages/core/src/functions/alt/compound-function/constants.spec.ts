/* eslint-disable camelcase */
import { V as C_V } from "degrees/alt";
import { TestInit } from "tests";
import { V, V7 } from "../degree-function";
import { V7_V, V_V } from "./constants";

TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();
describe.each([
  [V_V, V, [C_V]],
  [V7_V, V7, [C_V]],
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
