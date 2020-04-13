import { DiatonicAltChord } from "../chords/diatonicalt/DiatonicAltChord";
import { DiatonicAltChordPattern } from "../chords/diatonicalt/DiatonicAltChordPattern";
import { DiatonicAltDegree } from "../degrees/scale/DiatonicAltDegree";
import * as precalc from "../precalc";
import { Tonality } from "../tonality/Tonality";
import { DegreeFunction } from "./DegreeFunction";
precalc.chromatics();
precalc.diatonics();
precalc.diatonicAlts();
precalc.diatonicAltChords();
precalc.diatonicAltDegrees();
precalc.diatonicAltChordPatterns();
precalc.intervalDiatonicAlts();
precalc.scales();
precalc.tonalities();
precalc.degreeFunctions();
precalc.settings();

test('DiatonicAlt - precalc: I', () => {
    expect(DegreeFunction.I.diatonicAltDegree).toBe(DiatonicAltDegree.I);
    expect(DegreeFunction.I.diatonicAltChordPattern).toBe(DiatonicAltChordPattern.TRIAD_MAJOR);
});

test('DiatonicAlt - precalc: bIIMaj7', () => {
    expect(DegreeFunction.bIIMaj7.diatonicAltDegree).toBe(DiatonicAltDegree.bII);
    expect(DegreeFunction.bIIMaj7.diatonicAltChordPattern).toBe(DiatonicAltChordPattern.SEVENTH_MAJ7);
});

test('DiatonicAlt - calculateChord: Tonality C, DegreeFunction I = Chord C', () => {
    let chord = DegreeFunction.I.getChord(Tonality.C);
    let expected = DiatonicAltChord.C;
    expect(chord).toBe(expected);
});

test('DiatonicAlt - calculateChord - tonality hasnt degree: Tonality C, DegreeFunction I0 = Chord C0', () => {
    let chord = DegreeFunction.I0.getChord(Tonality.C);
    let expected = DiatonicAltChord.C0;
    expect(chord).toBe(expected);
});