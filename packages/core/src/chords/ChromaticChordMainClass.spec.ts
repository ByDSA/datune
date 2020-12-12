import { Chromatic } from "../degrees/Chromatic";
import * as init from "../initializer";
import { Language } from "../lang/Language";
import { ChromaticPattern } from "../patterns/ChromaticPattern";
import { Settings } from "../settings/Settings";
import { RootPatternBuilder } from "./builders/RootPatternBuilder";
import { ChromaticChord, ChromaticChordString } from "./ChromaticChord";
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
    [Language.ENG, ChromaticChord.CC7, Chromatic.CC.toString() + "7"],
    [Language.ENG, ChromaticChord.CMaj7, "CMaj7"],
    [Language.ENG, ChromaticChord.CmMaj7, "CmMaj7"],
    [Language.ENG, ChromaticChord.C.withInv(), "C/E"],
    [Language.ENG, ChromaticChord.C.withInv(2), "C/G"],
    [Language.ENG, ChromaticChord.C.withInv(3), "C"],
    [Language.ENG, ChromaticChord.C7.withInv(), "C7/E"],
    [Language.ENG, ChromaticChord.Fsus2, "Fsus2"],
    [Language.ENG, ChromaticChord.Csus4.withInv(), "Fsus2"],
    [Language.ENG, RootPatternBuilder.create().setRoot(Chromatic.C).setPattern(ChromaticPattern.THIRTEENTH_b5a9).build(), "C13♭5♯9"],
    [Language.ENG, RootPatternBuilder.create().setRoot(Chromatic.C).setPattern(ChromaticPattern.THIRTEENTH_b5a9).build().withInv(2), "C13♭5♯9/F♯"],
])("toString", (lang, chord: ChromaticChord, str) => {
    test(`Chord to string: ${lang.id} - ${chord.notes} => "${str}"`, async () => {
        Settings.lang = lang;
        const actual = chord.toString();
        expect(actual).toMatch(str);
    });

    test(`String to Chord: ${lang.id} - "${str}" => ${chord.notes}`, async () => {
        const chordString = ChromaticChordString.from(str);
        let actual = chordString.parse();
        expect(actual).toBe(chord);
    });
});

describe.each([
    [ChromaticChord.C5, ChromaticPattern.POWER_CHORD],
    [ChromaticChord.C, ChromaticPattern.TRIAD_MAJOR],
    [ChromaticChord.C7, ChromaticPattern.SEVENTH],
])("pattern's ChromaticChord", (chord: ChromaticChord, pattern: ChromaticPattern) => {
    test(`Chord ${chord}. Expected pattern ${pattern}. Actual pattern: ${chord.pattern}`, async () => {
        const actual = chord.pattern;
        expect(actual).toBe(pattern);
    });
});

describe.each([
    [[Chromatic.C, Chromatic.G], ChromaticPattern.POWER_CHORD],
    [[Chromatic.C, Chromatic.E, Chromatic.G], ChromaticPattern.TRIAD_MAJOR],
    [[Chromatic.C, Chromatic.E, Chromatic.G, Chromatic.AA], ChromaticPattern.SEVENTH],
    [[Chromatic.C, Chromatic.E, Chromatic.FF, Chromatic.B, Chromatic.DD, Chromatic.F, Chromatic.A], ChromaticPattern.THIRTEENTH_MAJ13_b5a9],
])("pattern's chromatic notes", (notes: Chromatic[], pattern: ChromaticPattern) => {
    test(`Notes ${notes}. Expected pattern ${pattern}. Actual pattern: ${ChromaticChord.from(notes).pattern}`, async () => {
        const actual = ChromaticChord.from(notes).pattern;
        expect(actual).toBe(pattern);
    });
});

describe('withShift', () => {
    it('C7 + 2 = D7', () => {
        let actual = ChromaticChord.C7.withShift(2);
        let expected = ChromaticChord.D7;
        expect(actual).toBe(expected);
    });

    it('C7 - 1 = B7', () => {
        let actual = ChromaticChord.C7.withShift(-1);
        let expected = ChromaticChord.B7;
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