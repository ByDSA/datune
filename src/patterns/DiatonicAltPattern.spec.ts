import { IntervalDiatonicAlt } from "../interval/IntervalDiatonicAlt";
import { Language } from "../lang/Language";
import * as precalc from "../precalc";
import { Settings } from "../settings/Settings";
import { ChromaticPattern } from "./ChromaticPattern";
import { DiatonicAltPattern } from "./DiatonicAltPattern";
import { DiatonicPattern } from "./DiatonicPattern";
precalc.diatonicAltPatterns();
precalc.diatonicAltChords();
precalc.intervalDiatonicAlts();
precalc.settings();

test('fromRootIntervals - immutable: 0, 4, 7', () => {
    let diatonicAltPattern = DiatonicAltPattern.fromRootIntervals(IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MAJOR_THIRD, IntervalDiatonicAlt.PERFECT_FIFTH);
    expect(diatonicAltPattern).toBe(DiatonicAltPattern.TRIAD_MAJOR);
});

test('fromRootIntervals - immutable new pattern: 0, 1', () => {
    let diatonicAltPattern = DiatonicAltPattern.fromRootIntervals(IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MINOR_SECOND);
    let diatonicAltPattern2 = DiatonicAltPattern.fromRootIntervals(IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MINOR_SECOND);
    expect(diatonicAltPattern2).toBe(diatonicAltPattern);
});

test('fromRootIntervals - P1, M3, d5, m7, a9, P11, M13', () => {
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
});

test('fromPatterns - Chromatic SEVENTH + Diatonic SEVENTH = DiatonicAlt SEVENTH', () => {
    let diatonicAltPattern = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH, DiatonicPattern.SEVENTH);
    let diatonicAltPattern2 = DiatonicAltPattern.SEVENTH;
    expect(diatonicAltPattern2).toBe(diatonicAltPattern);
});

test('fromRootIntervals - P1-M3-P5-m7 = SEVENTH', () => {
    let rootIntervals = [IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MAJOR_THIRD, IntervalDiatonicAlt.PERFECT_FIFTH, IntervalDiatonicAlt.MINOR_SEVENTH];
    let actual = DiatonicAltPattern.fromRootIntervals(...rootIntervals);
    let expected = DiatonicAltPattern.SEVENTH;
    expect(actual).toBe(expected);
});

test('rootIntervals - SEVENTH = P1-M3-P5-m7', () => {
    let actual: IntervalDiatonicAlt[] = DiatonicAltPattern.SEVENTH.rootIntervals;
    let expected: IntervalDiatonicAlt[] = [IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.MAJOR_THIRD, IntervalDiatonicAlt.PERFECT_FIFTH, IntervalDiatonicAlt.MINOR_SEVENTH];
    expect(actual).toStrictEqual(expected);
});

test('shortName - SEVENTH = 7', () => {
    let actual: string = DiatonicAltPattern.SEVENTH.shortName;
    let expected: string = "7";
    expect(actual).toBe(expected);
});

test('withInv: TRIAD MAJOR + 2inv', () => {
    let diatonicAltPattern = DiatonicAltPattern.TRIAD_MAJOR.withInv(2);
    let expected = DiatonicAltPattern.fromRootIntervals(IntervalDiatonicAlt.PERFECT_UNISON, IntervalDiatonicAlt.PERFECT_FOURTH, IntervalDiatonicAlt.MAJOR_SIXTH);
    expect(diatonicAltPattern).toBe(expected);
});

test('toString ENG: TRIAD MAJOR', () => {
    Settings.lang = Language.ENG;
    let str = DiatonicAltPattern.TRIAD_MAJOR.toString();
    let expected = "MAJOR";
    expect(str).toBe(expected);
});

test('toString ESP: TRIAD MAJOR', () => {
    Settings.lang = Language.ESP;
    let str = DiatonicAltPattern.TRIAD_MAJOR.toString();
    let expected = "MAYOR";
    expect(str).toBe(expected);
});

test('shortName: MAJOR', () => {
    let str = DiatonicAltPattern.TRIAD_MAJOR.shortName;

    let expected = "";
    expect(str).toBe(expected);
});

test('shortName: SEVENTH', () => {
    let str = DiatonicAltPattern.SEVENTH.shortName;

    let expected = "7";
    expect(str).toBe(expected);
});

test('fromString - ESP - "m" = TRIAD_MINOR', () => {
    Settings.lang = Language.ESP;
    expect(DiatonicAltPattern.fromString("m")).toBe(DiatonicAltPattern.TRIAD_MINOR);
});

