import { ChordAlt } from 'chords';
import { Language, Settings } from 'config';
import { DiatonicAlt } from 'pitches';
import { ScaleAlt } from 'scales';
import { Tonality } from '../chromatic/Tonality';
import { TonalityAlt } from './TonalityAlt';

describe.each([
    [TonalityAlt.C, DiatonicAlt.C, ScaleAlt.MAJOR],
    [TonalityAlt.from(DiatonicAlt.C, ScaleAlt.ORIENTAL), DiatonicAlt.C, ScaleAlt.ORIENTAL],
])("scales & root", (tonality, root, scale) => {
    test(`${tonality} => root=${root}, scale=${scale}`, () => {
        expect(tonality.scale).toBe(scale);
        expect(tonality.root).toBe(root);
    });
})

test('notes: C', () => {
    let notes = TonalityAlt.C.notes;
    expect(notes.length).toBe(7);
    const expected = [
        DiatonicAlt.C,
        DiatonicAlt.D,
        DiatonicAlt.E,
        DiatonicAlt.F,
        DiatonicAlt.G,
        DiatonicAlt.A,
        DiatonicAlt.B
    ];

    notes.forEach((n, i) => {
        expect(notes[i]).toBe(expected[i]);
    })
});

test('rootChord3: C -> C', () => {
    let rootChord3: ChordAlt = <ChordAlt>TonalityAlt.C.rootChord3;
    expect(rootChord3.length).toBe(3);
    expect(rootChord3).toBe(ChordAlt.C);
});

test('rootChord3: C Oriental -> Am', () => {
    let tonality = TonalityAlt.from(DiatonicAlt.C, ScaleAlt.ORIENTAL);
    let rootChord3: ChordAlt = <ChordAlt>tonality.rootChord3;
    expect(rootChord3.length).toBe(3);
    expect(rootChord3).toBe(ChordAlt.Am);
});

test('rootChord4: C -> CMaj7', () => {
    let rootChord4 = <ChordAlt>TonalityAlt.C.rootChord4;
    expect(rootChord4.length).toBe(4);
    expect(rootChord4).toBe(ChordAlt.CMaj7);
});

test('notes: C BLUES MINOR', () => {
    let tonality = TonalityAlt.from(DiatonicAlt.C, ScaleAlt.BLUES_MINOR);
    let notes = tonality.notes;
    expect(notes.length).toBe(5);
    expect(notes).toStrictEqual(
        [
            DiatonicAlt.C,
            DiatonicAlt.Eb,
            DiatonicAlt.F,
            DiatonicAlt.Ab,
            DiatonicAlt.Bb
        ]
    );
});

describe.each([
    [Language.ENG, TonalityAlt.C, "C MAJOR"],
    [Language.ESP, TonalityAlt.C, "Do MAYOR"],
])("toString", (lang, tonality, str) => {
    test(`${lang.id} - ${tonality} => "${str}"`, async () => {
        Settings.lang = lang;
        const actual = tonality.toString();
        expect(actual).toMatch(str);
    });

    test(`${lang.id} - "${str}" => ${tonality}`, async () => {
        const tonality = TonalityAlt.fromString(str);
        expect(tonality).toBe(tonality);
    });
});

describe.each([
    [Language.ESP, "Do ", TonalityAlt.C],
    [Language.ESP, "Do", TonalityAlt.C],
    [Language.ESP, "Do m", TonalityAlt.Cm],
    [Language.ENG, "C ", TonalityAlt.C],
    [Language.ENG, "C", TonalityAlt.C],
    [Language.ENG, "Cm", TonalityAlt.Cm],
    [Language.ENG, "bBBbLuEsB5", TonalityAlt.from(DiatonicAlt.Bbb, ScaleAlt.BLUES_b5)],
])("fromString", (lang, str, expectedTonality) => {
    test(`${lang.id} - "${str}" => ${expectedTonality}`, async () => {
        Settings.lang = lang;
        const tonality = TonalityAlt.fromString(str);
        expect(tonality).toBe(expectedTonality);
    });
});

it("tonality", () => {
    let actual = TonalityAlt.C.tonality;
    let expected = Tonality.C;

    expect(actual).toBe(expected);
})