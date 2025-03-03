import { Keys } from "@datune/core/keys/alt";
import { stringifyKey } from ".";
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";

TestLang.loadAll();
TestInit.diatonicAltKey();

describe.each([
  [LangId.EN, Keys.C, "C Major"],
  [LangId.ES, Keys.C, "Do Mayor"],
])("toString", (langId, expectedKey, str) => {
  it(`${langId} - ${expectedKey} => "${str}"`, () => {
    const actual = stringifyKey(expectedKey, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );
