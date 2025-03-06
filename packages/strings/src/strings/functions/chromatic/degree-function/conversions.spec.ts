import { Funcs as F } from "@datune/core";
import { TestLang } from "tests";
import { stringifyDegreeFunc } from ".";

TestLang.loadAll();
// eslint-disable-next-line @typescript-eslint/naming-convention
const { I, I5, Im, VISUS4 } = F;

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
