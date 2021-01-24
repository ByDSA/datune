import { Language, Settings } from "config";
import { IntervalDiatonic } from "intervals";
import { Chromatic } from "../chromatic/Chromatic";
import { Diatonic } from "./Diatonic";

describe("sets", () => {
    it("number", () => {
        expect(Diatonic.NUMBER).toBe(7);
    })

    describe("values", () => {
        it('immutables', () => {
            expect(Diatonic.C === Diatonic.C).toBeTruthy();
            expect(Diatonic.C).toBe(Diatonic.C);
            expect(Diatonic.D).toBe(Diatonic.D);
            expect(Diatonic.E).toBe(Diatonic.E);
            expect(Diatonic.F).toBe(Diatonic.F);
            expect(Diatonic.G).toBe(Diatonic.G);
            expect(Diatonic.A).toBe(Diatonic.A);
            expect(Diatonic.B).toBe(Diatonic.B);
        });

        it('not undefined ', () => {
            expect(Diatonic.C).not.toBe(undefined);
            expect(Diatonic.D).not.toBe(undefined);
            expect(Diatonic.E).not.toBe(undefined);
            expect(Diatonic.F).not.toBe(undefined);
            expect(Diatonic.G).not.toBe(undefined);
            expect(Diatonic.A).not.toBe(undefined);
            expect(Diatonic.B).not.toBe(undefined);
        });

        it("all length=12", () => {
            let all = Diatonic.all;
            expect(all.length).toBe(7);
        })

        it('all values', () => {
            let diatonics: Diatonic[] = [
                Diatonic.C,
                Diatonic.D,
                Diatonic.E,
                Diatonic.F,
                Diatonic.G,
                Diatonic.A,
                Diatonic.B
            ];
            const all = Diatonic.all;
            for (const diatonic of diatonics)
                expect(all).toContain(diatonic);
        })

        it('error: reassign Diatonic.C', () => {
            const t = () => {
                (<any>Diatonic).C = Diatonic.D;
            };
            expect(t).toThrow(TypeError);
        });
    })
})

describe("building", () => {
    describe("fromInt", () => {
        it('0 to 6 ', () => {
            expect(Diatonic.fromInt(0)).toBe(Diatonic.C);
            expect(Diatonic.fromInt(1)).toBe(Diatonic.D);
            expect(Diatonic.fromInt(2)).toBe(Diatonic.E);
            expect(Diatonic.fromInt(3)).toBe(Diatonic.F);
            expect(Diatonic.fromInt(4)).toBe(Diatonic.G);
            expect(Diatonic.fromInt(5)).toBe(Diatonic.A);
            expect(Diatonic.fromInt(6)).toBe(Diatonic.B);
        });

        it('< 0', () => {
            expect(Diatonic.fromInt(-1)).toBe(Diatonic.B);
            expect(Diatonic.fromInt(-7)).toBe(Diatonic.C);
        });

        it('> 6', () => {
            expect(Diatonic.fromInt(7)).toBe(Diatonic.C);
            expect(Diatonic.fromInt(15)).toBe(Diatonic.D);
        });
    })

    describe("fromString", () => {
        describe("ESP", () => {
            test('Do', () => {
                Settings.lang = Language.ESP;
                expect(Diatonic.fromString("Do")).toBe(Diatonic.C);
            });

            test('With #: La# (null)', () => {
                Settings.lang = Language.ESP;
                let diatonic = Diatonic.fromString("La#");
                expect(diatonic).toBeNull();
            });

            test('With outer spaces: La', () => {
                Settings.lang = Language.ESP;
                expect(Diatonic.fromString("   La    ")).toBe(Diatonic.A);
            });

            test('With inner spaces: La', () => {
                Settings.lang = Language.ESP;
                expect(Diatonic.fromString("   L a     ")).toBe(Diatonic.A);
            });

            test('With b: Lab (null)', () => {
                Settings.lang = Language.ESP;
                let diatonic = Diatonic.fromString("Lab");
                expect(diatonic).toBeNull();
            });

            test('Another language: C (null)', () => {
                Settings.lang = Language.ESP;
                let diatonic = Diatonic.fromString("C");
                expect(diatonic).toBeNull();
            });

        })

        describe("ENG", () => {
            test('ENG - C', () => {
                Settings.lang = Language.ENG;
                expect(Diatonic.fromString("C")).toBe(Diatonic.C);
            });

            test('With outer spaces: A', () => {
                Settings.lang = Language.ENG;
                expect(Diatonic.fromString("   A    ")).toBe(Diatonic.A);
            });

            test('With inner spaces: A)', () => {
                Settings.lang = Language.ENG;
                expect(Diatonic.fromString("   A     ")).toBe(Diatonic.A);
            });

            test('With #: A# (null)', () => {
                Settings.lang = Language.ENG;
                let diatonic = Diatonic.fromString("A#");
                expect(diatonic).toBeNull();
            });

            test('With b: Ab (null)', () => {
                Settings.lang = Language.ENG;
                let diatonic = Diatonic.fromString("Ab");
                expect(diatonic).toBeNull();
            });

            test('Do', () => {
                Settings.lang = Language.ENG;
                let diatonic = Diatonic.fromString("Do");
                expect(diatonic).toBeNull();
            });
        })
    })

    it('valueOf()', () => {
        expect(Diatonic.C.valueOf()).toBe(0);
        expect(Diatonic.D.valueOf()).toBe(1);
        expect(Diatonic.E.valueOf()).toBe(2);
        expect(Diatonic.F.valueOf()).toBe(3);
        expect(Diatonic.G.valueOf()).toBe(4);
        expect(Diatonic.A.valueOf()).toBe(5);
        expect(Diatonic.B.valueOf()).toBe(6);
    });
})

