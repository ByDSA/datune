/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Chords } from "@datune/core/chords/alt";
import { Pitches as P } from "@datune/core/pitches/alt";
import { Voicings } from "@datune/core/voicings/alt";
import { stringifyChord } from ".";
import { LangId } from "lang";
import { stringifyPitches } from "strings/pitches/alt/array";
import { TestInit, TestLang } from "tests";

TestInit.diatonicAltChord();
TestLang.loadAll();

const { SEVENTH, THIRTEENTH_b5a9, TRIAD_AUGMENTED } = Voicings;
const { C, C7, CMaj7, CmMaj7, Csus4, Dm7, fromRootVoicing, Fsus2, inv } = Chords;

describe.each([
  [LangId.EN, C, "C"],
  [LangId.EN, inv(C), "C/E"],
  [LangId.EN, C7, "C7"],
  [LangId.EN, fromRootVoicing(P.C, TRIAD_AUGMENTED), "C+"],
  [LangId.EN, inv(fromRootVoicing(P.C, TRIAD_AUGMENTED)), "C+/E"],
  [LangId.EN, fromRootVoicing(P.BBB, SEVENTH), "B♯♯7"],
  [LangId.EN, CMaj7, "CMaj7"],
  [LangId.EN, CmMaj7, "CmMaj7"],
  [LangId.EN, inv(C, 2), "C/G"],
  [LangId.EN, inv(C, 3), "C"],
  [LangId.EN, inv(C7), "C7/E"],
  [LangId.EN, Fsus2, "Fsus2"],
  [LangId.EN, inv(Csus4), "Fsus2"],
  [LangId.EN, Dm7, "Dm7"],
  [LangId.EN, inv(fromRootVoicing(P.C, THIRTEENTH_b5a9), 2), "C13♭5♯9/G♭"],
])("toString", (langId, chord, str) => {
  const pitchesName = stringifyPitches(chord.pitches, {
    langId,
  } );
  const chordName = `chord(pitches=${pitchesName})`;

  it(`(${langId}, ${chordName}) => "${str}"`, () => {
    const actual = stringifyChord(chord, {
      langId,
    } );

    expect(actual).toMatch(str);
  } );
} );
