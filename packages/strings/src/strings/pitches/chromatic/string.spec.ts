import { LangId } from "lang";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "@datune/core/pitches/chromatic";
import { TestLang } from "tests";
import stringify from ".";

TestLang.loadAll();

describe.each([
  [LangId.EN, C, "C"],
  [LangId.EN, CC, "C♯"],
  [LangId.EN, D, "D"],
  [LangId.EN, DD, "D♯"],
  [LangId.EN, E, "E"],
  [LangId.EN, F, "F"],
  [LangId.EN, FF, "F♯"],
  [LangId.EN, G, "G"],
  [LangId.EN, GG, "G♯"],
  [LangId.EN, A, "A"],
  [LangId.EN, AA, "A♯"],
  [LangId.EN, B, "B"],
  [LangId.ES, C, "Do"],
  [LangId.ES, CC, "Do♯"],
  [LangId.ES, D, "Re"],
  [LangId.ES, DD, "Re♯"],
  [LangId.ES, E, "Mi"],
  [LangId.ES, F, "Fa"],
  [LangId.ES, FF, "Fa♯"],
  [LangId.ES, G, "Sol"],
  [LangId.ES, GG, "Sol♯"],
  [LangId.ES, A, "La"],
  [LangId.ES, AA, "La♯"],
  [LangId.ES, B, "Si"],
])("stringify", (langId: LangId, chromatic: any, expected: string) => {
  it(`(${langId}, ${chromatic}) => ${expected}`, () => {
    const actual = stringify(chromatic, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
