import { DiatonicAltDegree } from "../degrees/scale/DiatonicAltDegree";
import { DiatonicDegree } from "../degrees/scale/DiatonicDegree";
import { DegreeFunction } from "../function/DegreeFunction";
import { Language } from "../lang/Language";
import * as precalc from "../precalc";
import { Settings } from "../settings/Settings";
import { Scale } from "./Scale";
precalc.scales();
precalc.diatonics();
precalc.chromatics();
precalc.diatonicAltDegrees();
precalc.diatonicAltPatterns();
precalc.settings();
precalc.diatonicDegrees();
precalc.degreeFunctions();

test('Scale: ', () => {
    let scale = Scale.MAJOR;

    expect(scale).toBe(Scale.MAJOR);
});

test('Scale: degrees not null or undefined', () => {
    for (let scale of Scale.sets.all()) {
        expect(scale.degrees).not.toBeNull();
    }
});

test('Scale - degrees: MAJOR', () => {
    let scale = Scale.MAJOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.II,
        DiatonicAltDegree.III,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.V,
        DiatonicAltDegree.VI,
        DiatonicAltDegree.VII
    ]);
});

test('Scale - degrees: MINOR', () => {
    let scale = Scale.MINOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.II,
        DiatonicAltDegree.bIII,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.V,
        DiatonicAltDegree.bVI,
        DiatonicAltDegree.bVII
    ]);
});

test('Scale - degrees: BLUES_b5', () => {
    let scale = Scale.BLUES_b5;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.bIII,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.bV,
        DiatonicAltDegree.V,
        DiatonicAltDegree.bVII
    ]);
});

test('Scale - degrees: BLUES_a4', () => {
    let scale = Scale.BLUES_a4;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.bIII,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.from(DiatonicDegree.IV, 1),
        DiatonicAltDegree.V,
        DiatonicAltDegree.bVII
    ]);
});


test('Scale - degrees: pentatonic minor', () => {
    let scale = Scale.PENTATONIC_MINOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.bIII,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.V,
        DiatonicAltDegree.bVII
    ]);
});

test('Scale - degrees: pentatonic', () => {
    let scale = Scale.PENTATONIC;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.II,
        DiatonicAltDegree.III,
        DiatonicAltDegree.V,
        DiatonicAltDegree.VI
    ]);
});

test('Scale - degrees: egypcian', () => {
    let scale = Scale.EGYPCIAN;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.II,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.V,
        DiatonicAltDegree.bVII
    ]);
});

test('Scale - degrees: blues minor', () => {
    let scale = Scale.BLUES_MINOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.bIII,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.bVI,
        DiatonicAltDegree.bVII
    ]);
});

test('Scale - degrees: blues major', () => {
    let scale = Scale.BLUES_MAJOR;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.II,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.V,
        DiatonicAltDegree.VI
    ]);
});

test('Scale - set all: contains BLUES_a4', () => {
    expect(Scale.sets.all().includes(Scale.BLUES_a4)).toBe(true);
});

test('Scale - degrees: BEBOP DOMINANT', () => {
    let scale = Scale.BEBOP_DOMINANT;
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.II,
        DiatonicAltDegree.III,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.V,
        DiatonicAltDegree.VI,
        DiatonicAltDegree.bVII,
        DiatonicAltDegree.VII,
    ]);
});

test('Scale - degrees: BLUES_b5, mode V', () => {
    let scale = Scale.BLUES_b5.modes[4];
    let degrees = scale.degrees;
    expect(degrees).toStrictEqual([
        DiatonicAltDegree.I,
        DiatonicAltDegree.bIII,
        DiatonicAltDegree.IV,
        DiatonicAltDegree.bVI,
        DiatonicAltDegree.bVII,
        DiatonicAltDegree.from(DiatonicDegree.I, -1),
    ]);
});

test('Scale - toString: all have string', () => {
    for (let scale of Scale.sets.all()) {
        expect(scale.toString()).not.toBeNull();
        expect(scale.toString()).not.toBeUndefined();
    }
});

