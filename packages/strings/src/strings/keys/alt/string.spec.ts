/* eslint-disable camelcase */
import { C } from "@datune/core/keys/alt";
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";
import stringify from ".";

TestLang.loadAll();
TestInit.diatonicAltKey();
describe.each([
  [LangId.EN, C, "C Major"],
  [LangId.ES, C, "Do Mayor"],
])("toString", (langId, expectedKey, str) => {
  it(`${langId} - ${expectedKey} => "${str}"`, () => {
    const actual = stringify(expectedKey, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );
