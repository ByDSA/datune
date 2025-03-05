import { Degrees as D } from "@datune/core/degrees/alt";
import { compose } from "@datune/core/functions/alt/compound-function/building/compose";
import { V7 } from "@datune/core/functions/alt/degree-function/constants";
import { TestInit, TestLang } from "tests";
import { stringifyCompoundFunc } from ".";

TestInit.diatonicAltFunc();
TestInit.diatonicAltKey();
TestInit.diatonicAltChord();
TestLang.loadAll();

describe.each([
  [compose(V7, D.V, D.V), "V7/V/V"],
])("tests", (func, expectedString) => {
  it(`${String(func)} => ${expectedString}`, () => {
    const actual = stringifyCompoundFunc(func);

    expect(actual).toBe(expectedString);
  } );
} );
