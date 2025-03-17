import { Chord, Chords } from "@datune/core/chords/chromatic";
import { Pitches as P } from "@datune/core/pitches/chromatic";
import { Voicings as V } from "@datune/core/voicings/chromatic";
import { bass } from "@datune/core/chords/octave/chromatic/modifiers";
import { TestLang } from "tests/index";
import { LangId } from "lang";
import { stringifyPitches } from "../../pitches/chromatic/array";
import { stringifyChord } from ".";

TestLang.loadAll();
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Cm, C, C7, CC7, CMaj7, CmMaj7, Csus4, fromRootVoicing, Fsus2, inv } = Chords;

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
  [LangId.EN, bass(C, P.CC), "C/C♯"],
  [LangId.EN, bass(C, P.D), "C/D"],
  [LangId.EN, bass(C, P.DD), "C/D♯"],
  [LangId.EN, bass(C, P.F), "C/F"],
  [LangId.EN, bass(C, P.FF), "C/F♯"],
  [LangId.EN, bass(C, P.GG), "C/G♯"],
  [LangId.EN, bass(Cm, P.CC), "Cm/C♯"],
  [LangId.EN, bass(Cm, P.D), "Cm/D"],
  [LangId.EN, bass(Cm, P.E), "Cm/E"],
  [LangId.EN, bass(Cm, P.F), "Cm/F"],
  [LangId.EN, bass(Cm, P.FF), "Cm/F♯"],
  [LangId.EN, bass(Cm, P.AA), "Cm/A♯"],
  [LangId.EN, fromRootVoicing(P.C, V.THIRTEENTH_b5a9), "C13♭5♯9"],
  [LangId.EN, inv(fromRootVoicing(P.C, V.THIRTEENTH_b5a9), 2), "C13♭5♯9/F♯"],
  [LangId.EN, Chords.fromPitches(P.C, P.E, P.G, P.C), "C"],
  [LangId.EN, Chords.fromPitches(P.G, P.C, P.E, P.G), "C/G"],
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
