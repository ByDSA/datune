import { IntervalChromatic } from "../interval/IntervalChromatic";
import { Language } from "../lang/Language";
import * as precalc from "../precalc";
import { Settings } from "../settings/Settings";
import { Chromatic } from './Chromatic';
import { Diatonic } from "./Diatonic";
import { DiatonicAlt } from "./DiatonicAlt";
precalc.chromatics();
precalc.diatonics();
precalc.diatonicAlts();
precalc.settings();

test('DiatonicAlt - precalc ', () => {
    expect(DiatonicAlt.C).not.toBe(undefined);
    expect(DiatonicAlt.CC).not.toBe(undefined);
    expect(DiatonicAlt.D).not.toBe(undefined);
    expect(DiatonicAlt.DD).not.toBe(undefined);
    expect(DiatonicAlt.E).not.toBe(undefined);
    expect(DiatonicAlt.F).not.toBe(undefined);
    expect(DiatonicAlt.FF).not.toBe(undefined);
    expect(DiatonicAlt.G).not.toBe(undefined);
    expect(DiatonicAlt.GG).not.toBe(undefined);
    expect(DiatonicAlt.A).not.toBe(undefined);
    expect(DiatonicAlt.AA).not.toBe(undefined);
    expect(DiatonicAlt.B).not.toBe(undefined);
});

test('DiatonicAlt - precalc: alts ', () => {
    expect(DiatonicAlt.Cbb.alts).toBe(-2);
    expect(DiatonicAlt.Cb.alts).toBe(-1);
    expect(DiatonicAlt.C.alts).toBe(0);
    expect(DiatonicAlt.BBB.alts).toBe(2);
});

test('DiatonicAlt - precalc immutables: reassign DiatonicAlt.C', () => {
    const t = () => {
        DiatonicAlt.C = DiatonicAlt.D;
    };
    expect(t).toThrow(TypeError);
});

test('DiatonicAlt - fromChromatic: without diatonic', () => {
    expect(DiatonicAlt.fromChromatic(Chromatic.C)).toBe(DiatonicAlt.C);
    expect(DiatonicAlt.fromChromatic(Chromatic.CC)).toBe(DiatonicAlt.CC);
    expect(DiatonicAlt.fromChromatic(Chromatic.D)).toBe(DiatonicAlt.D);
    expect(DiatonicAlt.fromChromatic(Chromatic.DD)).toBe(DiatonicAlt.DD);
    expect(DiatonicAlt.fromChromatic(Chromatic.E)).toBe(DiatonicAlt.E);
    expect(DiatonicAlt.fromChromatic(Chromatic.F)).toBe(DiatonicAlt.F);
    expect(DiatonicAlt.fromChromatic(Chromatic.FF)).toBe(DiatonicAlt.FF);
    expect(DiatonicAlt.fromChromatic(Chromatic.G)).toBe(DiatonicAlt.G);
    expect(DiatonicAlt.fromChromatic(Chromatic.GG)).toBe(DiatonicAlt.GG);
    expect(DiatonicAlt.fromChromatic(Chromatic.A)).toBe(DiatonicAlt.A);
    expect(DiatonicAlt.fromChromatic(Chromatic.AA)).toBe(DiatonicAlt.AA);
    expect(DiatonicAlt.fromChromatic(Chromatic.B)).toBe(DiatonicAlt.B);
});

test('DiatonicAlt - fromChromatic: with diatonic', () => {
    expect(DiatonicAlt.fromChromatic(Chromatic.C, Diatonic.B)).toBe(DiatonicAlt.BB);
    expect(DiatonicAlt.fromChromatic(Chromatic.DD, Diatonic.E)).toBe(DiatonicAlt.Eb);
    expect(DiatonicAlt.fromChromatic(Chromatic.GG, Diatonic.A)).toBe(DiatonicAlt.Ab);
    expect(DiatonicAlt.fromChromatic(Chromatic.AA, Diatonic.B)).toBe(DiatonicAlt.Bb);
    expect(DiatonicAlt.fromChromatic(Chromatic.CC, Diatonic.B)).toBe(DiatonicAlt.BBB);
    expect(DiatonicAlt.fromChromatic(Chromatic.AA, Diatonic.C)).toBe(DiatonicAlt.Cbb);
});

test('DiatonicAlt - toString - ENG', () => {
    Settings.lang = Language.ENG;
    expect(DiatonicAlt.BB.toString()).toBe("B♯");
    expect(DiatonicAlt.Eb.toString()).toBe("E♭");
    expect(DiatonicAlt.Ab.toString()).toBe("A♭");
    expect(DiatonicAlt.Bb.toString()).toBe("B♭");
    expect(DiatonicAlt.BBB.toString()).toBe("B♯♯");
});

test('Chromatic - toString() - ESP', () => {
    Settings.lang = Language.ESP;
    expect(DiatonicAlt.BB.toString()).toBe("Si♯");
    expect(DiatonicAlt.Eb.toString()).toBe("Mi♭");
    expect(DiatonicAlt.Ab.toString()).toBe("La♭");
    expect(DiatonicAlt.Bb.toString()).toBe("Si♭");
    expect(DiatonicAlt.BBB.toString()).toBe("Si♯♯");
});

test('Chromatic - getAdd: minor second', () => {
    let chromatic = Chromatic.C.getAdd(IntervalChromatic.MINOR_SECOND);
    let expected = Chromatic.CC;
    expect(chromatic).toBe(expected);
});

test('Chromatic - getSub: minor second', () => {
    let chromatic = Chromatic.C.getSub(IntervalChromatic.MINOR_SECOND);
    let expected = Chromatic.B;
    expect(chromatic).toBe(expected);
});

test('Chromatic - getShift: -27', () => {
    let chromatic = Chromatic.C.getShift(-27);
    let expected = Chromatic.A;
    expect(chromatic).toBe(expected);
});