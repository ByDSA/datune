import { Chord, ChordAlt } from "../../../chords";
import { DegreeAlt } from "../../../scales";
import { DiatonicAltPattern } from "../../../voicings/relative/alt/DiatonicAltPattern";
import { TonalityAlt } from "../../alt/TonalityAlt";
import { Tonality } from "../../chromatic/Tonality";
import { FunctionsFacade as Func } from "../FunctionsFacade";
import { DegreeFunction } from "./DegreeFunction";

it('precalc: I', () => {
    expect(Func.I.degreeAlt).toBe(DegreeAlt.I);
    expect(Func.I.patternAlt).toBe(DiatonicAltPattern.TRIAD_MAJOR);
})

it('precalc: bIIMaj7', () => {
    expect(Func.bIIMaj7.degreeAlt).toBe(DegreeAlt.bII);
    expect(Func.bIIMaj7.patternAlt).toBe(DiatonicAltPattern.SEVENTH_MAJ7);
})

describe("calculateChordAlt", () => {
    it('Tonality C, Func I = Chord C', () => {
        let chord = Func.I.getChordAlt(TonalityAlt.C);
        let expected = ChordAlt.C;
        expect(chord).toBe(expected);
    })

    it('Tonality C, Func V = Chord G', () => {
        let chord = Func.V.getChordAlt(TonalityAlt.C);
        let expected = ChordAlt.G;
        expect(chord).toBe(expected);
    })

    it('tonality hasnt degree: Tonality C, Func I0 = Chord C0', () => {
        let chord = Func.I0.getChordAlt(TonalityAlt.C);
        let expected = ChordAlt.C0;
        expect(chord).toBe(expected);
    })
})

describe("calculateChord", () => {
    it('Tonality C, Func I = Chord C', () => {
        let chord = Func.I.getChord(Tonality.C);
        let expected = Chord.C;
        expect(chord).toBe(expected);
    })

    it('Tonality C, Func V = Chord G', () => {
        let chord = Func.V.getChord(Tonality.C);
        let expected = Chord.G;
        expect(chord).toBe(expected);
    })

    it('tonality hasnt degree: Tonality C, Func I0 = Chord C0', () => {
        let chord = Func.I0.getChord(Tonality.C);
        let expected = Chord.C0;
        expect(chord).toBe(expected);
    })
})


describe("degrees", () => {
    it('I', () => {
        let degrees = Func.I.degrees;
        let expected = [
            DegreeAlt.I,
            DegreeAlt.III,
            DegreeAlt.V,
        ];
        expect(degrees).toStrictEqual(expected);
    })

    it('VII0', () => {
        let degrees = Func.VII0.degrees;
        let expected = [
            DegreeAlt.VII,
            DegreeAlt.II,
            DegreeAlt.IV
        ];
        expect(degrees).toStrictEqual(expected);
    })

    it('IVMaj7', () => {
        let degrees = Func.IVMaj7.degrees;
        let expected = [
            DegreeAlt.IV,
            DegreeAlt.VI,
            DegreeAlt.I,
            DegreeAlt.III
        ];
        expect(degrees).toStrictEqual(expected);
    })

    it('i', () => {
        let func = Func.i;
        let degrees = func.degrees;
        let expected = [
            DegreeAlt.I,
            DegreeAlt.bIII,
            DegreeAlt.V,
        ];
        expect(degrees).toStrictEqual(expected);
    });
})

it('pattern: i', () => {
    let func = Func.i;
    let expected = DiatonicAltPattern.TRIAD_MINOR;
    expect(func.patternAlt).toStrictEqual(expected);
})

it('from: I + TRIAD_MAJOR = I', () => {
    let degreeFunction = DegreeFunction.from(DegreeAlt.I, DiatonicAltPattern.TRIAD_MAJOR);
    let expected = Func.I;
    expect(degreeFunction).toEqual(expected);
})

it("toString", () => {
    expect(Func.I.toString()).toBe("I");
    expect(Func.i.toString()).toBe("i");
    expect(Func.I5.toString()).toBe("I5");
    expect(Func.VISUS4.toString()).toBe("VIsus4");
})