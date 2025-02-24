import { LangId } from "lang";
import { A4, SPN } from "@datune/core/spns/chromatic";
import { TestInit, TestLang } from "tests";
import stringify from ".";

TestInit.chromaticSPN();
TestLang.loadAll();
describe.each([
  [LangId.EN, A4, "A4"],
  [LangId.ES, A4, "La4"],
])("strings", (langId, spn: SPN, expected: string) => {
  it(`${langId} -`, () => {
    const actual = stringify(spn, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
