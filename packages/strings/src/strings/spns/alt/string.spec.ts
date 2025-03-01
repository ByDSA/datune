import { SPNs, SPN } from "@datune/core/spns/alt";
import { stringifySpn } from ".";
import { LangId } from "lang";
import { TestInit, TestLang } from "tests";

TestInit.diatonicAltSPN();
TestInit.diatonicAltInterval();
TestLang.loadAll();
const toStringCases = <[LangId, SPN, string][]>[
  [LangId.EN, SPNs.A4, "A4"],
  [LangId.ES, SPNs.A4, "La4"],
];

describe.each(toStringCases)("toString", (langId: LangId, base: SPN, expected: string) => {
  it(`degree=${base.pitch} octave=${base.octave} toString= ${expected} = ${expected}`, () => {
    const actual: string = stringifySpn(base, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
