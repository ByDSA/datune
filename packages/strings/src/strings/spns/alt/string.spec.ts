import { Spns as N, Spn } from "@datune/core/spns/alt";
import { LangId } from "lang";
import { TestLang } from "tests";
import { stringifySpn } from ".";

TestLang.loadAll();
const toStringCases = <[LangId, Spn, string][]>[
  [LangId.EN, N.A4, "A4"],
  [LangId.ES, N.A4, "La4"],
];

describe.each(toStringCases)("toString", (langId: LangId, base: Spn, expected: string) => {
  it(`degree=${base.pitch} octave=${base.octave} toString= ${expected} = ${expected}`, () => {
    const actual: string = stringifySpn(base, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
