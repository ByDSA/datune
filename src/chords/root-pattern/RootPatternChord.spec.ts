import { Chromatic } from "../../degrees/Chromatic";
import { DiatonicAlt } from "../../degrees/DiatonicAlt";
import { IntervalDiatonicAlt } from "../../interval/IntervalDiatonicAlt";
import { ChromaticPattern } from "../../patterns/ChromaticPattern";
import { DiatonicAltPattern } from "../../patterns/DiatonicAltPattern";
import * as precalc from "../../precalc";
import { ChromaticChord } from "../chromatic/ChromaticChord";
import { DiatonicAltChord } from "../diatonicalt/DiatonicAltChord";
import { RootPatternChord } from "./RootPatternChord";
precalc.chromatics();
precalc.chromaticChords();
precalc.chromaticPatterns();
precalc.diatonicAlts();
precalc.diatonicAltPatterns();
precalc.diatonicAltChords();


test('get from ImmutableCache: C7', async () => {
    let diatonicAltChord = RootPatternChord.from(DiatonicAlt.C, DiatonicAltPattern.SEVENTH).chord;

    let expected = DiatonicAltChord.C7;
    expect(diatonicAltChord).toBe(expected);
});

test('get from ImmutableCache: Am', async () => {
    let diatonicAltChord = RootPatternChord.from(DiatonicAlt.A, DiatonicAltPattern.TRIAD_MINOR).chord;

    let expected = DiatonicAltChord.Am;
    expect(diatonicAltChord).toBe(expected);
});

test('get from ImmutableCache: CMaj7', async () => {
    let diatonicAltChord = RootPatternChord.from(DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MAJ7).chord;

    let expected = DiatonicAltChord.CMaj7;
    expect(diatonicAltChord).toBe(expected);
});

/** Diatonic Alt */

test('from - DiatonicAlt C + TRIAD MAJOR', async () => {
    let actual: RootPatternChord<DiatonicAlt, IntervalDiatonicAlt> = RootPatternChord.from(DiatonicAlt.C, DiatonicAltPattern.TRIAD_MAJOR);
    expect(actual.degree).toBe(DiatonicAlt.C);
    expect(actual.pattern).toBe(DiatonicAltPattern.TRIAD_MAJOR);
});

test('chord - DiatonicAlt C + TRIAD MAJOR = DiatonicAltChord C', async () => {
    let patternChord: RootPatternChord<DiatonicAlt, IntervalDiatonicAlt> = RootPatternChord.from(DiatonicAlt.C, DiatonicAltPattern.TRIAD_MAJOR);
    let actual = patternChord.chord;
    expect(actual).toBe(DiatonicAltChord.C);
});

/** Chromatic */

test('from - Chromatic C + TRIAD MAJOR', async() => {
    let actual: RootPatternChord<Chromatic, number> = RootPatternChord.from(Chromatic.C, ChromaticPattern.TRIAD_MAJOR);
    expect(actual.degree).toBe(Chromatic.C);
    expect(actual.pattern).toBe(ChromaticPattern.TRIAD_MAJOR);
});

test('chord - Chromatic C + TRIAD MAJOR = Chord C', async() => {
    let patternChord: RootPatternChord<Chromatic, number> = RootPatternChord.from(Chromatic.C, ChromaticPattern.TRIAD_MAJOR);
    let actual = patternChord.chord;
    expect(actual).toBe(ChromaticChord.C);
});