import { DiatonicAlt } from '../degrees/DiatonicAlt';
import * as init from "../initializer";
import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { Language } from '../lang/Language';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';
import { Settings } from '../settings/Settings';
import { DiatonicAltChord, DiatonicAltChordString } from './DiatonicAltChord';
import { RootPatternChord } from './parametric/RootPatternChord';
init.chromatics.default();
init.chromaticPatterns.default();
init.diatonicPatterns.default();
init.diatonicAltPatterns.default();
init.diatonics.default();
init.diatonicAlts.default();
init.intervalDiatonicAlts.default();
init.diatonicAltChords.default();
init.settings.default();

describe("from", () => {
    test('get from ImmutableCache', async () => {
        let diatonicAltChord = DiatonicAltChord.from(
            [
                DiatonicAlt.C,
                DiatonicAlt.E,
                DiatonicAlt.G,
                DiatonicAlt.Bb,
            ]);

        let expected = DiatonicAltChord.C7;
        expect(diatonicAltChord).toBe(expected);
    });

    test('from null', async () => {
        let diatonicAltChord = DiatonicAltChord.from(null);

        let expected = null;
        expect(diatonicAltChord).toBe(expected);
    });

    test('from empty array', async () => {
        let diatonicAltChord = DiatonicAltChord.from([]);

        let expected = null;
        expect(diatonicAltChord).toBe(expected);
    });

    test('from array which contains null element', async () => {
        let diatonicAltChord = DiatonicAltChord.from([null, DiatonicAlt.C, DiatonicAlt.E, DiatonicAlt.G]);

        let expected = DiatonicAltChord.C;
        expect(diatonicAltChord).toBe(expected);
    });
})

describe.each([
    [Language.ENG, DiatonicAltChord.C, "C"],
    [Language.ENG, DiatonicAltChord.C7, "C7"],
    [Language.ENG, RootPatternChord.from(
        DiatonicAlt.BBB,
        DiatonicAltPattern.SEVENTH).chord, DiatonicAlt.BBB.toString() + "7"],
    [Language.ENG, DiatonicAltChord.CMaj7, "CMaj7"],
    [Language.ENG, DiatonicAltChord.CmMaj7, "CmMaj7"],
    [Language.ENG, DiatonicAltChord.C.withInv(), "C/E"],
    [Language.ENG, DiatonicAltChord.C.withInv(2), "C/G"],
    [Language.ENG, DiatonicAltChord.C.withInv(3), "C"],
    [Language.ENG, DiatonicAltChord.C7.withInv(), "C7/E"],
    [Language.ENG, DiatonicAltChord.Fsus2, "Fsus2"],
    [Language.ENG, DiatonicAltChord.Csus4.withInv(), "Fsus2"],
    [Language.ENG, RootPatternChord.from(DiatonicAlt.C, DiatonicAltPattern.THIRTEENTH_b5a9).chord.withInv(2), "C13♭5♯9/G♭"],
])("toString", (lang, chord, str) => {
    test(`${lang.id} - ${chord} => "${str}"`, async () => {
        Settings.lang = lang;
        const actual = chord.toString();
        expect(actual).toMatch(str);
    });

    test(`${lang.id} - "${str}" => ${chord}`, async () => {
        const chordString = DiatonicAltChordString.from(str);
        let actual = chordString.chord;
        expect(actual).toBe(chord);
    });
});

describe("precalc", () => {
    test('CMaj7', async () => {
        let chord = DiatonicAltChord.CMaj7;
        expect(chord.length).toBe(4);
        expect(chord.rootIndex).toBe(0);
        expect(chord.notes).toStrictEqual([
            DiatonicAlt.C,
            DiatonicAlt.E,
            DiatonicAlt.G,
            DiatonicAlt.B,
        ]);
    });

    test('CmMaj7', async () => {
        let chord = DiatonicAltChord.CmMaj7;
        expect(chord.length).toBe(4);
        expect(chord.rootIndex).toBe(0);
        expect(chord.notes).toStrictEqual([
            DiatonicAlt.C,
            DiatonicAlt.Eb,
            DiatonicAlt.G,
            DiatonicAlt.B,
        ]);
    });
})

