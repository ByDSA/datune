import { LangId } from "lang";
import { Ab, BB, Bb, BBB, C, Eb, Pitch } from "@datune/core/pitches/alt";
import { TestInit, TestLang } from "tests";
import stringify from ".";

TestInit.diatonicAlt();
TestLang.loadAll();

describe.each([
  [LangId.EN, C, "C"],
  [LangId.EN, BB, "B♯"],
  [LangId.EN, BBB, "B♯♯"],
  [LangId.EN, Bb, "B♭"],
  [LangId.EN, Eb, "E♭"],
  [LangId.EN, Ab, "A♭"],
  [LangId.ES, C, "Do"],
  [LangId.ES, BB, "Si♯"],
  [LangId.ES, BBB, "Si♯♯"],
  [LangId.ES, Bb, "Si♭"],
  [LangId.ES, Eb, "Mi♭"],
  [LangId.ES, Ab, "La♭"],
])("tests", (langId: LangId, pitch: Pitch, expected: string) => {
  it(`should return ${expected}`, () => {
    const actual = stringify(pitch, {
      langId,
    } );

    expect(actual).toBe(expected);
  } );
} );
