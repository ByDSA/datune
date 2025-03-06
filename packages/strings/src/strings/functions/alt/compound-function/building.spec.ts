import { Degrees as D } from "@datune/core/degrees/alt";
import { compose } from "@datune/core/functions/alt/compound-function/building/compose";
import { Funcs as F } from "@datune/core/alt";
import { TestLang } from "tests";
import { stringifyCompoundFunc } from ".";

TestLang.loadAll();
const { V7 } = F;

describe.each([
  [compose(V7, D.V, D.V), "V7/V/V"],
])("tests", (func, expectedString) => {
  it(`${String(func)} => ${expectedString}`, () => {
    const actual = stringifyCompoundFunc(func);

    expect(actual).toBe(expectedString);
  } );
} );