test('fromString - ESP - " " = TRIAD_MAJOR', () => {
    Settings.lang = Language.ESP;
    expect(DiatonicAltPattern.fromString(" ")).toBe(DiatonicAltPattern.TRIAD_MAJOR);
});

test('fromString - ESP - "MAyOR" = TRIAD_MAJOR', () => {
    Settings.lang = Language.ESP;
    expect(DiatonicAltPattern.fromString("MAyOR")).toBe(DiatonicAltPattern.TRIAD_MAJOR);
});

test('fromString - ENG - "m" = TRIAD_MINOR', () => {
    Settings.lang = Language.ENG;
    expect(DiatonicAltPattern.fromString("m")).toBe(DiatonicAltPattern.TRIAD_MINOR);
});

test('fromString - ENG - " " = TRIAD_MAJOR', () => {
    Settings.lang = Language.ENG;
    expect(DiatonicAltPattern.fromString(" ")).toBe(DiatonicAltPattern.TRIAD_MAJOR);
});

test('fromString - ENG - "MAjOR" = TRIAD_MAJOR', () => {
    Settings.lang = Language.ENG;
    expect(DiatonicAltPattern.fromString("MAjOR")).toBe(DiatonicAltPattern.TRIAD_MAJOR);
});

test('precalc - SEVENTH MAJ7 b5', () => {
    let chromaticPattern = ChromaticPattern.fromRootIntervals(0, 4, 6, 11);
    let diatonicAltPattern = DiatonicAltPattern.fromPatterns(chromaticPattern, DiatonicPattern.SEVENTH);
    let expected = DiatonicAltPattern.SEVENTH_MAJ7_b5;
    expect(diatonicAltPattern).toBe(expected);
});

test('shortName - ENG - SEVENTH MAJ7 b5', () => {
    Settings.lang = Language.ENG;
    let actual = DiatonicAltPattern.SEVENTH_MAJ7_b5.shortName;
    let expected = "Maj7♭5";
    expect(actual).toBe(expected);
});
test('shortName - ENG - SEVENTH SUS4 b9', () => {
    Settings.lang = Language.ENG;
    let actual = DiatonicAltPattern.SEVENTH_SUS4_b9.shortName;
    let expected = "7sus4(♭9)";
    expect(actual).toBe(expected);
});

test('toString() - ENG - SEVENTH MAJ7 b5', () => {
    Settings.lang = Language.ENG;
    let actual = DiatonicAltPattern.SEVENTH_MAJ7_b5.toString();
    let expected = "SEVENTH MAJ7 ♭5";
    expect(actual).toBe(expected);
});

test('toString() - ENG - SEVENTH SUS4 b9', () => {
    Settings.lang = Language.ENG;
    let actual = DiatonicAltPattern.SEVENTH_SUS4_b9.toString();
    let expected = "SEVENTH SUS4 ♭9";
    expect(actual).toBe(expected);
});

test('shortName - ESP - SEVENTH MAJ7 b5', () => {
    Settings.lang = Language.ESP;
    let actual = DiatonicAltPattern.SEVENTH_MAJ7_b5.shortName;
    let expected = "Maj7♭5";
    expect(actual).toBe(expected);
});

test('toString() - ESP - SEVENTH MAJ7 b5', () => {
    Settings.lang = Language.ESP;
    let actual = DiatonicAltPattern.SEVENTH_MAJ7_b5.toString();
    let expected = "SÉPTIMA MAJ7 ♭5";
    expect(actual).toBe(expected);
});

test('toString() - ESP - SEVENTH SUS4 b9', () => {
    Settings.lang = Language.ESP;
    let actual = DiatonicAltPattern.SEVENTH_SUS4_b9.toString();
    let expected = "SÉPTIMA SUS4 ♭9";
    expect(actual).toBe(expected);
});

test('inversionNumber: SEVENTH + inv = 1', () => {
    let pattern = DiatonicAltPattern.SEVENTH.withInv(1);
    let inversionNumber = pattern.inversionNumber;
    let expected = 1;
    expect(inversionNumber).toBe(expected);
});

test('inversionNumber: 13b5#9 + 2 inv = 2', () => {
    let pattern = DiatonicAltPattern.THIRTEENTH_b5a9.withInv(2);
    let inversionNumber = pattern.inversionNumber;

    let expected = 2;
    expect(inversionNumber).toBe(expected);
});