import { SPNs, SPN } from "@datune/core/spns/chromatic";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifySpn } from ".";

TestLang.loadAll();

describe.each([
  [LangId.EN, SPNs.A4, "A4"],
  [LangId.ES, SPNs.A4, "La4"],
])("strings", (langId, spn: SPN, expected: string) => {
  it(`${langId} -`, () => {
    const actual = stringifySpn(spn, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
