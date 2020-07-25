import { DiatonicAltChord } from '../chords/diatonicalt/DiatonicAltChord';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { Language } from '../lang/Language';
import * as precalc from "../precalc";
import { Settings } from '../settings/Settings';
import { Scale } from './Scale';
import { Tonality } from './Tonality';
precalc.diatonics();
precalc.chromatics();
precalc.diatonicAlts();
precalc.intervalDiatonicAlts();
precalc.diatonicAltPatterns();
precalc.diatonicAltChords();
precalc.scales();
precalc.tonalities();
precalc.settings();

describe.each([
    [Tonality.C, DiatonicAlt.C, Scale.MAJOR],
    [Tonality.from(DiatonicAlt.C, Scale.ORIENTAL), DiatonicAlt.C, Scale.ORIENTAL],
])("scales & root", (tonality, root, scale) => {
    test(`${tonality} => root=${root}, scale=${scale}`, () => {
        expect(tonality.scale).toBe(scale);
        expect(tonality.root).toBe(root);
    });
})

test('notes: C', () => {
    let notes = Tonality.C.notes;
    expect(notes.length).toBe(7);
    expect(notes).toStrictEqual(
        [
            DiatonicAlt.C,
            DiatonicAlt.D,
            DiatonicAlt.E,
            DiatonicAlt.F,
            DiatonicAlt.G,
            DiatonicAlt.A,
            DiatonicAlt.B
        ]
    );
});

test('rootChord3: C -> C', () => {
    let rootChord3: DiatonicAltChord = Tonality.C.rootChord3;
    expect(rootChord3.length).toBe(3);
    expect(rootChord3).toBe(DiatonicAltChord.C);
});

test('rootChord3: C Oriental -> Am', () => {
    let tonality = Tonality.from(DiatonicAlt.C, Scale.ORIENTAL);
    let rootChord3: DiatonicAltChord = tonality.rootChord3;
    expect(rootChord3.length).toBe(3);
    expect(rootChord3).toBe(DiatonicAltChord.Am);
});

test('rootChord4: C -> CMaj7', () => {
    let rootChord4 = Tonality.C.rootChord4;
    expect(rootChord4.length).toBe(4);
    expect(rootChord4).toBe(DiatonicAltChord.CMaj7);
});

test('notes: C BLUES MINOR', () => {
    let tonality = Tonality.from(DiatonicAlt.C, Scale.BLUES_MINOR);
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
    [Language.ENG, "bBBbLuEsB5", Tonality.from(DiatonicAlt.Bbb, Scale.BLUES_b5)],
])("fromString", (lang, str, expectedTonality) => {
    test(`${lang.id} - "${str}" => ${expectedTonality}`, async () => {
        Settings.lang = lang;
        const tonality = Tonality.fromString(str);
        expect(tonality).toBe(expectedTonality);
    });
});