test('Scale - degreeFunctions: MAJOR', () => {
    let scale = Scale.MAJOR;
    let degreeFunctions: DegreeFunction[] = scale.degreeFunctions;
    let someFunctions = [
        DegreeFunction.I,
        DegreeFunction.ISUS4,
        DegreeFunction.ii,
        DegreeFunction.iii,
        DegreeFunction.IV,
        DegreeFunction.V,
        DegreeFunction.VSUS4,
        DegreeFunction.vi,
        DegreeFunction.VII0,
    ];
    expect(degreeFunctions).toEqual(expect.arrayContaining(someFunctions));
});

test('Scale - degreeFunctions: MAJOR seventh', () => {
    let scale = Scale.MAJOR;
    let degreeFunctions: DegreeFunction[] = scale.degreeFunctions;
    let someFunctions = [
        DegreeFunction.IMaj7,
        DegreeFunction.IIm7,
        DegreeFunction.IIIm7,
        DegreeFunction.IVMaj7,
        DegreeFunction.V7,
        DegreeFunction.V7SUS4,
        DegreeFunction.VIm7,
        DegreeFunction.VIIm7b5,
    ];
    expect(degreeFunctions).toEqual(expect.arrayContaining(someFunctions));
});

test('Scale - degreeFunctions: MINOR', () => {
    let scale = Scale.MINOR;
    let degreeFunctions: DegreeFunction[] = scale.degreeFunctions;
    let someFunctions = [
        DegreeFunction.i,
        DegreeFunction.II0,
        DegreeFunction.bIII,
        DegreeFunction.iv,
        DegreeFunction.v,
        DegreeFunction.bVI,
        DegreeFunction.bVII,
    ];
    expect(degreeFunctions).toEqual(expect.arrayContaining(someFunctions));
});

test('Scale - degreeFunctions: MINOR seventh', () => {
    let scale = Scale.MINOR;
    let degreeFunctions: DegreeFunction[] = scale.degreeFunctions;
    let someFunctions = [
        DegreeFunction.Im7,
        DegreeFunction.IIm7b5,
        DegreeFunction.bIIIMaj7,
        DegreeFunction.IVm7,
        DegreeFunction.Vm7,
        DegreeFunction.V7SUS4b9,
        DegreeFunction.bVIMaj7,
        DegreeFunction.bVIMaj7b5,
        DegreeFunction.bVII7,
        DegreeFunction.bVII7SUS4,
    ];
    expect(degreeFunctions).toEqual(expect.arrayContaining(someFunctions));
});

test('toString - ESP - AEOLIAN_b1 - LIDIA AUMENTADA #2', () => {
    Settings.lang = Language.ESP;
    expect(Scale.AEOLIAN_b1.toString()).toEqual("LIDIA AUMENTADA ♯2");
});

test('fromString - ESP - MAYOR', () => {
    Settings.lang = Language.ESP;
    expect(Scale.fromString("MAYOR")).toBe(Scale.MAJOR);
});

test('fromString - ESP - MAJOR', () => {
    Settings.lang = Language.ESP;
    const t = () => {
        Scale.fromString("MAJOR")
    };
    expect(t).toThrow(Error);
});

test('fromString - ESP - maYor (with spaces)', () => {
    Settings.lang = Language.ESP;
    expect(Scale.fromString("  ma Yor  ")).toBe(Scale.MAJOR);
});

test('fromString - ESP - MENOR', () => {
    Settings.lang = Language.ESP;
    expect(Scale.fromString("MENOR")).toBe(Scale.MINOR);
});

test('fromString - ESP - LiDIA aume Ntada #2', () => {
    Settings.lang = Language.ESP;
    expect(Scale.fromString("LiDIA aume Ntada #2")).toBe(Scale.AEOLIAN_b1);
});

test('fromString - ESP - LiDIA AUMENTada ♯2', () => {
    Settings.lang = Language.ESP;
    expect(Scale.fromString("LiDIA AUMENTada ♯2")).toBe(Scale.AEOLIAN_b1);
});

