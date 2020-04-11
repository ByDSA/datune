import * as precalc from "../precalc";
import { Chromatic } from './Chromatic';
import { DiatonicAlt } from "./DiatonicAlt";
import { Diatonic } from "./Diatonic";
import { Settings } from "../settings/Settings";
import { Language } from "../lang/Language";
import { IntervalChromatic } from "../interval/IntervalChromatic";
precalc.chromatics();
precalc.diatonics();
precalc.diatonicAlts();

test('Chromatic - precalc ', () => {
    expect(Chromatic.C).not.toBe(undefined);
    expect(Chromatic.CC).not.toBe(undefined);
    expect(Chromatic.D).not.toBe(undefined);
    expect(Chromatic.DD).not.toBe(undefined);
    expect(Chromatic.E).not.toBe(undefined);
    expect(Chromatic.F).not.toBe(undefined);
    expect(Chromatic.FF).not.toBe(undefined);
    expect(Chromatic.G).not.toBe(undefined);
    expect(Chromatic.GG).not.toBe(undefined);
    expect(Chromatic.A).not.toBe(undefined);
    expect(Chromatic.AA).not.toBe(undefined);
    expect(Chromatic.B).not.toBe(undefined);
});

test('Chromatic - precalc immutables: reassign Chromatic.C', () => {
    const t = () => {
        (<any>Chromatic).C = Chromatic.D;
    };
    expect(t).toThrow(TypeError);
});

test('Chromatic - precalc immutables: reassign NUMBER', () => {
    const t = () => {
        (<any>Chromatic).NUMBER = 99;
    };
    expect(t).toThrow(TypeError);
});

test('Chromatic - precalc immutables: reassign intValue', () => {
    const t = () => {
        (<any>Chromatic.C)._intValue = 99;
    };
    expect(t).toThrow(TypeError);
});

test('Chromatic - precalc immutables: new property', () => {
    const t = () => {
        (<any>Chromatic.C).aa = 99;
    };
    expect(t).toThrow(TypeError);
});

test('Chromatic - intValues ', () => {
    expect(Chromatic.C.intValue).toBe(0);
    expect(Chromatic.CC.intValue).toBe(1);
    expect(Chromatic.D.intValue).toBe(2);
    expect(Chromatic.DD.intValue).toBe(3);
    expect(Chromatic.E.intValue).toBe(4);
    expect(Chromatic.F.intValue).toBe(5);
    expect(Chromatic.FF.intValue).toBe(6);
    expect(Chromatic.G.intValue).toBe(7);
    expect(Chromatic.GG.intValue).toBe(8);
    expect(Chromatic.A.intValue).toBe(9);
    expect(Chromatic.AA.intValue).toBe(10);
    expect(Chromatic.B.intValue).toBe(11);
});

test('Chromatic - fromInt: 0-11 ', () => {
    expect(Chromatic.fromInt(0)).toBe(Chromatic.C);
    expect(Chromatic.fromInt(1)).toBe(Chromatic.CC);
    expect(Chromatic.fromInt(2)).toBe(Chromatic.D);
    expect(Chromatic.fromInt(3)).toBe(Chromatic.DD);
    expect(Chromatic.fromInt(4)).toBe(Chromatic.E);
    expect(Chromatic.fromInt(5)).toBe(Chromatic.F);
    expect(Chromatic.fromInt(6)).toBe(Chromatic.FF);
    expect(Chromatic.fromInt(7)).toBe(Chromatic.G);
    expect(Chromatic.fromInt(8)).toBe(Chromatic.GG);
    expect(Chromatic.fromInt(9)).toBe(Chromatic.A);
    expect(Chromatic.fromInt(10)).toBe(Chromatic.AA);
    expect(Chromatic.fromInt(11)).toBe(Chromatic.B);
});

test('Chromatic - fromInt: negative', () => {
    expect(Chromatic.fromInt(-1)).toBe(Chromatic.B);
    expect(Chromatic.fromInt(-12)).toBe(Chromatic.C);
});

test('Chromatic - fromInt: above 11', () => {
    expect(Chromatic.fromInt(12)).toBe(Chromatic.C);
    expect(Chromatic.fromInt(25)).toBe(Chromatic.CC);
});

test('Chromatic - fromDiatonic: B ', () => {
    expect(Chromatic.fromDiatonic(Diatonic.B)).toBe(Chromatic.B);
});

test('Chromatic - fromDiatonic: C ', () => {
    expect(Chromatic.fromDiatonic(Diatonic.C)).toBe(Chromatic.C);
});

test('Chromatic - fromDiatonic: A ', () => {
    expect(Chromatic.fromDiatonic(Diatonic.A)).toBe(Chromatic.A);
});

test('Chromatic - fromDiatonicAlt: BBB ', () => {
    expect(Chromatic.fromDiatonicAlt(DiatonicAlt.BBB)).toBe(Chromatic.CC);
});

test('Chromatic - fromDiatonicAlt: BB ', () => {
    expect(Chromatic.fromDiatonicAlt(DiatonicAlt.BB)).toBe(Chromatic.C);
});

test('Chromatic - fromDiatonicAlt: C ', () => {
    expect(Chromatic.fromDiatonicAlt(DiatonicAlt.C)).toBe(Chromatic.C);
});

test('Chromatic - fromDiatonicAlt: Cb ', () => {
    expect(Chromatic.fromDiatonicAlt(DiatonicAlt.Cb)).toBe(Chromatic.B);
});

test('Chromatic - fromDiatonicAlt: Cbb ', () => {
    expect(Chromatic.fromDiatonicAlt(DiatonicAlt.Cbb)).toBe(Chromatic.AA);
});

test('Chromatic - toString() - ENG', () => {
    Settings.lang = Language.ENG;
    expect(Chromatic.C.toString()).toBe("C");
    expect(Chromatic.CC.toString()).toBe("C♯");
    expect(Chromatic.D.toString()).toBe("D");
    expect(Chromatic.DD.toString()).toBe("D♯");
    expect(Chromatic.E.toString()).toBe("E");
    expect(Chromatic.F.toString()).toBe("F");
    expect(Chromatic.FF.toString()).toBe("F♯");
    expect(Chromatic.G.toString()).toBe("G");
    expect(Chromatic.GG.toString()).toBe("G♯");
    expect(Chromatic.A.toString()).toBe("A");
    expect(Chromatic.AA.toString()).toBe("A♯");
    expect(Chromatic.B.toString()).toBe("B");
});

test('Chromatic - toString() - ESP', () => {
    Settings.lang = Language.ESP;
    expect(Chromatic.C.toString()).toBe("Do");
    expect(Chromatic.CC.toString()).toBe("Do♯");
    expect(Chromatic.D.toString()).toBe("Re");
    expect(Chromatic.DD.toString()).toBe("Re♯");
    expect(Chromatic.E.toString()).toBe("Mi");
    expect(Chromatic.F.toString()).toBe("Fa");
    expect(Chromatic.FF.toString()).toBe("Fa♯");
    expect(Chromatic.G.toString()).toBe("Sol");
    expect(Chromatic.GG.toString()).toBe("Sol♯");
    expect(Chromatic.A.toString()).toBe("La");
    expect(Chromatic.AA.toString()).toBe("La♯");
    expect(Chromatic.B.toString()).toBe("Si");
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