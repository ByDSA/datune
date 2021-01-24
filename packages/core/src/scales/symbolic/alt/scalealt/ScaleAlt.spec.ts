import { Language, Settings } from "../../../../config";
import { IntervalDiatonicAlt } from "../../../../intervals";
import { DegreeFunction, Func } from "../../../../tonalities";
import { Scale } from "../../chromatic/scale/Scale";
import { DiatonicDegree } from "../../degrees/DiatonicDegree";
import { DegreeAlt, DegreeAltArray } from "../degreealt/DegreeAlt";
import { ScaleAlt } from "./ScaleAlt";

test.only('precalc', () => {
    let scale = ScaleAlt.MAJOR;

    expect(scale).not.toBeUndefined();
    expect(scale).toBe(ScaleAlt.MAJOR);
});

test('precalc all', () => {
    expect(ScaleAlt.MAJOR).not.toBeUndefined();
    expect(ScaleAlt.DORIAN).not.toBeUndefined();
    expect(ScaleAlt.PHRYGIAN).not.toBeUndefined();
    expect(ScaleAlt.LYDIAN).not.toBeUndefined();
    expect(ScaleAlt.MIXOLYDIAN).not.toBeUndefined();
    expect(ScaleAlt.MINOR).not.toBeUndefined();
    expect(ScaleAlt.LOCRIAN).not.toBeUndefined();

    expect(ScaleAlt.HARMONIC_MINOR).not.toBeUndefined();
    expect(ScaleAlt.LOCRIAN_a6).not.toBeUndefined();
    expect(ScaleAlt.IONIAN_a5).not.toBeUndefined();
    expect(ScaleAlt.DORIAN_a4).not.toBeUndefined();
    expect(ScaleAlt.MIXOLYDIAN_b9_b13).not.toBeUndefined();
    expect(ScaleAlt.LYDIAN_a2).not.toBeUndefined();
    expect(ScaleAlt.SUPERLOCRIAN_bb7).not.toBeUndefined();

    expect(ScaleAlt.HARMONIC_MAJOR).not.toBeUndefined();
    expect(ScaleAlt.DORIAN_b5).not.toBeUndefined();
    expect(ScaleAlt.PHRYGIAN_b4).not.toBeUndefined();
    expect(ScaleAlt.LYDIAN_b3).not.toBeUndefined();
    expect(ScaleAlt.MIXOLYDIAN_b2).not.toBeUndefined();
    expect(ScaleAlt.AEOLIAN_b1).not.toBeUndefined();
    expect(ScaleAlt.LOCRIAN_bb7).not.toBeUndefined();

    expect(ScaleAlt.MELODIC_MINOR).not.toBeUndefined();
    expect(ScaleAlt.DORIAN_b2).not.toBeUndefined();
    expect(ScaleAlt.LYDIAN_a5).not.toBeUndefined();
    expect(ScaleAlt.LYDIAN_b7).not.toBeUndefined();
    expect(ScaleAlt.MIXOLYDIAN_b13).not.toBeUndefined();
    expect(ScaleAlt.LOCRIAN_a2).not.toBeUndefined();
    expect(ScaleAlt.SUPERLOCRIAN).not.toBeUndefined();

    expect(ScaleAlt.DOUBLE_HARMONIC).not.toBeUndefined();
    expect(ScaleAlt.LYDIAN_a2_a6).not.toBeUndefined();
    expect(ScaleAlt.ULTRAPHRYGIAN).not.toBeUndefined();
    expect(ScaleAlt.HUNGARIAN_MINOR).not.toBeUndefined();
    expect(ScaleAlt.ORIENTAL).not.toBeUndefined();
    expect(ScaleAlt.IONIAN_AUGMENTED_a2).not.toBeUndefined();
    expect(ScaleAlt.LOCRIAN_bb3_bb7).not.toBeUndefined();

    expect(ScaleAlt.NEAPOLITAN_MINOR).not.toBeUndefined();
    expect(ScaleAlt.NEAPOLITAN_MAJOR).not.toBeUndefined();

    // 6
    expect(ScaleAlt.BLUES_b5).not.toBeUndefined();
    expect(ScaleAlt.BLUES_a4).not.toBeUndefined();

    // 5
    expect(ScaleAlt.PENTATONIC_MINOR).not.toBeUndefined();
    expect(ScaleAlt.PENTATONIC).not.toBeUndefined();
    expect(ScaleAlt.EGYPCIAN).not.toBeUndefined();
    expect(ScaleAlt.BLUES_MINOR).not.toBeUndefined();
    expect(ScaleAlt.BLUES_MAJOR).not.toBeUndefined();

    // Symmetric
    expect(ScaleAlt.DOM7b5).not.toBeUndefined();
    expect(ScaleAlt.AUGMENTED_TRIAD).not.toBeUndefined();
    expect(ScaleAlt.DIMINISHED_7th).not.toBeUndefined();
    expect(ScaleAlt.HALF_DIMINISHED).not.toBeUndefined();
    expect(ScaleAlt.CHROMATIC).not.toBeUndefined();
    expect(ScaleAlt.WHOLE_TONE).not.toBeUndefined();
    expect(ScaleAlt.MESSIAEN_V_TRUNCATED).not.toBeUndefined();
    expect(ScaleAlt.MESSIAEN_INV_III_V_TRUNCATED_n2).not.toBeUndefined();
    expect(ScaleAlt.MESSIAEN_V).not.toBeUndefined();
    expect(ScaleAlt.RAGA_INDRUPRIYA_INDIA).not.toBeUndefined();
    expect(ScaleAlt.MESSIAEN_II_TRUNCATED_n3).not.toBeUndefined();
    expect(ScaleAlt.MESSIAEN_III_INV).not.toBeUndefined();
    expect(ScaleAlt.MESSIAEN_IV).not.toBeUndefined();
    expect(ScaleAlt.MESSIAEN_VI).not.toBeUndefined();
    expect(ScaleAlt.MESSIAEN_VII).not.toBeUndefined();

    // Bebop
    expect(ScaleAlt.BEBOP_MAJOR).not.toBeUndefined();
    expect(ScaleAlt.BEBOP_DORIAN).not.toBeUndefined();
    expect(ScaleAlt.BEBOP_DOMINANT).not.toBeUndefined();
    expect(ScaleAlt.BEBOP_MELODIC_MINOR).not.toBeUndefined();
    expect(ScaleAlt.BEBOP_HARMONIC_MINOR).not.toBeUndefined();

    for (let scale of ScaleAlt.sets.common()) {
        expect(scale).not.toBeUndefined();
        expect(scale).not.toBeNull();
    }
});

