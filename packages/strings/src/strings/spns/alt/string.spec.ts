import { LangId } from "lang";
import { A4, SPN } from "@datune/core/spns/alt";
import { TestInit, TestLang } from "tests";
import stringify from ".";

TestInit.diatonicAltSPN();
TestInit.diatonicAltInterval();
TestLang.loadAll();
const toStringCases = <[LangId, SPN, string][]>[
  [LangId.EN, A4, "A4"],
  [LangId.ES, A4, "La4"],
];

describe.each(toStringCases)("toString", (langId: LangId, base: SPN, expected: string) => {
  it(`degree=${base.pitch} octave=${base.octave} toString= ${expected} = ${expected}`, () => {
    const actual: string = stringify(base, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
