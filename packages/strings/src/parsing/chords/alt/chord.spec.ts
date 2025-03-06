import type { Chord } from "@datune/core/chords/alt";
import { Chords as C } from "@datune/core/chords/alt";
import { Pitches as P } from "@datune/core/pitches/alt";
import { LangId } from "lang";
import { stringifyChord } from "strings/chords/alt";
import { TestLang } from "tests";
import { parseChord } from ".";

TestLang.loadAll();

describe.each([
  [LangId.EN, "b", C.B],
  [LangId.EN, " c  ", C.C],
  [LangId.ES, " do  ", C.C],
  [LangId.EN, "c7", C.C7],
  [LangId.ES, "do7", C.C7],
  [LangId.EN, "BMaj7", C.BMaj7],
  [LangId.ES, "siMaj7", C.BMaj7],
  [LangId.EN, "B7", C.B7],
  [LangId.ES, "Si7", C.B7],
  [LangId.EN, "b7", C.B7],
  [LangId.ES, "si7", C.B7],
  [LangId.EN, "a7", C.A7],
  [LangId.ES, "la7", C.A7],
  [LangId.EN, " c  ", C.C],
  [LangId.EN, "C", C.C],
  [LangId.EN, "c", C.C],
  [LangId.EN, "cmaj7", C.CMaj7],
  [LangId.EN, "a7", C.A7],
  [LangId.EN, "b7", C.B7],
  [LangId.EN, " hsfsdfsdc  ", null],
  [LangId.EN, "bb7", C.fromPitches(P.Bb, P.D, P.F, P.Ab)],
  [LangId.EN, "Dm7", C.Dm7],
])("parse", (langId: LangId, str: string, expected: Chord | null) => {
  it(`(${langId}, "${str}") => ${expected ? stringifyChord(expected) : "null"}`, () => {
    const chord = parseChord(str, {
      langId,
    } );

    expect(chord).toBe(expected);
  } );
} );
