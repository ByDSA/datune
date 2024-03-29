import { LangId } from "lang";
import { A, C } from "pitches/diatonic";
import { TestLang } from "tests";
import parse from ".";

TestLang.loadAll();

describe.each([
  [LangId.ES, "Do", C],
  [LangId.ES, "   La    ", A],
  [LangId.ES, "   L a     ", A],
  [LangId.ES, "La#", null],
  [LangId.ES, "Lab", null],
  [LangId.ES, "C", null],
  [LangId.EN, "C", C],
  [LangId.EN, "   A    ", A],
  [LangId.EN, "A#", null],
  [LangId.EN, "Ab", null],
  [LangId.EN, "Do", null],
])("tests", (langId, str, expected) => {
  it(`(${langId}, "${str}") => ${expected}`, () => {
    const actual = parse(str, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
