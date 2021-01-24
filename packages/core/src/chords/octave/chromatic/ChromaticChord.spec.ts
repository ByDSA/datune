import { Language, Settings } from "config";
import { Chromatic } from "pitches";
import { ChromaticPattern } from "../../../voicings";
import { ChromaticChordString } from "./building/string/ChromaticChordString";
import { ChromaticArray, ChromaticChord } from "./ChromaticChord";

describe.each([
    [ChromaticChord.C, ChromaticPattern.TRIAD_MAJOR],
    [ChromaticChord.C.withInv(2), ChromaticPattern.TRIAD_MAJOR.withInv(2)],
    [ChromaticChord.C.withInv(), ChromaticPattern.TRIAD_MAJOR.withInv()],
])("pattern", (chord: ChromaticChord, pattern: ChromaticPattern) => {
    it(`${chord} => ${pattern}`, async () => {
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
    [Language.ENG, ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.THIRTEENTH_b5a9), "C13♭5♯9"],
    [Language.ENG, ChromaticChord.fromRootPattern(Chromatic.C, ChromaticPattern.THIRTEENTH_b5a9).withInv(2), "C13♭5♯9/F♯"],
])("toString", (lang, chord: ChromaticChord, str) => {
    it(`ChromaticChord to string: ${lang.id} - ${chord.notes} => "${str}"`, async () => {
        Settings.lang = lang;
        const actual = chord.toString();
        expect(actual).toMatch(str);
    });

    it(`String to ChromaticChord: ${lang.id} - "${str}" => ${chord.notes}`, async () => {
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
    it(`ChromaticChord ${chord}. Expected pattern ${pattern}. Actual pattern: ${chord.pattern}`, async () => {
        const actual = chord.pattern;
        expect(actual).toBe(pattern);
    });
});

describe.each(<[ChromaticArray, ChromaticPattern][]>[
    [[Chromatic.C, Chromatic.G], ChromaticPattern.POWER_CHORD],
    [[Chromatic.C, Chromatic.E, Chromatic.G], ChromaticPattern.TRIAD_MAJOR],
    [[Chromatic.C, Chromatic.E, Chromatic.G, Chromatic.AA], ChromaticPattern.SEVENTH],
    [[Chromatic.C, Chromatic.E, Chromatic.FF, Chromatic.B, Chromatic.DD, Chromatic.F, Chromatic.A], ChromaticPattern.THIRTEENTH_MAJ13_b5a9],
])("pattern's notes", (notes: ChromaticArray, pattern: ChromaticPattern) => {
    it(`Notes ${notes}. Expected pattern ${pattern}. Actual pattern: ${ChromaticChord.fromNotes(...notes).pattern}`, async () => {
        const actual = ChromaticChord.fromNotes(...notes).pattern;
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

it("Trying edit property notes", () => {
    let notes = ChromaticChord.C.notes;
    const t = () => {
        notes[0] = Chromatic.D;
    };
    expect(t).toThrow(TypeError);
})

it("all", () => {
    let all = ChromaticChord.all();
    expect(all.length).toBe(3468);
})

it("all non inversions", () => {
    let all = ChromaticChord.allNonInversions();
    expect(all.length).toBe(660);
})