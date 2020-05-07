import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import * as precalc from "../../precalc";
import { PatternChord } from '../pattern/PatternChord';
import { DiatonicAltChord } from './DiatonicAltChord';
precalc.chromatics();
precalc.chromaticPatterns();
precalc.diatonicPatterns();
precalc.diatonicAltPatterns();
precalc.diatonics();
precalc.diatonicAlts();
precalc.intervalDiatonicAlts();
precalc.diatonicAltChords();
precalc.settings();

test('DiatonicAltChord - from: get from ImmutableCache', () => {
    let diatonicAltChord = DiatonicAltChord.from(
        [
            DiatonicAlt.C,
            DiatonicAlt.E,
            DiatonicAlt.G,
            DiatonicAlt.Bb,
        ]);

    let expected = DiatonicAltChord.C7;
    expect(diatonicAltChord).toBe(expected);
});

test('DiatonicAltChord - fromRootPattern - get from ImmutableCache: C7', () => {
    let diatonicAltChord = DiatonicAltChord.fromRootPattern(DiatonicAlt.C, DiatonicAltPattern.SEVENTH);

    let expected = DiatonicAltChord.C7;
    expect(diatonicAltChord).toBe(expected);
});

test('DiatonicAltChord - fromRootPattern - get from ImmutableCache: Am', () => {
    let diatonicAltChord = DiatonicAltChord.fromRootPattern(DiatonicAlt.A, DiatonicAltPattern.TRIAD_MINOR);

    let expected = DiatonicAltChord.Am;
    expect(diatonicAltChord).toBe(expected);
});

test('DiatonicAltChord - fromRootPattern - get from ImmutableCache: CMaj7', () => {
    let diatonicAltChord = DiatonicAltChord.fromRootPattern(DiatonicAlt.C, DiatonicAltPattern.SEVENTH_MAJ7);

    let expected = DiatonicAltChord.CMaj7;
    expect(diatonicAltChord).toBe(expected);
});

test('DiatonicAltChord - toString: C7', () => {
    let str = DiatonicAltChord.C7.toString();

    let expected = "C7";
    expect(str).toBe(expected);
});

test('DiatonicAltChord - toString: B##7', () => {
    let str = DiatonicAltChord.fromRootPattern(
        DiatonicAlt.BBB,
        DiatonicAltPattern.SEVENTH).toString();

    let expected = DiatonicAlt.BBB.toString() + "7";
    expect(str).toBe(expected);
});

test('DiatonicAltChord - toString: CMaj7', () => {
    let str = DiatonicAltChord.CMaj7.toString();
    expect(str).toBe("CMaj7");
});

test('DiatonicAltChord - toString: CmMaj7', () => {
    let str = DiatonicAltChord.CmMaj7.toString();
    expect(str).toBe("CmMaj7");
});

test('DiatonicAltChord - precalc: CMaj7', () => {
    let chord = DiatonicAltChord.CMaj7;
    expect(chord.length).toBe(4);
    expect(chord.rootIndex).toBe(0);
    expect(chord.notes).toStrictEqual([
        DiatonicAlt.C,
        DiatonicAlt.E,
        DiatonicAlt.G,
        DiatonicAlt.B,
    ]);
});

test('DiatonicAltChord - precalc: CmMaj7', () => {
    let chord = DiatonicAltChord.CmMaj7;
    expect(chord.length).toBe(4);
    expect(chord.rootIndex).toBe(0);
    expect(chord.notes).toStrictEqual([
        DiatonicAlt.C,
        DiatonicAlt.Eb,
        DiatonicAlt.G,
        DiatonicAlt.B,
    ]);
});


test('C7 = C E G Bb', () => {
    let chord = DiatonicAltChord.C7;

    expect(chord.notes[0]).toBe(DiatonicAlt.C);
    expect(chord.notes[1]).toBe(DiatonicAlt.E);
    expect(chord.notes[2]).toBe(DiatonicAlt.G);
    expect(chord.notes[3]).toBe(DiatonicAlt.Bb);
});

test('DiatonicAltChord - toString: C + inv = C/E', () => {
    let str = DiatonicAltChord.C.getInv(1).toString();

    let expected = "C/E";
    expect(str).toBe(expected);
});

test('DiatonicAltChord - toString: C + 2inv = C/E', () => {
    let str = DiatonicAltChord.C.getInv(2).toString();

    let expected = "C/G";
    expect(str).toBe(expected);
});

test('DiatonicAltChord - toString: C + 3inv = C', () => {
    let str = DiatonicAltChord.C.getInv(3).toString();

    let expected = "C";
    expect(str).toBe(expected);
});

test('DiatonicAltChord - toString: C7 + inv = C7/E', () => {
    let str = DiatonicAltChord.C7.getInv(1).toString();

    let expected = "C7/E";
    expect(str).toBe(expected);
});

test('DiatonicAltChord - toString: C13b5#9/Gb', () => {
    let pattern = DiatonicAltPattern.THIRTEENTH_b5a9;
    let baseChord = PatternChord.from(DiatonicAlt.C, pattern);
    let chord: DiatonicAltChord = <DiatonicAltChord>baseChord.chord;
    let str = chord.getInv(2).toString();

    let expected = "C13♭5♯9/G♭";
    expect(str).toBe(expected);
});

test('DiatonicAltChord - getInv: C7 + inv = C7/E', () => {
    let diatonicAltChord = DiatonicAltChord.C7.getInv();

    let expected = DiatonicAlt.C;
    expect(diatonicAltChord.root).toBe(expected);
    expect(diatonicAltChord.notes).toStrictEqual([
        DiatonicAlt.E,
        DiatonicAlt.G,
        DiatonicAlt.Bb,
        DiatonicAlt.C
    ]);
});

test('DiatonicAltChord - getInv: C7 + 2inv = C7/G', () => {
    let diatonicAltChord = DiatonicAltChord.C7.getInv(2);

    expect(diatonicAltChord.root).toBe(DiatonicAlt.C);
    expect(diatonicAltChord.notes).toStrictEqual([
        DiatonicAlt.G,
        DiatonicAlt.Bb,
        DiatonicAlt.C,
        DiatonicAlt.E
    ]);
});

test('DiatonicAltChord - getInv: C7 + 4 inv', () => {
    let diatonicAltChord = DiatonicAltChord.C7.getInv(4);

    let expected = DiatonicAltChord.C7;
    expect(diatonicAltChord).toBe(expected);
});


test('DiatonicAltChord - getInv: C7 + 1 inv + 1 inv', () => {
    let diatonicAltChord = DiatonicAltChord.C7.getInv().getInv();

    expect(diatonicAltChord.root).toBe(DiatonicAlt.C);
    expect(diatonicAltChord.notes).toStrictEqual([
        DiatonicAlt.G,
        DiatonicAlt.Bb,
        DiatonicAlt.C,
        DiatonicAlt.E
    ]);
});