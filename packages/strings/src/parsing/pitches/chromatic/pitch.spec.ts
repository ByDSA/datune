import { LangId } from "lang";
import { A, AA, Ab, add, B, Bb, C, CC, Pitch } from "@datune/core/pitches/chromatic";
import stringify from "strings/pitches/chromatic";
import { TestLang } from "tests";
import parse from ".";

TestLang.loadAll();

describe.each([
  [LangId.EN, "C", C],
  [LangId.EN, "c", C],
  [LangId.ES, "do", C],
  [LangId.ES, "Do", C],
  [LangId.ES, "   La#    ", AA],
  [LangId.ES, "   l A #    ", AA],
  [LangId.EN, "   A#  #  ", B],
  [LangId.EN, "   a #    ", AA],
  [LangId.ES, "lab", Ab],
  [LangId.EN, "ab", Ab],
  [LangId.EN, "bb", Bb],
  [LangId.EN, "bbb", A],
  [LangId.EN, "b##", CC],
  [LangId.EN, "Cbbb", add(C, -3)],
  [LangId.EN, "C###", add(C, 3)],
  [LangId.ES, "C", null],
  [LangId.EN, "Do", null],
  [LangId.EN, "C####", null],
  [LangId.EN, "Cbbbb", null],
])("from string", (langId: LangId, str: string, pitch: Pitch | null) => {
  const pitchName = pitch
    ? stringify(pitch, {
      langId,
    } )
    : "null";

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
  const pitchName = pitch
    ? stringify(pitch, {
      langId,
    } )
    : "null";

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