test('getModeIntervals - -III  = MINOR.intervals', () => {
    let actual: IntervalDiatonicAlt[] = (<any>ScaleAlt.MAJOR).getModeIntervals(-3);
    let expected: IntervalDiatonicAlt[] = [
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MINOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MINOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
    ];

    expect(actual).toStrictEqual(expected);
});

test('getModeIntervals - VI  = MINOR.intervals', () => {
    let actual: IntervalDiatonicAlt[] = (<any>ScaleAlt.MAJOR).getModeIntervals(6);
    let expected: IntervalDiatonicAlt[] = [
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MINOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MINOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
        IntervalDiatonicAlt.MAJOR_SECOND,
    ];

    expect(actual).toStrictEqual(expected);
});

test('getMode - I = MAJOR', () => {
    let mode = ScaleAlt.MAJOR.getMode(1);
    let expected = ScaleAlt.MAJOR;

    expect(mode).toBe(expected);
});

test('getMode - -I = MAJOR', () => {
    let mode = ScaleAlt.MAJOR.getMode(-1);
    let expected = ScaleAlt.MAJOR;

    expect(mode).toBe(expected);
});

test('getMode - II = DORIAN', () => {
    let mode = ScaleAlt.MAJOR.getMode(2);
    let expected = ScaleAlt.DORIAN;

    expect(mode).toBe(expected);
});

test('getMode - -II = LOCRIAN', () => {
    let mode = ScaleAlt.MAJOR.getMode(-2);
    let expected = ScaleAlt.LOCRIAN;

    expect(mode).toBe(expected);
});

test('degrees not null or undefined', () => {
    for (let scale of ScaleAlt.sets.common()) {
        expect(scale.degrees).not.toBeNull();
        expect(scale.degrees).toBeDefined();
    }
});

test('Scale - degrees: MAJOR', () => {
    let scale = ScaleAlt.MAJOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.II,
        DegreeAlt.III,
        DegreeAlt.IV,
        DegreeAlt.V,
        DegreeAlt.VI,
        DegreeAlt.VII
    ]);
});

test('Scale - degrees: MINOR', () => {
    let scale = ScaleAlt.MINOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.II,
        DegreeAlt.bIII,
        DegreeAlt.IV,
        DegreeAlt.V,
        DegreeAlt.bVI,
        DegreeAlt.bVII
    ]);
});

test('Scale - degrees: BLUES_b5', () => {
    let scale = ScaleAlt.BLUES_b5;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.bIII,
        DegreeAlt.IV,
        DegreeAlt.bV,
        DegreeAlt.V,
        DegreeAlt.bVII
    ]);
});

