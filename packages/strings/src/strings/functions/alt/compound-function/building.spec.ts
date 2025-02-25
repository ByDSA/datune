/* eslint-disable camelcase */
import { V as C_V } from "@datune/core/degrees/alt";
import { from } from "@datune/core/functions/alt/compound-function";
import { V7 } from "@datune/core/functions/alt/degree-function";
import { TestInit, TestLang } from "tests";
import stringify from ".";

TestInit.diatonicAltFunction();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();
TestLang.loadAll();

describe.each([
  [from(V7, C_V, C_V), "V7/V/V"],
])("tests", (func, expectedString) => {
  it(`${String(func)} => ${expectedString}`, () => {
    const actual = stringify(func);

    expect(actual).toBe(expectedString);
  } );
} );
