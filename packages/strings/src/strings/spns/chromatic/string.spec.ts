import { Spns as N, Spn } from "@datune/core/spns/chromatic";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifySpn } from ".";

TestLang.loadAll();

describe.each([
  [LangId.EN, N.A4, "A4"],
  [LangId.ES, N.A4, "La4"],
])("strings", (langId, spn: Spn, expected: string) => {
  it(`${langId} -`, () => {
    const actual = stringifySpn(spn, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
