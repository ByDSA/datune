import { DiatonicAltChord } from "../chords/diatonicalt/DiatonicAltChord";
import { DiatonicAltDegree } from "../degrees/degrees/DiatonicAltDegree";
import { DiatonicAltPattern } from "../patterns/DiatonicAltPattern";
import * as precalc from "../precalc";
import { Tonality } from "../tonality/Tonality";
import { DegreeFunction } from "./DegreeFunction";
precalc.chromatics();
precalc.diatonics();
precalc.diatonicAlts();
precalc.diatonicAltChords();
precalc.diatonicAltDegrees();
precalc.diatonicAltPatterns();
precalc.intervalDiatonicAlts();
precalc.scales();
precalc.tonalities();
precalc.degreeFunctions();
precalc.settings();

test('DegreeFunction - precalc: I', () => {
    expect(DegreeFunction.I.degree).toBe(DiatonicAltDegree.I);
    expect(DegreeFunction.I.pattern).toBe(DiatonicAltPattern.TRIAD_MAJOR);
});

test('DegreeFunction - precalc: bIIMaj7', () => {
    expect(DegreeFunction.bIIMaj7.degree).toBe(DiatonicAltDegree.bII);
    expect(DegreeFunction.bIIMaj7.pattern).toBe(DiatonicAltPattern.SEVENTH_MAJ7);
});

test('DegreeFunction - calculateChord: Tonality C, DegreeFunction I = Chord C', () => {
    let chord = DegreeFunction.I.getChord(Tonality.C);
    let expected = DiatonicAltChord.C;
    expect(chord).toBe(expected);
});

test('DegreeFunction - calculateChord - tonality hasnt degree: Tonality C, DegreeFunction I0 = Chord C0', () => {
    let chord = DegreeFunction.I0.getChord(Tonality.C);
    let expected = DiatonicAltChord.C0;
    expect(chord).toBe(expected);
});

test('DegreeFunction - degrees: I', () => {
    let degrees = DegreeFunction.I.degrees;
    let expected = [
        DiatonicAltDegree.I,
        DiatonicAltDegree.III,
        DiatonicAltDegree.V,
    ];
    expect(degrees).toStrictEqual(expected);
});

test('DegreeFunction - degrees: VII0', () => {
    let degrees = DegreeFunction.VII0.degrees;
    let expected = [
        DiatonicAltDegree.VII,
        DiatonicAltDegree.II,
        DiatonicAltDegree.IV
    ];
    expect(degrees).toStrictEqual(expected);
});

test('DegreeFunction - degrees: IVMaj7', () => {
    let degrees = DegreeFunction.IVMaj7.degrees;
    let expected = [
        DiatonicAltDegree.IV,
        DiatonicAltDegree.VI,
        DiatonicAltDegree.I,
        DiatonicAltDegree.III
    ];
    expect(degrees).toStrictEqual(expected);
});

test('DegreeFunction - degrees: i', () => {
    let degreeFunction = DegreeFunction.i;
    let degrees = degreeFunction.degrees;
    let expected = [
        DiatonicAltDegree.I,
        DiatonicAltDegree.bIII,
        DiatonicAltDegree.V,
    ];
    expect(degrees).toStrictEqual(expected);
});

test('DegreeFunction - pattern: i', () => {
    let degreeFunction = DegreeFunction.i;
    let expected = DiatonicAltPattern.TRIAD_MINOR;
    expect(degreeFunction.pattern).toStrictEqual(expected);
});

test('DegreeFunction - from: I + TRIAD_MAJOR = I', () => {
    let degreeFunction = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_MAJOR);
    let expected = DegreeFunction.I;
    expect(degreeFunction).toEqual(expected);
});