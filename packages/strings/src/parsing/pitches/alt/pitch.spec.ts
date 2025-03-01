import { Pitches, Pitch } from "@datune/core/pitches/alt";
import { C as D_C } from "@datune/core/pitches/diatonic/constants";
import { parsePitch } from ".";
import { LangId } from "lang";
import { stringifyPitch } from "strings/pitches/alt";
import { TestInit, TestLang } from "tests";

TestInit.diatonicAlt();
TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { AA, AAA, Ab, B, Bb, Bbb, BBB, C, fromDiatonicAlts } = Pitches;

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
  const pitchName = pitch ? stringifyPitch(pitch) : "null";

  it(`(${langId}, "${str}") => ${pitchName}`, () => {
    const actual = parsePitch(str, {
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
  const pitchName = pitch ? stringifyPitch(pitch) : "null";

  it(`(${langId}, "${str}") => ${pitchName}`, () => {
    const actual = parsePitch(str, {
      langId,
    } );

    expect(actual).toBe(pitch);
  } );

  it(`(${langId}, ${pitchName}) => "${str}"`, () => {
    const actual = stringifyPitch(pitch, {
      langId,
    } );

    expect(actual).toBe(str);
  } );
} );
