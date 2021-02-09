import { Language, Settings } from "../../../config";
import { IntervalDiatonicAlt, IntervalDiatonicAltArray } from "../../../intervals";
import { ChromaticPattern } from "../chromatic/ChromaticPattern";
import { DiatonicPattern } from "../diatonic/DiatonicPattern";
import { DiatonicAltPattern } from "./DiatonicAltPattern";

it('fromRootIntervals - immutable: 0, 4, 7', () => {
    let diatonicAltPattern = DiatonicAltPattern.fromRootIntervals(IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MAJOR_THIRD, IntervalDiatonicAlt.PERFECT_FIFTH);
    expect(diatonicAltPattern).toBe(DiatonicAltPattern.TRIAD_MAJOR);
})

it('fromRootIntervals - immutable new pattern: 0, 1', () => {
    let diatonicAltPattern = DiatonicAltPattern.fromRootIntervals(IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MINOR_SECOND);
    let diatonicAltPattern2 = DiatonicAltPattern.fromRootIntervals(IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MINOR_SECOND);
    expect(diatonicAltPattern2).toBe(diatonicAltPattern);
})

it('fromRootIntervals - P1, M3, d5, m7, a9, P11, M13', () => {
    let actual = DiatonicAltPattern.fromRootIntervals(
        IntervalDiatonicAlt.PERFECT_UNISON,
        IntervalDiatonicAlt.MAJOR_THIRD,
        IntervalDiatonicAlt.DIMINISHED_FIFTH,
        IntervalDiatonicAlt.MINOR_SEVENTH,
        IntervalDiatonicAlt.AUGMENTED_NINTH,
        IntervalDiatonicAlt.PERFECT_ELEVENTH,
        IntervalDiatonicAlt.MAJOR_THIRTEENTH,
    );
    let expected = DiatonicAltPattern.THIRTEENTH_b5a9;
    expect(actual).toBe(expected);
})

it('fromPatterns - Pattern SEVENTH + Diatonic SEVENTH = DiatonicAlt SEVENTH', () => {
    let diatonicAltPattern = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH, DiatonicPattern.SEVENTH);
    let diatonicAltPattern2 = DiatonicAltPattern.SEVENTH;
    expect(diatonicAltPattern2).toBe(diatonicAltPattern);
})

it('fromRootIntervals - P1-M3-P5-m7 = SEVENTH', () => {
    let rootIntervals: IntervalDiatonicAltArray = [IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MAJOR_THIRD, IntervalDiatonicAlt.PERFECT_FIFTH, IntervalDiatonicAlt.MINOR_SEVENTH];
    let actual = DiatonicAltPattern.fromRootIntervals(...rootIntervals);
    let expected = DiatonicAltPattern.SEVENTH;
    expect(actual).toBe(expected);
})

it('rootIntervals - SEVENTH = P1-M3-P5-m7', () => {
    let actual: IntervalDiatonicAlt[] = DiatonicAltPattern.SEVENTH.rootIntervals;
    let expected: IntervalDiatonicAlt[] = [IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MAJOR_THIRD, IntervalDiatonicAlt.PERFECT_FIFTH, IntervalDiatonicAlt.MINOR_SEVENTH];
    expect(actual).toStrictEqual(expected);
})

it('shortName - SEVENTH = 7', () => {
    let actual: string = DiatonicAltPattern.SEVENTH.shortName;
    let expected: string = "7";
    expect(actual).toBe(expected);
})

it('withInv: TRIAD MAJOR + 2inv', () => {
    let diatonicAltPattern = DiatonicAltPattern.TRIAD_MAJOR.withInv(2);
    let expected = DiatonicAltPattern.fromRootIntervals(IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.PERFECT_FOURTH, IntervalDiatonicAlt.MAJOR_SIXTH);
    expect(diatonicAltPattern).toBe(expected);
})

it('toString ENG: TRIAD MAJOR', () => {
    Settings.lang = Language.ENG;
    let str = DiatonicAltPattern.TRIAD_MAJOR.toString();
    let expected = "MAJOR";
    expect(str).toBe(expected);
})

it('toString ESP: TRIAD MAJOR', () => {
    Settings.lang = Language.ESP;
    let str = DiatonicAltPattern.TRIAD_MAJOR.toString();
    let expected = "MAYOR";
    expect(str).toBe(expected);
})

it('shortName: MAJOR', () => {
    let str = DiatonicAltPattern.TRIAD_MAJOR.shortName;

    let expected = "";
    expect(str).toBe(expected);
})

it('shortName: SEVENTH', () => {
    let str = DiatonicAltPattern.SEVENTH.shortName;

    let expected = "7";
    expect(str).toBe(expected);
})

