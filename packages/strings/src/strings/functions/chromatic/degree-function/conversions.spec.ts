/* eslint-disable camelcase */
import { I, I5, Im, VISUS4 } from "functions/chromatic/degree-function";
import { TestInit, TestLang } from "tests";
import stringify from ".";

TestInit.chromaticFunction();
TestLang.loadAll();
describe.each([
  [I, "I"],
  [I5, "I5"],
  [Im, "Im"],
  [VISUS4, "VIsus4"],
])("constants", (func, expectedString) => {
  it(`${func} => ${expectedString}`, () => {
    const actual = stringify(func);

    expect(actual).toBe(expectedString);
  } );
} );
