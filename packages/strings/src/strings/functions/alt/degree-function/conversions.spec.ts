import { Functions as F } from "@datune/core/functions/alt";
import { stringifyDegreeFunction } from ".";
import { TestInit, TestLang } from "tests";

TestInit.diatonicAltFunction();
TestLang.loadAll();

describe.each([
  [F.I, "I"],
  [F.I5, "I5"],
  [F.Im, "Im"],
  [F.VISUS4, "VIsus4"],
])("constants", (func, expectedString) => {
  it(`${func} => ${expectedString}`, () => {
    const actual = stringifyDegreeFunction(func);

    expect(actual).toBe(expectedString);
  } );
} );
