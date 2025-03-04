import { TestInit } from "tests";
import { Degrees as D } from "degrees/alt";
import * as DegreeFunctions from "../degree-function/constants";
import { compose } from "./building/compose";
import { V7_V, V_V } from "./constants";

TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();

describe("tests", () => {
  const { V7, V } = DegreeFunctions;

  describe.each([
    [compose(V, D.V), V_V],
    [compose(V7, D.V), V7_V],
  ])("from => constants", (func, expectedCompoundFunction) => {
    it(`${String(func)} => ${String(expectedCompoundFunction)}`, () => {
      expect(func).toBe(expectedCompoundFunction);
    } );
  } );

  describe.each([
    [compose(V7, D.V, D.V), V7, [D.V, D.V]],
  ])("from", (func, expectedDegreeFunction, expectedDegreeChain) => {
    it(`${String(func)} degreeFunction => ${String(expectedDegreeFunction)}`, () => {
      const actual = func.degreeFunction;

      expect(actual).toBe(expectedDegreeFunction);
    } );

    it(`${String(func)} degreeChain => ${expectedDegreeChain.map(String).join("-")}`, () => {
      const actual = func.degreeChain;

      expect(actual).toStrictEqual(expectedDegreeChain);
    } );
  } );
} );
