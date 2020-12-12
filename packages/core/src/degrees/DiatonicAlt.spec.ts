import * as init from "../initializer";
import { IntervalDiatonicAlt } from "../intervals/IntervalDiatonicAlt";
import { Language } from "../lang/Language";
import { Settings } from "../settings/Settings";
import { Tonality } from "../tonalities/Tonality";
import { Chromatic } from './Chromatic';
import { Diatonic } from "./Diatonic";
import { DiatonicAlt } from "./DiatonicAlt";
init.chromatics.default();
init.diatonics.default();
init.diatonicAlts.default();
init.intervalDiatonicAlts.default();
init.settings.default();
init.tonalities.default();

describe("sets", () => {
    describe("values", () => {
        test('not undefined', () => {
            expect(DiatonicAlt.C).toBeDefined();
            expect(DiatonicAlt.CC).toBeDefined();
            expect(DiatonicAlt.D).toBeDefined();
            expect(DiatonicAlt.DD).toBeDefined();
            expect(DiatonicAlt.E).toBeDefined();
            expect(DiatonicAlt.F).toBeDefined();
            expect(DiatonicAlt.FF).toBeDefined();
            expect(DiatonicAlt.G).toBeDefined();
            expect(DiatonicAlt.GG).toBeDefined();
            expect(DiatonicAlt.A).toBeDefined();
            expect(DiatonicAlt.AA).toBeDefined();
            expect(DiatonicAlt.B).toBeDefined();
        });

        it('alts ', () => {
            expect(DiatonicAlt.Cbb.alts).toBe(-2);
            expect(DiatonicAlt.Cb.alts).toBe(-1);
            expect(DiatonicAlt.C.alts).toBe(0);
            expect(DiatonicAlt.BBB.alts).toBe(2);
        });

        it('reassign DiatonicAlt.C (error)', () => {
            const t = () => {
                DiatonicAlt.C = DiatonicAlt.D;
            };
            expect(t).toThrow(TypeError);
        });
    })
})

describe("building", () => {

    describe("fromChromatic", () => {
        test('fromChromatic', () => {
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
    })

    describe("fromString", () => {

        describe("ESP", () => {
            test('ESP - Do', () => {
                Settings.lang = Language.ESP;
                expect(DiatonicAlt.fromString("Do")).toBe(DiatonicAlt.C);
            });

            test('ESP - La#', () => {
                Settings.lang = Language.ESP;
                expect(DiatonicAlt.fromString("La#")).toBe(DiatonicAlt.AA);
            });

            test('ESP - La# (spaces)', () => {
                Settings.lang = Language.ESP;
                expect(DiatonicAlt.fromString("   La#    ")).toBe(DiatonicAlt.AA);
            });

            test('With inner spaces: La#', () => {
                Settings.lang = Language.ESP;
                expect(DiatonicAlt.fromString("   L a #    ")).toBe(DiatonicAlt.AA);
            });

            test('With b: Lab', () => {
                Settings.lang = Language.ESP;
                expect(DiatonicAlt.fromString("Lab")).toBe(DiatonicAlt.Ab);
            });

            test('Another language: C (undefined)', () => {
                Settings.lang = Language.ESP;
                const diatonicAlt = DiatonicAlt.fromString("C");
                expect(diatonicAlt).toBeUndefined();
            });
        });

        describe("ENG", () => {
            test('C', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("C")).toBe(DiatonicAlt.C);
            });

            test('c (lower)', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("c")).toBe(DiatonicAlt.C);
            });

            test('b (lower)', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("b")).toBe(DiatonicAlt.B);
            });

            test('bb (lower)', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("bb")).toBe(DiatonicAlt.Bb);
            });

            test('bbb (lower)', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("bbb")).toBe(DiatonicAlt.Bbb);
            });

            test('La#', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("A#")).toBe(DiatonicAlt.AA);
            });

            test('A# (spaces)', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("   A#    ")).toBe(DiatonicAlt.AA);
            });

            test('La# (spaces middle)', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("   A #    ")).toBe(DiatonicAlt.AA);
            });

            test('Ab', () => {
                Settings.lang = Language.ENG;
                expect(DiatonicAlt.fromString("Ab")).toBe(DiatonicAlt.Ab);
            });

            test('Do', () => {
                Settings.lang = Language.ENG;
                const diatonicAlt = DiatonicAlt.fromString("Do");
                expect(diatonicAlt).toBeUndefined();
            });
        })
    })
})

describe("immutable methods", () => {
    test('withAdd: minor second', () => {
        let chromatic = DiatonicAlt.C.withAdd(IntervalDiatonicAlt.MINOR_SECOND);
        let expected = DiatonicAlt.Db;
        expect(chromatic).toBe(expected);
    });

    test('withSub: minor second', () => {
        let chromatic = DiatonicAlt.C.withSub(IntervalDiatonicAlt.MINOR_SECOND);
        let expected = DiatonicAlt.B;
        expect(chromatic).toBe(expected);
    });

    describe("chromatic", () => {
        test('BBB ', () => {
            expect(DiatonicAlt.BBB.chromatic).toBe(Chromatic.CC);
        });

        test('BB ', () => {
            expect(DiatonicAlt.BB.chromatic).toBe(Chromatic.C);
        });

        test('C ', () => {
            expect(DiatonicAlt.C.chromatic).toBe(Chromatic.C);
        });

        test('E ', () => {
            expect(DiatonicAlt.E.chromatic).toBe(Chromatic.E);
        });

        test('Cb ', () => {
            expect(DiatonicAlt.Cb.chromatic).toBe(Chromatic.B);
        });

        test('Cbb ', () => {
            expect(DiatonicAlt.Cbb.chromatic).toBe(Chromatic.AA);
        });

        test('Custom Cbbb ', () => {
            expect(DiatonicAlt.from(Diatonic.C, -3).chromatic).toBe(Chromatic.A);
        });

        test('Custom Ebbbb ', () => {
            expect(DiatonicAlt.from(Diatonic.E, -4).chromatic).toBe(Chromatic.C);
        });
    })
})

describe("object methods", () => {

    describe("toString", () => {
        test('toString - ENG', () => {
            Settings.lang = Language.ENG;
            expect(DiatonicAlt.BB.toString()).toBe("B♯");
            expect(DiatonicAlt.Eb.toString()).toBe("E♭");
            expect(DiatonicAlt.Ab.toString()).toBe("A♭");
            expect(DiatonicAlt.Bb.toString()).toBe("B♭");
            expect(DiatonicAlt.BBB.toString()).toBe("B♯♯");
        });

        test('toString() - ESP', () => {
            Settings.lang = Language.ESP;
            expect(DiatonicAlt.BB.toString()).toBe("Si♯");
            expect(DiatonicAlt.Eb.toString()).toBe("Mi♭");
            expect(DiatonicAlt.Ab.toString()).toBe("La♭");
            expect(DiatonicAlt.Bb.toString()).toBe("Si♭");
            expect(DiatonicAlt.BBB.toString()).toBe("Si♯♯");
        });

        test('toString() - ENG - C', () => {
            Settings.lang = Language.ENG;
            let diatonicAlt = DiatonicAlt.C;
            let actual = diatonicAlt.toString();
            let expected = "C";

            expect(actual).toBe(expected);
        });

        test('toString() - ESP - C', () => {
            Settings.lang = Language.ESP;
            let diatonicAlt = DiatonicAlt.C;
            let actual = diatonicAlt.toString();
            let expected = "Do";

            expect(actual).toBe(expected);
        });
    })
})