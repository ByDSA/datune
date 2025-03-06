/* eslint-disable camelcase */
import { Chord, Chords as C } from "@datune/core/chords/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { LangId } from "lang";
import { stringifyChord } from "strings/chords/chromatic";
import { TestLang } from "tests";
import { parseChord } from ".";

TestLang.loadAll();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Ab: P_Ab, Bb: P_Bb, D: P_D, F: P_F } = P;
// eslint-disable-next-line @typescript-eslint/naming-convention
const { A7, AA, B, B7, BMaj7, C7, CMaj7, Dm7, fromPitches } = C;

describe.each([
  [LangId.EN, " c  ", C.C],
  [LangId.ES, " do  ", C.C],
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
  [LangId.EN, " c  ", C.C],
  [LangId.EN, "C", C.C],
  [LangId.EN, "c", C.C],
  [LangId.EN, "cmaj7", CMaj7],
  [LangId.EN, "a7", A7],
  [LangId.EN, "b7", B7],
  [LangId.EN, " hsfsdfsdc  ", null],
  [LangId.EN, "bb7", fromPitches(P_Bb, P_D, P_F, P_Ab)],
  [LangId.EN, "Dm7", Dm7],
])("parse", (langId: LangId, str: string, expected: Chord | null) => {
  it(`(${langId}, "${str}") => ${expected ? stringifyChord(expected) : "null"}`, () => {
    const chord = parseChord(str, {
      langId,
    } );

    expect(chord).toBe(expected);
  } );
} );
