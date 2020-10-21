import { DiatonicAltChord } from "../../chords/DiatonicAltChord";
import * as init from "../../initializer";
import { DiatonicAltPattern } from "../../patterns/DiatonicAltPattern";
import { DiatonicAltDegree } from "../../scales/degrees/DiatonicAltDegree";
import { Tonality } from "../Tonality";
import { DegreeFunction } from "./DegreeFunction";
init.chromatics.default();
init.diatonics.default();
init.diatonicAlts.default();
init.diatonicAltChords.default();
init.diatonicAltDegrees.default();
init.diatonicAltPatterns.default();
init.intervalDiatonicAlts.default();
init.scales.default();
init.tonalities.default();
init.degreeFunctions.default();
init.settings.default();

test('precalc: I', () => {
    expect(DegreeFunction.I.degree).toBe(DiatonicAltDegree.I);
    expect(DegreeFunction.I.pattern).toBe(DiatonicAltPattern.TRIAD_MAJOR);
});

test('precalc: bIIMaj7', () => {
    expect(DegreeFunction.bIIMaj7.degree).toBe(DiatonicAltDegree.bII);
    expect(DegreeFunction.bIIMaj7.pattern).toBe(DiatonicAltPattern.SEVENTH_MAJ7);
});

test('calculateChord: Tonality C, DegreeFunction I = Chord C', () => {
    let chord = DegreeFunction.I.getChord(Tonality.C);
    let expected = DiatonicAltChord.C;
    expect(chord).toBe(expected);
});

test('calculateChord - tonality hasnt degree: Tonality C, DegreeFunction I0 = Chord C0', () => {
    let chord = DegreeFunction.I0.getChord(Tonality.C);
    let expected = DiatonicAltChord.C0;
    expect(chord).toBe(expected);
});

test('degrees: I', () => {
    let degrees = DegreeFunction.I.degrees;
    let expected = [
        DiatonicAltDegree.I,
        DiatonicAltDegree.III,
        DiatonicAltDegree.V,
    ];
    expect(degrees).toStrictEqual(expected);
});

test('degrees: VII0', () => {
    let degrees = DegreeFunction.VII0.degrees;
    let expected = [
        DiatonicAltDegree.VII,
        DiatonicAltDegree.II,
        DiatonicAltDegree.IV
    ];
    expect(degrees).toStrictEqual(expected);
});

test('degrees: IVMaj7', () => {
    let degrees = DegreeFunction.IVMaj7.degrees;
    let expected = [
        DiatonicAltDegree.IV,
        DiatonicAltDegree.VI,
        DiatonicAltDegree.I,
        DiatonicAltDegree.III
    ];
    expect(degrees).toStrictEqual(expected);
});

test('degrees: i', () => {
    let degreeFunction = DegreeFunction.i;
    let degrees = degreeFunction.degrees;
    let expected = [
        DiatonicAltDegree.I,
        DiatonicAltDegree.bIII,
        DiatonicAltDegree.V,
    ];
    expect(degrees).toStrictEqual(expected);
});

test('pattern: i', () => {
    let degreeFunction = DegreeFunction.i;
    let expected = DiatonicAltPattern.TRIAD_MINOR;
    expect(degreeFunction.pattern).toStrictEqual(expected);
});

test('from: I + TRIAD_MAJOR = I', () => {
    let degreeFunction = DegreeFunction.from(DiatonicAltDegree.I, DiatonicAltPattern.TRIAD_MAJOR);
    let expected = DegreeFunction.I;
    expect(degreeFunction).toEqual(expected);
});

it("toString", () => {
    expect(DegreeFunction.I.toString()).toBe("I");
    expect(DegreeFunction.i.toString()).toBe("i");
    expect(DegreeFunction.I5.toString()).toBe("I5");
    expect(DegreeFunction.VISUS4.toString()).toBe("VIsus4");
})