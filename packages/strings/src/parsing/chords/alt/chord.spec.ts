/* eslint-disable camelcase */
import { Chord, Chords } from "@datune/core/chords/alt";
import { Pitches } from "@datune/core/pitches/alt";
import { parseChord } from ".";
import { LangId } from "lang";
import { stringifyChord } from "strings/chords/alt";
import { TestInit, TestLang } from "tests";

TestInit.diatonicAltChord();
TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { A7, B, B7, BMaj7, C, C7, CMaj7, Dm7, fromPitches } = Chords;
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Ab: DA_Ab, Bb: DA_Bb, D: DA_D, F: DA_F } = Pitches;

describe.each([
  [LangId.EN, "b", B],
  [LangId.EN, " c  ", C],
  [LangId.ES, " do  ", C],
  [LangId.EN, "c7", C7],
  [LangId.ES, "do7", C7],
  [LangId.EN, "BMaj7", BMaj7],
  [LangId.ES, "siMaj7", BMaj7],
  [LangId.EN, "B7", B7],
  [LangId.ES, "Si7", B7],
  [LangId.EN, "b7", B7],
  [LangId.ES, "si7", B7],
  [LangId.EN, "a7", A7],
  [LangId.ES, "la7", A7],
  [LangId.EN, " c  ", C],
  [LangId.EN, "C", C],
  [LangId.EN, "c", C],
  [LangId.EN, "cmaj7", CMaj7],
  [LangId.EN, "a7", A7],
  [LangId.EN, "b7", B7],
  [LangId.EN, " hsfsdfsdc  ", null],
  [LangId.EN, "bb7", fromPitches(DA_Bb, DA_D, DA_F, DA_Ab)],
  [LangId.EN, "Dm7", Dm7],
])("parse", (langId: LangId, str: string, expected: Chord | null) => {
  it(`(${langId}, "${str}") => ${expected ? stringifyChord(expected) : "null"}`, () => {
    const chord = parseChord(str, {
      langId,
    } );

    expect(chord).toBe(expected);
  } );
} );
