import { I, I5, Im, VISUS4 } from "@datune/core/functions/chromatic/degree-function/constants";
import { TestInit, TestLang } from "tests";
import { stringifyDegreeFunction } from ".";

TestInit.chromaticFunction();
TestLang.loadAll();

describe.each([
  [I, "I"],
  [I5, "I5"],
  [Im, "Im"],
  [VISUS4, "VIsus4"],
])("constants", (func, expectedString) => {
  it(`${func} => ${expectedString}`, () => {
    const actual = stringifyDegreeFunction(func);

    expect(actual).toBe(expectedString);
  } );
} );
