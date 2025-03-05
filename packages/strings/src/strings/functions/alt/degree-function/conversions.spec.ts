import { Funcs as F } from "@datune/core/functions/alt";
import { TestInit, TestLang } from "tests";
import { stringifyDegreeFunc } from ".";

TestInit.diatonicAltFunc();
TestLang.loadAll();

describe.each([
  [F.I, "I"],
  [F.I5, "I5"],
  [F.Im, "Im"],
  [F.VISUS4, "VIsus4"],
])("constants", (func, expectedString) => {
  it(`${func} => ${expectedString}`, () => {
    const actual = stringifyDegreeFunc(func);

    expect(actual).toBe(expectedString);
  } );
} );
