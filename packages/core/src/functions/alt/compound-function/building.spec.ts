import { Degrees as D } from "degrees/alt";
import { Funcs as F } from "..";
import { compose } from "./building/compose";

const { V_V, V7_V, V7, V } = F;

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
