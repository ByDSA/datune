/* eslint-disable camelcase */
import { C, C7, CC7, Chord, CMaj7, CmMaj7, Csus4, fromRootVoicing, Fsus2, inv } from "@datune/core/chords/chromatic";
import { LangId } from "lang";
import { C as P_C } from "@datune/core/pitches/chromatic";
import { TestInit, TestLang } from "tests/index";
import { THIRTEENTH_b5a9, TRIAD_AUGMENTED } from "@datune/core/voicings/chromatic";
import stringify from ".";
import pitchesStringify from "../../pitches/chromatic/array";

TestLang.loadAll();
TestInit.diatonicAltChord();
TestInit.chromaticChord();

describe.each([
  [LangId.EN, C, "C"],
  [LangId.EN, inv(C), "C/E"],
  [LangId.EN, C7, "C7"],
  [LangId.EN, fromRootVoicing(P_C, TRIAD_AUGMENTED), "C+"],
  [LangId.EN, inv(fromRootVoicing(P_C, TRIAD_AUGMENTED)), "E+"],
  [LangId.EN, CC7, "C♯7"],
  [LangId.EN, CMaj7, "CMaj7"],
  [LangId.EN, CmMaj7, "CmMaj7"],
  [LangId.EN, inv(C, 2), "C/G"],
  [LangId.EN, inv(C, 3), "C"],
  [LangId.EN, inv(C7), "C7/E"],
  [LangId.EN, Fsus2, "Fsus2"],
  [LangId.EN, inv(Csus4), "Fsus2"],
  [LangId.EN, fromRootVoicing(P_C, THIRTEENTH_b5a9), "C13♭5♯9"],
  [LangId.EN, inv(fromRootVoicing(P_C, THIRTEENTH_b5a9), 2), "C13♭5♯9/F♯"],
])("toString", (langId, chord: Chord, str) => {
  const pitchesName = pitchesStringify(chord.pitches, {
    langId,
  } );
  const chordName = `chord(pitches=${pitchesName})`;

  it(`(${langId}, ${chordName}) => "${str}"`, () => {
    const actual = stringify(chord);

    expect(actual).toMatch(str);
  } );
} );
