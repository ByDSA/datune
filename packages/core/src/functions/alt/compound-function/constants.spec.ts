import { Degrees as D } from "degrees/alt";
import { Funcs as F } from "..";

const { V, V7, V7_V, V_V } = F;

describe.each([
  [V_V, V, [D.V]],
  [V7_V, V7, [D.V]],
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