test('Scale - degrees: BLUES_a4', () => {
    let scale = ScaleAlt.BLUES_a4;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.bIII,
        DegreeAlt.IV,
        DegreeAlt.from(DiatonicDegree.IV, 1),
        DegreeAlt.V,
        DegreeAlt.bVII
    ]);
});


test('Scale - degrees: pentatonic minor', () => {
    let scale = ScaleAlt.PENTATONIC_MINOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.bIII,
        DegreeAlt.IV,
        DegreeAlt.V,
        DegreeAlt.bVII
    ]);
});

test('Scale - degrees: pentatonic', () => {
    let scale = ScaleAlt.PENTATONIC;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.II,
        DegreeAlt.III,
        DegreeAlt.V,
        DegreeAlt.VI
    ]);
});

test('Scale - degrees: egypcian', () => {
    let scale = ScaleAlt.EGYPCIAN;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.II,
        DegreeAlt.IV,
        DegreeAlt.V,
        DegreeAlt.bVII
    ]);
});

test('Scale - degrees: blues minor', () => {
    let scale = ScaleAlt.BLUES_MINOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.bIII,
        DegreeAlt.IV,
        DegreeAlt.bVI,
        DegreeAlt.bVII
    ]);
});

test('Scale - degrees: blues major', () => {
    let scale = ScaleAlt.BLUES_MAJOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.II,
        DegreeAlt.IV,
        DegreeAlt.V,
        DegreeAlt.VI
    ]);
});

test('Scale - set all: contains BLUES_a4', () => {
    expect(ScaleAlt.sets.common().has(ScaleAlt.BLUES_a4)).toBe(true);
});

test('Scale - degrees: BEBOP DOMINANT', () => {
    let scale = ScaleAlt.BEBOP_DOMINANT;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.II,
        DegreeAlt.III,
        DegreeAlt.IV,
        DegreeAlt.V,
        DegreeAlt.VI,
        DegreeAlt.bVII,
        DegreeAlt.VII,
    ]);
});

test('Scale - degrees: BLUES_b5, mode V', () => {
    let scale = ScaleAlt.BLUES_b5.modes[4];
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DegreeAlt.I,
        DegreeAlt.bIII,
        DegreeAlt.IV,
        DegreeAlt.bVI,
        DegreeAlt.bVII,
        DegreeAlt.from(DiatonicDegree.I, -1),
    ]);
});

test('Scale - toString: all have string', () => {
    for (let scale of ScaleAlt.sets.common()) {
        expect(scale.toString()).not.toBeNull();
        expect(scale.toString()).toBeDefined();
    }
});

test('Scale - degreeFunctions: MAJOR', () => {
    let scale = ScaleAlt.MAJOR;
    let degreeFunctions: DegreeFunction[] = scale.degreeFunctions;
    let someFunctions = [
        Func.I,
        Func.ISUS4,
        Func.ii,
        Func.iii,
        Func.IV,
        Func.V,
        Func.VSUS4,
        Func.vi,
        Func.VII0,
    ];
    expect(degreeFunctions).toEqual(expect.arrayContaining(someFunctions));
});

test('Scale - degreeFunctions: MAJOR seventh', () => {
    let scale = ScaleAlt.MAJOR;
    let degreeFunctions: DegreeFunction[] = scale.degreeFunctions;
    let someFunctions = [
        Func.IMaj7,
        Func.IIm7,
        Func.IIIm7,
        Func.IVMaj7,
        Func.V7,
        Func.V7SUS4,
        Func.VIm7,
        Func.VIIm7b5,
    ];
    expect(degreeFunctions).toEqual(expect.arrayContaining(someFunctions));
});

test('Scale - degreeFunctions: MINOR', () => {
    let scale = ScaleAlt.MINOR;
    let degreeFunctions: DegreeFunction[] = scale.degreeFunctions;
    let someFunctions = [
        Func.i,
        Func.II0,
        Func.bIII,
        Func.iv,
        Func.v,
        Func.bVI,
        Func.bVII,
    ];
    expect(degreeFunctions).toEqual(expect.arrayContaining(someFunctions));
});

test('Scale - degreeFunctions: MINOR seventh', () => {
    let scale = ScaleAlt.MINOR;
    let degreeFunctions: DegreeFunction[] = scale.degreeFunctions;
    let someFunctions = [
        Func.Im7,
        Func.IIm7b5,
        Func.bIIIMaj7,
        Func.IVm7,
        Func.Vm7,
        Func.V7SUS4b9,
        Func.bVIMaj7,
        Func.bVIMaj7b5,
        Func.bVII7,
        Func.bVII7SUS4,
    ];
    expect(degreeFunctions).toEqual(expect.arrayContaining(someFunctions));
});

test('toString - ESP - AEOLIAN_b1 - LIDIA AUMENTADA #2', () => {
    Settings.lang = Language.ESP;
    expect(ScaleAlt.AEOLIAN_b1.toString()).toEqual("LIDIA AUMENTADA ♯2");
});

