import { LangId } from "lang";
import { AA, AAA, Ab, B, Bb, Bbb, BBB, C, fromDiatonicAlts, Pitch } from "@datune/core/pitches/alt";
import { C as D_C } from "@datune/core/pitches/diatonic";
import stringify from "strings/pitches/alt";
import { TestInit, TestLang } from "tests";
import parse from ".";

TestInit.diatonicAlt();
TestLang.loadAll();

describe.each([
  [LangId.ES, "do", C],
  [LangId.ES, "Do", C],
  [LangId.EN, "C", C],
  [LangId.EN, "c", C],
  [LangId.ES, "   La#    ", AA],
  [LangId.ES, "   l A #    ", AA],
  [LangId.EN, "   A#  #  ", AAA],
  [LangId.EN, "   a #    ", AA],
  [LangId.ES, "lab", Ab],
  [LangId.EN, "ab", Ab],
  [LangId.EN, "bb", Bb],
  [LangId.EN, "bbb", Bbb],
  [LangId.EN, "b##", BBB],
  [LangId.EN, "Cbbb", fromDiatonicAlts(D_C, -3)],
  [LangId.EN, "C###", fromDiatonicAlts(D_C, 3)],
  [LangId.ES, "C", null],
  [LangId.EN, "Do", null],
  [LangId.EN, "C####", null],
  [LangId.EN, "Cbbbb", null],
])("from string", (langId: LangId, str: string, pitch: Pitch | null) => {
  const pitchName = pitch ? stringify(pitch) : "null";

  it(`(${langId}, "${str}") => ${pitchName}`, () => {
    const actual = parse(str, {
      langId,
    } );

    expect(actual).toBe(pitch);
  } );
} );

describe.each([
  [LangId.ES, "La♯", AA],
  [LangId.EN, "B", B],
  [LangId.ES, "Si", B],
  [LangId.EN, "A♯", AA],
])("reversibles", (langId: LangId, str: string, pitch: Pitch) => {
  const pitchName = pitch ? stringify(pitch) : "null";

  it(`(${langId}, "${str}") => ${pitchName}`, () => {
    const actual = parse(str, {
      langId,
    } );

    expect(actual).toBe(pitch);
  } );

  it(`(${langId}, ${pitchName}) => "${str}"`, () => {
    const actual = stringify(pitch, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );
