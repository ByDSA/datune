import { Chromatic } from "../degrees/Chromatic";
import * as init from "../initializer";
import { Language } from "../lang/Language";
import { ChromaticPattern } from "../patterns/ChromaticPattern";
import { Settings } from "../settings/Settings";
import { ChromaticChord, ChromaticChordString } from "./ChromaticChord";
import { RootPatternChord } from "./parametric/RootPatternChord";
init.chromaticPatterns.default();
init.chromaticChords.default();

describe.each([
    [ChromaticChord.C, ChromaticPattern.TRIAD_MAJOR],
    [ChromaticChord.C.withInv(2), ChromaticPattern.TRIAD_MAJOR.withInv(2)],
    [ChromaticChord.C.withInv(), ChromaticPattern.TRIAD_MAJOR.withInv()],
])("pattern", (chord: ChromaticChord, pattern: ChromaticPattern) => {
    test(`${chord} => ${pattern}`, async () => {
        expect(pattern).toBe(chord.pattern);
    });
})

describe.each([
    [Language.ENG, ChromaticChord.C, "C"],
    [Language.ENG, ChromaticChord.C7, "C7"],
    [Language.ENG, RootPatternChord.from(
        Chromatic.CC,
        ChromaticPattern.SEVENTH).chord, Chromatic.CC.toString() + "7"],
    [Language.ENG, ChromaticChord.CMaj7, "CMaj7"],
    [Language.ENG, ChromaticChord.CmMaj7, "CmMaj7"],
    [Language.ENG, ChromaticChord.C.withInv(), "C/E"],
    [Language.ENG, ChromaticChord.C.withInv(2), "C/G"],
    [Language.ENG, ChromaticChord.C.withInv(3), "C"],
    [Language.ENG, ChromaticChord.C7.withInv(), "C7/E"],
    [Language.ENG, ChromaticChord.Fsus2, "Fsus2"],
    [Language.ENG, ChromaticChord.Csus4.withInv(), "Fsus2"],
    [Language.ENG, RootPatternChord.from(Chromatic.C, ChromaticPattern.THIRTEENTH_b5a9).chord.withInv(2), "C13♭5♯9/G♭"],
])("toString", (lang, chord: ChromaticChord, str) => {
    test(`${lang.id} - chord=${chord} => str="${str}"`, async () => {
        Settings.lang = lang;
        const actual = chord.toString();
        expect(actual).toMatch(str);
    });

    test(`${lang.id} - str="${str}" => chord=${chord.notes}`, async () => {
        const chordString = ChromaticChordString.from(str);
        let actual = chordString.chord;
        expect(actual).toBe(chord);
    });
});

describe('withShift', () => {
    it('C7 + 2 = D7', () => {
        let actual = ChromaticChord.C7.withShift(2);
        let expected = RootPatternChord.from(Chromatic.D, ChromaticPattern.SEVENTH).chord;
        expect(actual).toBe(expected);
    });

    it('C7 - 1 = B7', () => {
        let actual = ChromaticChord.C7.withShift(-1);
        let expected = RootPatternChord.from(Chromatic.B, ChromaticPattern.SEVENTH).chord;
        expect(actual).toBe(expected);
    });
})

test("Trying edit property notes", () => {
    let notes = ChromaticChord.C.notes;
    const t = () => {
        notes[0] = Chromatic.D;
    };
    expect(t).toThrow(TypeError);

})