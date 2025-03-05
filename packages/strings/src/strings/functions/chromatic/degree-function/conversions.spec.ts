import { I, I5, Im, VISUS4 } from "@datune/core/functions/chromatic/degree-function/constants";
import { TestInit, TestLang } from "tests";
import { stringifyDegreeFunc } from ".";

TestInit.chromaticFunc();
TestLang.loadAll();

describe.each([
  [I, "I"],
  [I5, "I5"],
  [Im, "Im"],
  [VISUS4, "VIsus4"],
])("constants", (func, expectedString) => {
  it(`${func} => ${expectedString}`, () => {
    const actual = stringifyDegreeFunc(func);

    expect(actual).toBe(expectedString);
  } );
} );