it('fromString - ESP - "m" = TRIAD_MINOR', () => {
    Settings.lang = Language.ESP;
    expect(DiatonicAltPattern.fromString("m")).toBe(DiatonicAltPattern.TRIAD_MINOR);
})

it('fromString - ESP - " " = TRIAD_MAJOR', () => {
    Settings.lang = Language.ESP;
    expect(DiatonicAltPattern.fromString(" ")).toBe(DiatonicAltPattern.TRIAD_MAJOR);
})

it('fromString - ESP - "MAyOR" = TRIAD_MAJOR', () => {
    Settings.lang = Language.ESP;
    expect(DiatonicAltPattern.fromString("MAyOR")).toBe(DiatonicAltPattern.TRIAD_MAJOR);
})

it('fromString - ENG - "m" = TRIAD_MINOR', () => {
    Settings.lang = Language.ENG;
    expect(DiatonicAltPattern.fromString("m")).toBe(DiatonicAltPattern.TRIAD_MINOR);
})

it('fromString - ENG - " " = TRIAD_MAJOR', () => {
    Settings.lang = Language.ENG;
    expect(DiatonicAltPattern.fromString(" ")).toBe(DiatonicAltPattern.TRIAD_MAJOR);
})

it('fromString - ENG - "MAjOR" = TRIAD_MAJOR', () => {
    Settings.lang = Language.ENG;
    expect(DiatonicAltPattern.fromString("MAjOR")).toBe(DiatonicAltPattern.TRIAD_MAJOR);
})

it('precalc - SEVENTH MAJ7 b5', () => {
    let pattern = ChromaticPattern.fromRootIntervals(0, 4, 6, 11);
    let patternAlt = DiatonicAltPattern.fromPatterns(pattern, DiatonicPattern.SEVENTH);
    let expected = DiatonicAltPattern.SEVENTH_MAJ7_b5;
    expect(patternAlt).toBe(expected);
})

it('shortName - ENG - SEVENTH MAJ7 b5', () => {
    Settings.lang = Language.ENG;
    let actual = DiatonicAltPattern.SEVENTH_MAJ7_b5.shortName;
    let expected = "Maj7♭5";
    expect(actual).toBe(expected);
})
it('shortName - ENG - SEVENTH SUS4 b9', () => {
    Settings.lang = Language.ENG;
    let actual = DiatonicAltPattern.SEVENTH_SUS4_b9.shortName;
    let expected = "7sus4(♭9)";
    expect(actual).toBe(expected);
})

it('toString() - ENG - SEVENTH MAJ7 b5', () => {
    Settings.lang = Language.ENG;
    let actual = DiatonicAltPattern.SEVENTH_MAJ7_b5.toString();
    let expected = "SEVENTH MAJ7 ♭5";
    expect(actual).toBe(expected);
})

it('toString() - ENG - SEVENTH SUS4 b9', () => {
    Settings.lang = Language.ENG;
    let actual = DiatonicAltPattern.SEVENTH_SUS4_b9.toString();
    let expected = "SEVENTH SUS4 ♭9";
    expect(actual).toBe(expected);
})

it('shortName - ESP - SEVENTH MAJ7 b5', () => {
    Settings.lang = Language.ESP;
    let actual = DiatonicAltPattern.SEVENTH_MAJ7_b5.shortName;
    let expected = "Maj7♭5";
    expect(actual).toBe(expected);
})

it('toString() - ESP - SEVENTH MAJ7 b5', () => {
    Settings.lang = Language.ESP;
    let actual = DiatonicAltPattern.SEVENTH_MAJ7_b5.toString();
    let expected = "SÉPTIMA MAJ7 ♭5";
    expect(actual).toBe(expected);
})

it('toString() - ESP - SEVENTH SUS4 b9', () => {
    Settings.lang = Language.ESP;
    let actual = DiatonicAltPattern.SEVENTH_SUS4_b9.toString();
    let expected = "SÉPTIMA SUS4 ♭9";
    expect(actual).toBe(expected);
})

it('inversionNumber: SEVENTH + inv = 1', () => {
    let pattern = DiatonicAltPattern.SEVENTH.withInv(1);
    let inversionNumber = pattern.inversionNumber;
    let expected = 1;
    expect(inversionNumber).toBe(expected);
})

it('inversionNumber: 13b5#9 + 2 inv = 2', () => {
    let pattern = DiatonicAltPattern.THIRTEENTH_b5a9.withInv(2);
    let inversionNumber = pattern.inversionNumber;

    let expected = 2;
    expect(inversionNumber).toBe(expected);
})