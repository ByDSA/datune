import { LangId } from "lang";
import { A, B, C, D, E, F, G } from "pitches/diatonic";
import { TestLang } from "tests";
import stringify from ".";

TestLang.loadAll();

describe.each([
  [LangId.EN, C, "C"],
  [LangId.EN, D, "D"],
  [LangId.EN, E, "E"],
  [LangId.EN, F, "F"],
  [LangId.EN, G, "G"],
  [LangId.EN, A, "A"],
  [LangId.EN, B, "B"],
  [LangId.ES, C, "Do"],
  [LangId.ES, D, "Re"],
  [LangId.ES, E, "Mi"],
  [LangId.ES, F, "Fa"],
  [LangId.ES, G, "Sol"],
  [LangId.ES, A, "La"],
  [LangId.ES, B, "Si"],
])("stringify", (langId: LangId, chromatic: any, expected: string) => {
  it(`(${langId}, ${chromatic}) => ${expected}`, () => {
    const actual = stringify(chromatic, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
