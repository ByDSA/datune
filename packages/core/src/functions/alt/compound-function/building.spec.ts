/* eslint-disable camelcase */
import { V as C_V } from "degrees/alt";
import { TestInit } from "tests";
import { V, V7 } from "../degree-function";
import { from } from "./building";
import { V7_V, V_V } from "./constants";

TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();

describe.each([
  [from(V, C_V), V_V],
  [from(V7, C_V), V7_V],
])("from => constants", (func, expectedCompoundFunction) => {
  it(`${String(func)} => ${String(expectedCompoundFunction)}`, () => {
    expect(func).toBe(expectedCompoundFunction);
  } );
} );

describe.each([
  [from(V7, C_V, C_V), V7, [C_V, C_V]],
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
