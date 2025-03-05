import { TestInit } from "tests";
import { Degrees as D } from "degrees/alt";
import * as DegreeFuncs from "../degree-function/constants";
import { compose } from "./building/compose";
import { V7_V, V_V } from "./constants";

TestInit.diatonicAltFunc();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();

describe("tests", () => {
  const { V7, V } = DegreeFuncs;

  describe.each([
    [compose(V, D.V), V_V],
    [compose(V7, D.V), V7_V],
  ])("from => constants", (func, expectedCompoundFunc) => {
    it(`${String(func)} => ${String(expectedCompoundFunc)}`, () => {
      expect(func).toBe(expectedCompoundFunc);
    } );
  } );

  describe.each([
    [compose(V7, D.V, D.V), V7, [D.V, D.V]],
  ])("from", (func, expectedDegreeFunc, expectedDegreeChain) => {
    it(`${String(func)} degreeFunc => ${String(expectedDegreeFunc)}`, () => {
      const actual = func.degreeFunc;

      expect(actual).toBe(expectedDegreeFunc);
    } );

    it(`${String(func)} degreeChain => ${expectedDegreeChain.map(String).join("-")}`, () => {
      const actual = func.degreeChain;

      expect(actual).toStrictEqual(expectedDegreeChain);
    } );
  } );
} );