test('fromString - ESP - LYDIAN b7', () => {
    Settings.lang = Language.ESP;
    expect(Scale.fromString("LiDIA b7")).toBe(Scale.LYDIAN_b7);
});

test('fromString - ENG - SUPERLOCRIA bb7', () => {
    Settings.lang = Language.ESP;
    expect(Scale.fromString("SUPERLOCRIA bb7")).toBe(Scale.SUPERLOCRIAN_bb7);
});

test('toString - ENG - AEOLIAN_b1 - LYDIAN AUGMENTED #2', () => {
    Settings.lang = Language.ENG;
    expect(Scale.AEOLIAN_b1.toString()).toEqual("LYDIAN AUGMENTED ♯2");
});
test('fromString - ENG - MAYOR', () => {
    Settings.lang = Language.ENG;
    expect(Scale.fromString("MAJOR")).toBe(Scale.MAJOR);
});

test('fromString - ENG - MAYOR', () => {
    Settings.lang = Language.ENG;
    const t = () => {
        Scale.fromString("MAYOR")
    };
    expect(t).toThrow(Error);
});

test('fromString - ENG - maJor (with spaces)', () => {
    Settings.lang = Language.ENG;
    expect(Scale.fromString("  ma Jor  ")).toBe(Scale.MAJOR);
});

test('fromString - ENG - MINOR', () => {
    Settings.lang = Language.ENG;
    expect(Scale.fromString("MINOR")).toBe(Scale.MINOR);
});

test('fromString - ENG - LyDIAN augme Nted #2', () => {
    Settings.lang = Language.ENG;
    expect(Scale.fromString("LyDIAN augme Nted #2")).toBe(Scale.AEOLIAN_b1);
});

test('fromString - ENG - LYDIAN AUGMENTED ♯2', () => {
    Settings.lang = Language.ENG;
    expect(Scale.fromString("LYDIAN AUGMENTED ♯2")).toBe(Scale.AEOLIAN_b1);
});

test('fromString - ENG - LYDIAN b7', () => {
    Settings.lang = Language.ENG;
    expect(Scale.fromString("LYDIAN b7")).toBe(Scale.LYDIAN_b7);
});

test('fromString - ENG - BLUES b5', () => {
    Settings.lang = Language.ENG;
    expect(Scale.fromString("blues b5")).toBe(Scale.BLUES_b5);
});

test('fromString - ENG - SUPERLOCRIAN bb7', () => {
    Settings.lang = Language.ENG;
    expect(Scale.fromString("SUPERLOCRIAN bb7")).toBe(Scale.SUPERLOCRIAN_bb7);
});

test('fromString - 2-2-1-2-2-2-1 (MAJOR)', () => {
    expect(Scale.fromString("2-2-1-2-2-2-1")).toBe(Scale.MAJOR);
});

test('fromString - 2:2-1:2-2:2-1 (MAJOR)', () => {
    expect(Scale.fromString("2:2-1:2-2:2-1")).toBe(Scale.MAJOR);
});

test('fromString - 2 2, 1 2-2 2:1 (MAJOR)', () => {
    expect(Scale.fromString("2 2, 1 2-2 2:1")).toBe(Scale.MAJOR);
});

test('fromString - M2:M2-m2, M2-M2:M2-m2 (MAJOR)', () => {
    expect(Scale.fromString("M2:M2-m2, M2-M2:M2-m2")).toBe(Scale.MAJOR);
});

test('hasEnharmonicDegrees - CHROMATIC - II# and bIII', () => {
    let degrees: DiatonicAltDegree[] =
        [
            DiatonicAltDegree.from(DiatonicDegree.II, 1),
            DiatonicAltDegree.bIII,
        ];

    expect(Scale.CHROMATIC.hasEnharmonicDegrees(...degrees)).toBeTruthy();
});

test('degreeFunctions - CHROMATIC - I (mayor)', () => {
    let degreeFunctions = Scale.CHROMATIC.degreeFunctions;

    expect(degreeFunctions.includes(DegreeFunction.I)).toBeTruthy();
});