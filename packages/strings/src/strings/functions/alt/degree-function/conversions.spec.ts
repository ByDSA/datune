import { Funcs as F } from "@datune/core/functions/alt";
import { TestLang } from "tests";
import { stringifyDegreeFunc } from ".";

TestLang.loadAll();

describe.each([
  [F.I, "I"],
  [F.I5, "I5"],
  [F.Im, "Im"],
  [F.VISUS4, "VIsus4"],
  [F.bII7SUS4b9, "♭II7sus4(♭9)"],
])("constants", (func, expectedString) => {
  it(`${func} => ${expectedString}`, () => {
    const actual = stringifyDegreeFunc(func);

    expect(actual).toBe(expectedString);
  } );
} );
