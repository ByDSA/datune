import { Language, Settings } from '../../../config';
import { IntervalDiatonicAlt } from '../../../intervals';
import { DiatonicAlt } from "../../../pitches";
import { DiatonicAltPattern } from '../../../voicings';
import { ChromaticChord } from '../chromatic/ChromaticChord';
import { RootPatternAltBuilder } from './building/builders/rootpattern/RootPatternAltBuilder';
import { ChordAlt, DiatonicAltArray } from './ChordAlt';

describe("from", () => {
    test('get from ImmutableCache', async () => {
        let diatonicAltChord = ChordAlt.fromNotes(
            DiatonicAlt.C,
            DiatonicAlt.E,
            DiatonicAlt.G,
            DiatonicAlt.Bb,
        );

        let expected = ChordAlt.C7;
        expect(diatonicAltChord).toBe(expected);
    });

    it(`from array const`, () => {
        const notes: DiatonicAltArray = [DiatonicAlt.C, DiatonicAlt.E, DiatonicAlt.G];
        const expected = ChordAlt.C;
        const actual = ChordAlt.fromNotes(...notes);
        notes[1] = DiatonicAlt.F;

        expect(actual).toBe(expected);
    });
})

describe.each([
    [Language.ENG, ChordAlt.C, "C"],
    [Language.ENG, ChordAlt.C7, "C7"],
    [Language.ENG, ChordAlt.fromRootPattern(DiatonicAlt.BBB, DiatonicAltPattern.SEVENTH), DiatonicAlt.BBB.toString() + "7"],
    [Language.ENG, ChordAlt.CMaj7, "CMaj7"],
    [Language.ENG, ChordAlt.CmMaj7, "CmMaj7"],
    [Language.ENG, ChordAlt.C.withInv(), "C/E"],
    [Language.ENG, ChordAlt.C.withInv(2), "C/G"],
    [Language.ENG, ChordAlt.C.withInv(3), "C"],
    [Language.ENG, ChordAlt.C7.withInv(), "C7/E"],
    [Language.ENG, ChordAlt.Fsus2, "Fsus2"],
    [Language.ENG, ChordAlt.Csus4.withInv(), "Fsus2"],
    [Language.ENG, ChordAlt.Dm7, "Dm7"],
    [Language.ENG, ChordAlt.fromRootPattern(DiatonicAlt.C, DiatonicAltPattern.THIRTEENTH_b5a9).withInv(2), "C13♭5♯9/G♭"],
])("toString", (lang, chord, str) => {
    test(`${lang.id} - ${chord} => "${str}"`, async () => {
        Settings.lang = lang;
        const actual = chord.toString();
        expect(actual).toMatch(str);
    });

    test(`${lang.id} - "${str}" => ${chord}`, async () => {
        let actual = ChordAlt.fromString(str);
        expect(actual).toBe(chord);
    });
});

describe("precalc", () => {
    test('CMaj7', async () => {
        let chord = ChordAlt.CMaj7;
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
        let chord = ChordAlt.CmMaj7;
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

describe.each(<[ChordAlt, DiatonicAltArray][]>[
    [ChordAlt.C, [DiatonicAlt.C, DiatonicAlt.E, DiatonicAlt.G]],
    [ChordAlt.C7, [DiatonicAlt.C, DiatonicAlt.E, DiatonicAlt.G, DiatonicAlt.Bb]],
    [ChordAlt.C7.withInv(), [DiatonicAlt.E, DiatonicAlt.G, DiatonicAlt.Bb, DiatonicAlt.C]],
    [ChordAlt.C7.withInv(2), [DiatonicAlt.G, DiatonicAlt.Bb, DiatonicAlt.C, DiatonicAlt.E]],
    [ChordAlt.C7.withInv().withInv(), [DiatonicAlt.G, DiatonicAlt.Bb, DiatonicAlt.C, DiatonicAlt.E]],
])("notes", (chord, notes: DiatonicAltArray) => {
    test(`${chord}.notes = ${notes}`, async () => {
        const actual = chord.notes;
        expect(actual).toStrictEqual(notes);
    });

    test(`${notes} => ${chord}`, async () => {
        const actual = ChordAlt.fromNotes(...notes);
        expect(actual).toStrictEqual(chord);
    });
})

describe.each([
    [ChordAlt.C, DiatonicAlt.C],
    [ChordAlt.C7.withInv(), DiatonicAlt.C],
    [ChordAlt.C7.withInv(2), DiatonicAlt.C],
    [ChordAlt.C7.withInv().withInv(), DiatonicAlt.C],
])("root", (chord, root) => {
    test(`${chord}.root = ${root}`, async () => {
        const actual = chord.root;
        expect(actual).toBe(root);
    });
})

describe.each([
    [ChordAlt.C, 0],
    [ChordAlt.C.withInv(), 2],
    [ChordAlt.C.withInv(2), 1],
])("rootIndex", (chord, root) => {
    it(`${chord}.root = ${root}`, async () => {
        const actual = chord.rootIndex;
        expect(actual).toBe(root);
    });
})

describe.each([
    [ChordAlt.C, DiatonicAlt.C, ChordAlt.C],
    [ChordAlt.C, DiatonicAlt.E, ChordAlt.C.withInv()],
    [ChordAlt.C, DiatonicAlt.B, ChordAlt.CMaj7.withInv(3)],
])("withBass", (chord, bass, expectedChord) => {
    it(`${chord}.withBass(${bass}) = ${expectedChord}`, async () => {
        const actual = chord.withBass(bass);
        expect(actual).toBe(expectedChord);
    });
});

describe.each([
    [ChordAlt.C7, 4, ChordAlt.C7],
])("withInv", (chord, invs, expectedChord) => {
    it(`${chord}.withInv(${invs}) = ${expectedChord}`, async () => {
        const actual = chord.withInv(invs);
        expect(actual).toBe(expectedChord);
    });
})

it('withAdd - C7 + MAJOR_SECOND = D7', async () => {
    let actual = ChordAlt.C7.withAdd(IntervalDiatonicAlt.MAJOR_SECOND);
    let expected = RootPatternAltBuilder.from(DiatonicAlt.D, DiatonicAltPattern.SEVENTH)
        .build();
    expect(actual).toBe(expected);
})

it('withSub - C7 - MAJOR_SECOND = Bb7', async () => {
    let actual = ChordAlt.C7.withSub(IntervalDiatonicAlt.MAJOR_SECOND);
    let expected = RootPatternAltBuilder.from(DiatonicAlt.Bb, DiatonicAltPattern.SEVENTH)
        .build();
    expect(actual).toBe(expected);
})

it("chord", () => {
    let chordAlt = ChordAlt.fromNotes(DiatonicAlt.C, DiatonicAlt.E, DiatonicAlt.G, DiatonicAlt.AA);
    let actual = chordAlt.chord;
    let expected = ChromaticChord.C7
    expect(actual).toBe(expected);
})