describe("immutable methods", () => {
    describe("withAdd", () => {
        it('C+SECOND', () => {
            let diatonic = Diatonic.C.withAdd(IntervalDiatonic.SECOND);
            let expected = Diatonic.D;
            expect(diatonic).toBe(expected);
        });

        it('C+NINTH', () => {
            let diatonic = Diatonic.C.withAdd(IntervalDiatonic.NINTH);
            let expected = Diatonic.D;
            expect(diatonic).toBe(expected);
        });
    })

    describe("withSub", () => {
        it('C-SECOND', () => {
            let diatonic = Diatonic.C.withSub(IntervalDiatonic.SECOND);
            let expected = Diatonic.B;
            expect(diatonic).toBe(expected);
        });

        it('C-27', () => {
            let diatonic = Diatonic.C.withSub(IntervalDiatonic.TENTH);
            let expected = Diatonic.A;
            expect(diatonic).toBe(expected);
        });
    })

    describe("chromatic", () => {
        test('B ', () => {
            expect(Diatonic.B.chromatic).toBe(Chromatic.B);
        });

        test('C ', () => {
            expect(Diatonic.C.chromatic).toBe(Chromatic.C);
        });

        test('A ', () => {
            expect(Diatonic.A.chromatic).toBe(Chromatic.A);
        });
    })
})

describe("sortable", () => {
    describe("compareTo", () => {
        it("C = C", () => {
            const val = Diatonic.C.compareTo(Diatonic.C);
            expect(val).toBe(0);
        })

        it("C < D", () => {
            const val = Diatonic.C.compareTo(Diatonic.D);
            expect(val).toBe(-1);
        })

        it("D > C", () => {
            const val = Diatonic.D.compareTo(Diatonic.C);
            expect(val).toBe(1);
        })

        it("C < B", () => {
            const val = Diatonic.C.compareTo(Diatonic.B);
            expect(val).toBe(-1);
        })

        it("B > C", () => {
            const val = Diatonic.B.compareTo(Diatonic.C);
            expect(val).toBe(1);
        })
    })
})

describe("object methods", () => {
    describe("toString", () => {
        it('ENG', () => {
            Settings.lang = Language.ENG;
            expect(Diatonic.C.toString()).toBe("C");
            expect(Diatonic.D.toString()).toBe("D");
            expect(Diatonic.E.toString()).toBe("E");
            expect(Diatonic.F.toString()).toBe("F");
            expect(Diatonic.G.toString()).toBe("G");
            expect(Diatonic.A.toString()).toBe("A");
            expect(Diatonic.B.toString()).toBe("B");
        });

        it('ESP', () => {
            Settings.lang = Language.ESP;
            expect(Diatonic.C.toString()).toBe("Do");
            expect(Diatonic.D.toString()).toBe("Re");
            expect(Diatonic.E.toString()).toBe("Mi");
            expect(Diatonic.F.toString()).toBe("Fa");
            expect(Diatonic.G.toString()).toBe("Sol");
            expect(Diatonic.A.toString()).toBe("La");
            expect(Diatonic.B.toString()).toBe("Si");
        });
    })
})