test('fromString - ESP - MAYOR', () => {
    Settings.lang = Language.ESP;
    expect(ScaleAlt.fromString("MAYOR")).toBe(ScaleAlt.MAJOR);
});

test('fromString - ESP - MAJOR', () => {
    Settings.lang = Language.ESP;
    const t = () => {
        ScaleAlt.fromString("MAJOR")
    };
    expect(t).toThrow(Error);
});

test('fromString - ESP - maYor (with spaces)', () => {
    Settings.lang = Language.ESP;
    expect(ScaleAlt.fromString("  ma Yor  ")).toBe(ScaleAlt.MAJOR);
});

test('fromString - ESP - MENOR', () => {
    Settings.lang = Language.ESP;
    expect(ScaleAlt.fromString("MENOR")).toBe(ScaleAlt.MINOR);
});

test('fromString - ESP - LiDIA aume Ntada #2', () => {
    Settings.lang = Language.ESP;
    expect(ScaleAlt.fromString("LiDIA aume Ntada #2")).toBe(ScaleAlt.AEOLIAN_b1);
});

test('fromString - ESP - LiDIA AUMENTada ♯2', () => {
    Settings.lang = Language.ESP;
    expect(ScaleAlt.fromString("LiDIA AUMENTada ♯2")).toBe(ScaleAlt.AEOLIAN_b1);
});

test('fromString - ESP - LYDIAN b7', () => {
    Settings.lang = Language.ESP;
    expect(ScaleAlt.fromString("LiDIA b7")).toBe(ScaleAlt.LYDIAN_b7);
});

test('fromString - ENG - SUPERLOCRIA bb7', () => {
    Settings.lang = Language.ESP;
    expect(ScaleAlt.fromString("SUPERLOCRIA bb7")).toBe(ScaleAlt.SUPERLOCRIAN_bb7);
});

test('toString - ENG - AEOLIAN_b1 - LYDIAN AUGMENTED #2', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.AEOLIAN_b1.toString()).toEqual("LYDIAN AUGMENTED ♯2");
});
test('fromString - ENG - MAYOR', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.fromString("MAJOR")).toBe(ScaleAlt.MAJOR);
});

test('fromString - ENG - MAYOR', () => {
    Settings.lang = Language.ENG;
    const t = () => {
        ScaleAlt.fromString("MAYOR")
    };
    expect(t).toThrow(Error);
});

test('fromString - ENG - maJor (with spaces)', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.fromString("  ma Jor  ")).toBe(ScaleAlt.MAJOR);
});

test('fromString - ENG - MINOR', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.fromString("MINOR")).toBe(ScaleAlt.MINOR);
});

test('fromString - ENG - LyDIAN augme Nted #2', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.fromString("LyDIAN augme Nted #2")).toBe(ScaleAlt.AEOLIAN_b1);
});

test('fromString - ENG - LYDIAN AUGMENTED ♯2', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.fromString("LYDIAN AUGMENTED ♯2")).toBe(ScaleAlt.AEOLIAN_b1);
});

test('fromString - ENG - LYDIAN b7', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.fromString("LYDIAN b7")).toBe(ScaleAlt.LYDIAN_b7);
});

test('fromString - ENG - BLUES b5', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.fromString("blues b5")).toBe(ScaleAlt.BLUES_b5);
});

test('fromString - ENG - SUPERLOCRIAN bb7', () => {
    Settings.lang = Language.ENG;
    expect(ScaleAlt.fromString("SUPERLOCRIAN bb7")).toBe(ScaleAlt.SUPERLOCRIAN_bb7);
});

test('fromString - M2:M2-m2, M2-M2:M2-m2 (MAJOR)', () => {
    expect(ScaleAlt.fromString("M2:M2-m2, M2-M2:M2-m2")).toBe(ScaleAlt.MAJOR);
});

test('hasEnharmonicDegrees - CHROMATIC - II# and bIII', () => {
    let degrees: DegreeAltArray =
        [
            DegreeAlt.from(DiatonicDegree.II, 1),
            DegreeAlt.bIII,
        ];

    expect(ScaleAlt.CHROMATIC.hasEnharmonicDegrees(...degrees)).toBeTruthy();
});

test('degreeFunctions - CHROMATIC - I (mayor)', () => {
    let degreeFunctions = ScaleAlt.CHROMATIC.degreeFunctions;

    expect(degreeFunctions.includes(Func.I)).toBeTruthy();
});

it("scale", () => {
    let actual = ScaleAlt.MAJOR.scale;
    let expected = Scale.MAJOR;

    expect(actual).toBe(expected);
})