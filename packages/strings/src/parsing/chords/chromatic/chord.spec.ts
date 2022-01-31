/* eslint-disable camelcase */
import { A7, AA, B, B7, BMaj7, C, C7, Chord, CMaj7, Dm7, fromPitches } from "chords/chromatic";
import { LangId } from "lang";
import { Ab as P_Ab, Bb as P_Bb, D as P_D, F as P_F } from "pitches/chromatic";
import stringify from "strings/chords/chromatic";
import { TestInit, TestLang } from "tests";
import parseChord from ".";

TestInit.chromaticChord();
TestLang.loadAll();

describe.each([
  [LangId.EN, " c  ", C],
  [LangId.ES, " do  ", C],
  [LangId.EN, "bb", AA],
  [LangId.EN, "b", B],
  [LangId.EN, "c7", C7],
  [LangId.ES, "do7", C7],
  [LangId.EN, "BMaj7", BMaj7],
  [LangId.EN, "bmaj7", BMaj7],
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
  [LangId.EN, "bb7", fromPitches(P_Bb, P_D, P_F, P_Ab)],
  [LangId.EN, "Dm7", Dm7],
])("fromString", (langId: LangId, str: string, expected: Chord | null) => {
  it(`(${langId}, "${str}") => ${expected ? stringify(expected) : "null"}`, () => {
    const chord = parseChord(str, {
      langId,
    } );

    expect(chord).toBe(expected);
  } );
} );