describe.each([
    [DiatonicAltChord.C, [DiatonicAlt.C, DiatonicAlt.E, DiatonicAlt.G]],
    [DiatonicAltChord.C7, [DiatonicAlt.C, DiatonicAlt.E, DiatonicAlt.G, DiatonicAlt.Bb]],
    [DiatonicAltChord.C7.withInv(), [DiatonicAlt.E, DiatonicAlt.G, DiatonicAlt.Bb, DiatonicAlt.C]],
    [DiatonicAltChord.C7.withInv(2), [DiatonicAlt.G, DiatonicAlt.Bb, DiatonicAlt.C, DiatonicAlt.E]],
    [DiatonicAltChord.C7.withInv().withInv(), [DiatonicAlt.G, DiatonicAlt.Bb, DiatonicAlt.C, DiatonicAlt.E]],
])("notes", (chord, notes) => {
    test(`${chord}.notes = ${notes}`, async () => {
        const actual = chord.notes;
        expect(actual).toStrictEqual(notes);
    });

    test(`${notes} => ${chord}`, async () => {
        const actual = DiatonicAltChord.from(notes);
        expect(actual).toStrictEqual(chord);
    });
});

describe.each([
    [DiatonicAltChord.C, DiatonicAlt.C],
    [DiatonicAltChord.C7.withInv(), DiatonicAlt.C],
    [DiatonicAltChord.C7.withInv(2), DiatonicAlt.C],
    [DiatonicAltChord.C7.withInv().withInv(), DiatonicAlt.C],
])("root", (chord, root) => {
    test(`${chord}.root = ${root}`, async () => {
        const actual = chord.root;
        expect(actual).toBe(root);
    });
});

describe.each([
    [DiatonicAltChord.C, 0],
    [DiatonicAltChord.C.withInv(), 2],
    [DiatonicAltChord.C.withInv(2), 1],
])("rootIndex", (chord, root) => {
    test(`${chord}.root = ${root}`, async () => {
        const actual = chord.rootIndex;
        expect(actual).toBe(root);
    });
});

describe.each([
    [DiatonicAltChord.C, DiatonicAlt.C, DiatonicAltChord.C],
    [DiatonicAltChord.C, DiatonicAlt.E, DiatonicAltChord.C.withInv()],
    [DiatonicAltChord.C, DiatonicAlt.D, null],
])("withBass", (chord, bass, expectedChord) => {
    test(`${chord}.withBass(${bass}) = ${expectedChord}`, async () => {
        const actual = chord.withBass(bass);
        expect(actual).toBe(expectedChord);
    });
});

describe.each([
    [DiatonicAltChord.C7, 4, DiatonicAltChord.C7],
])("withInv", (chord, invs, expectedChord) => {
    test(`${chord}.withInv(${invs}) = ${expectedChord}`, async () => {
        const actual = chord.withInv(invs);
        expect(actual).toBe(expectedChord);
    });
});

test('withAdd - C7 + MAJOR_SECOND = D7', async () => {
    let actual = DiatonicAltChord.C7.withAdd(IntervalDiatonicAlt.MAJOR_SECOND);
    let expected = RootPatternChord.from(DiatonicAlt.D, DiatonicAltPattern.SEVENTH).chord;
    expect(actual).toBe(expected);
});

test('withSub - C7 - MAJOR_SECOND = Bb7', async () => {
    let actual = DiatonicAltChord.C7.withSub(IntervalDiatonicAlt.MAJOR_SECOND);
    let expected = RootPatternChord.from(DiatonicAlt.Bb, DiatonicAltPattern.SEVENTH).chord;
    expect(actual).toBe(expected);
});