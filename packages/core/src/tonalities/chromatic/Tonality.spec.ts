import { Chord } from 'chords';
import { Language, Settings } from 'config';
import { Chromatic } from 'pitches';
import { Scale } from 'scales';
import { Tonality } from './Tonality';

describe.each([
    [Tonality.C, Chromatic.C, Scale.MAJOR],
    [Tonality.from(Chromatic.C, Scale.ORIENTAL), Chromatic.C, Scale.ORIENTAL],
])("scales & root", (tonality, root, scale) => {
    test(`${tonality} => root=${root}, scale=${scale}`, () => {
        expect(tonality.scale).toBe(scale);
        expect(tonality.root).toBe(root);
    });
})


test('notes: C', () => {
    let notes = Tonality.C.notes;
    expect(notes.length).toBe(7);
    const expected = [
        Chromatic.C,
        Chromatic.D,
        Chromatic.E,
        Chromatic.F,
        Chromatic.G,
        Chromatic.A,
        Chromatic.B
    ];
    
    notes.forEach((n, i) => {
        expect(notes[i]).toBe(expected[i]);
    })
});

test('rootChord3: C -> C', () => {
    let rootChord3: Chord = <Chord>Tonality.C.rootChord3;
    expect(rootChord3?.length).toBe(3);
    expect(rootChord3).toBe(Chord.C);
});

test('rootChord3: C Oriental -> F/C', () => {
    let tonality = Tonality.from(Chromatic.C, Scale.ORIENTAL);
    let rootChord3: Chord = <Chord>tonality.rootChord3;
    expect(rootChord3?.length).toBe(3);
    expect(rootChord3).toBe(Chord.F.withBass(Chromatic.C));
});

test('rootChord4: C -> CMaj7', () => {
    let rootChord4 = Tonality.C.rootChord4;
    expect(rootChord4?.length).toBe(4);
    expect(rootChord4).toBe(Chord.CMaj7);
});

test('notes: C BLUES MINOR', () => {
    let tonality = Tonality.from(Chromatic.C, Scale.BLUES_MINOR);
    let notes = tonality.notes;
    expect(notes.length).toBe(5);
    expect(notes).toStrictEqual(
        [
            Chromatic.C,
            Chromatic.DD,
            Chromatic.F,
            Chromatic.GG,
            Chromatic.AA
        ]
    );
});

describe.each([
    [Language.ENG, Tonality.C, "C MAJOR"],
    [Language.ESP, Tonality.C, "Do MAYOR"],
])("toString", (lang, tonality, str) => {
    test(`${lang.id} - ${tonality} => "${str}"`, async () => {
        Settings.lang = lang;
        const actual = tonality.toString();
        expect(actual).toMatch(str);
    });

    test(`${lang.id} - "${str}" => ${tonality}`, async () => {
        const tonality = Tonality.fromString(str);
        expect(tonality).toBe(tonality);
    });
});

describe.each([
    [Language.ESP, "Do ", Tonality.C],
    [Language.ESP, "Do", Tonality.C],
    [Language.ESP, "Do m", Tonality.Cm],
    [Language.ENG, "C ", Tonality.C],
    [Language.ENG, "C", Tonality.C],
    [Language.ENG, "Cm", Tonality.Cm],
    [Language.ENG, "abLuEsB5", Tonality.from(Chromatic.A, Scale.BLUES_b5)],
])("fromString", (lang, str, expectedTonality) => {
    test(`${lang.id} - "${str}" => ${expectedTonality}`, async () => {
        Settings.lang = lang;
        const tonality = Tonality.fromString(str);
        expect(tonality).toBe(expectedTonality);
    });
});