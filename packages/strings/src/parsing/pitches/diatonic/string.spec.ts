import { Pitches as P } from "@datune/core/diatonic";
import { LangId } from "lang";
import { TestLang } from "tests";
import { parsePitch } from ".";

TestLang.loadAll();
const { A, C } = P;

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
    const actual = parsePitch(str, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
