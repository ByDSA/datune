import { Chord, Chords } from "@datune/core/chords/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { Voicings as V } from "@datune/core/voicings/chromatic";
import { stringifyPitches } from "../../pitches/chromatic/array";
import { stringifyChord } from ".";
import { TestInit, TestLang } from "tests/index";
import { LangId } from "lang";

TestLang.loadAll();
TestInit.diatonicAltChord();
TestInit.chromaticChord();

// eslint-disable-next-line @typescript-eslint/naming-convention
const { C, C7, CC7, CMaj7, CmMaj7, Csus4, fromRootVoicing, Fsus2, inv } = Chords;

describe.each([
  [LangId.EN, C, "C"],
  [LangId.EN, inv(C), "C/E"],
  [LangId.EN, C7, "C7"],
  [LangId.EN, fromRootVoicing(P.C, V.TRIAD_AUGMENTED), "C+"],
  [LangId.EN, inv(fromRootVoicing(P.C, V.TRIAD_AUGMENTED)), "E+"],
  [LangId.EN, CC7, "C♯7"],
  [LangId.EN, CMaj7, "CMaj7"],
  [LangId.EN, CmMaj7, "CmMaj7"],
  [LangId.EN, inv(C, 2), "C/G"],
  [LangId.EN, inv(C, 3), "C"],
  [LangId.EN, inv(C7), "C7/E"],
  [LangId.EN, Fsus2, "Fsus2"],
  [LangId.EN, inv(Csus4), "Fsus2"],
  [LangId.EN, fromRootVoicing(P.C, V.THIRTEENTH_b5a9), "C13♭5♯9"],
  [LangId.EN, inv(fromRootVoicing(P.C, V.THIRTEENTH_b5a9), 2), "C13♭5♯9/F♯"],
])("toString", (langId, chord: Chord, str) => {
  const pitchesName = stringifyPitches(chord.pitches, {
    langId,
  } );
  const chordName = `chord(pitches=${pitchesName})`;

  it(`(${langId}, ${chordName}) => "${str}"`, () => {
    const actual = stringifyChord(chord);

    expect(actual).toMatch(str);
  } );
} );
