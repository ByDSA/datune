import { Keys } from "@datune/core/keys/alt";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifyKey } from ".";

TestLang.loadAll();

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
