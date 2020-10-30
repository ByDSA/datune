import * as init from "../initializer";
import { Language } from "../lang/Language";
import { Settings } from "../settings/Settings";
import { Chromatic } from './Chromatic';
init.chromatics.default();
init.diatonics.default();
init.diatonicAlts.default();
init.settings.default();

test('precalc not undefined ', () => {
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

test('precalc immutables: reassign Chromatic.C', () => {
    const t = () => {
        Chromatic.C = Chromatic.D;
    };
    expect(t).toThrow(TypeError);
});

test('valueOf() ', () => {
    expect(Chromatic.C.valueOf()).toBe(0);
    expect(Chromatic.CC.valueOf()).toBe(1);
    expect(Chromatic.D.valueOf()).toBe(2);
    expect(Chromatic.DD.valueOf()).toBe(3);
    expect(Chromatic.E.valueOf()).toBe(4);
    expect(Chromatic.F.valueOf()).toBe(5);
    expect(Chromatic.FF.valueOf()).toBe(6);
    expect(Chromatic.G.valueOf()).toBe(7);
    expect(Chromatic.GG.valueOf()).toBe(8);
    expect(Chromatic.A.valueOf()).toBe(9);
    expect(Chromatic.AA.valueOf()).toBe(10);
    expect(Chromatic.B.valueOf()).toBe(11);
});

test('fromInt: 0-11 ', () => {
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

test('fromInt: negative', () => {
    expect(Chromatic.fromInt(-1)).toBe(Chromatic.B);
    expect(Chromatic.fromInt(-12)).toBe(Chromatic.C);
});

test('fromInt: above 11', () => {
    expect(Chromatic.fromInt(12)).toBe(Chromatic.C);
    expect(Chromatic.fromInt(25)).toBe(Chromatic.CC);
});

test('toString() - ENG', () => {
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

test('toString() - ESP', () => {
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

test('withShift: +1', () => {
    let chromatic = Chromatic.C.withShift(1);
    let expected = Chromatic.CC;
    expect(chromatic).toBe(expected);
});

test('withShift: -1', () => {
    let chromatic = Chromatic.C.withShift(-1);
    let expected = Chromatic.B;
    expect(chromatic).toBe(expected);
});

test('withShift: -27', () => {
    let chromatic = Chromatic.C.withShift(-27);
    let expected = Chromatic.A;
    expect(chromatic).toBe(expected);
});

test('fromString - ESP - Do', () => {
    Settings.lang = Language.ESP;
    expect(Chromatic.fromString("Do")).toBe(Chromatic.C);
});

test('fromString - ESP - La#', () => {
    Settings.lang = Language.ESP;
    expect(Chromatic.fromString("La#")).toBe(Chromatic.AA);
});

test('fromString - ESP - La# (spaces)', () => {
    Settings.lang = Language.ESP;
    expect(Chromatic.fromString("   La#    ")).toBe(Chromatic.AA);
});

test('fromString - ESP - La# (spaces middle)', () => {
    Settings.lang = Language.ESP;
    expect(Chromatic.fromString("   L a #    ")).toBe(Chromatic.AA);
});

test('fromString - ESP - Lab', () => {
    Settings.lang = Language.ESP;
    const t = () => {
        Chromatic.fromString("Lab");
    };
    expect(t).toThrow(Error);
});

test('fromString - ESP - C', () => {
    Settings.lang = Language.ESP;
    const t = () => {
        Chromatic.fromString("C");
    };
    expect(t).toThrow(Error);
});

test('fromString - ENG - C', () => {
    Settings.lang = Language.ENG;
    expect(Chromatic.fromString("C")).toBe(Chromatic.C);
});

test('fromString - ENG - La#', () => {
    Settings.lang = Language.ENG;
    expect(Chromatic.fromString("A#")).toBe(Chromatic.AA);
});

test('fromString - ENG - A# (spaces)', () => {
    Settings.lang = Language.ENG;
    expect(Chromatic.fromString("   A#    ")).toBe(Chromatic.AA);
});

test('fromString - ENG - La# (spaces middle)', () => {
    Settings.lang = Language.ENG;
    expect(Chromatic.fromString("   A #    ")).toBe(Chromatic.AA);
});

test('fromString - ENG - Ab', () => {
    Settings.lang = Language.ENG;
    const t = () => {
        Chromatic.fromString("Ab");
    };
    expect(t).toThrow(Error);
});

test('fromString - ENG - Do', () => {
    Settings.lang = Language.ENG;
    const t = () => {
        Chromatic.fromString("Do");
    };
    expect(t).toThrow(Error);
});

test('all values', () => {
    let chromatics: Chromatic[] = [
        Chromatic.C,
        Chromatic.CC,
        Chromatic.D,
        Chromatic.DD,
        Chromatic.E,
        Chromatic.F,
        Chromatic.FF,
        Chromatic.G,
        Chromatic.GG,
        Chromatic.A,
        Chromatic.AA,
        Chromatic.B
    ];
    for (const chromatic of chromatics)
        expect(Chromatic.all()).toContain(chromatic);
    expect(Chromatic.all().length).toBe(Chromatic.NUMBER);
});