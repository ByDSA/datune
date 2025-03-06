import { SPNs, SPN } from "@datune/core/spns/alt";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifySpn } from ".";

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
