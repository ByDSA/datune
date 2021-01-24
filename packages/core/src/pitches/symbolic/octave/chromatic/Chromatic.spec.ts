import { Language, Settings } from '../../../../config';
import { Chromatic } from './Chromatic';

describe("sets", () => {
    it("number", () => {
        expect(Chromatic.NUMBER).toBe(12);
    })

    it("all length=12", () => {
        let all = Chromatic.all;
        expect(all.length).toBe(12);
    })

    describe("values", () => {
        it('not undefined ', () => {
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

        it('instanceof', () => {
            expect(Chromatic.C instanceof Chromatic).toBeTruthy();
            expect(Chromatic.CC instanceof Chromatic).toBeTruthy();
            expect(Chromatic.D instanceof Chromatic).toBeTruthy();
            expect(Chromatic.DD instanceof Chromatic).toBeTruthy();
            expect(Chromatic.E instanceof Chromatic).toBeTruthy();
            expect(Chromatic.F instanceof Chromatic).toBeTruthy();
            expect(Chromatic.FF instanceof Chromatic).toBeTruthy();
            expect(Chromatic.G instanceof Chromatic).toBeTruthy();
            expect(Chromatic.GG instanceof Chromatic).toBeTruthy();
            expect(Chromatic.A instanceof Chromatic).toBeTruthy();
            expect(Chromatic.AA instanceof Chromatic).toBeTruthy();
            expect(Chromatic.B instanceof Chromatic).toBeTruthy();
        });

        it('all values', () => {
            let notes: Chromatic[] = [
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
            const all = Chromatic.all;
            for (const chromatic of notes)
                expect(all).toContain(chromatic);
        })

        it('error: reassign Chromatic.C', () => {
            const t = () => {
                (<any>Chromatic).C = Chromatic.D;
            };
            expect(t).toThrow(TypeError);
        });
    })
})

describe("building", () => {
    describe("fromInt", () => {
        it('0 to 11 ', () => {
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

        it('< 0', () => {
            expect(Chromatic.fromInt(-1)).toBe(Chromatic.B);
            expect(Chromatic.fromInt(-12)).toBe(Chromatic.C);
        });

        it('> 11', () => {
            expect(Chromatic.fromInt(12)).toBe(Chromatic.C);
            expect(Chromatic.fromInt(25)).toBe(Chromatic.CC);
        });
    })

    describe("fromString", () => {
        describe("ESP", () => {
            it('With #: La#', () => {
                Settings.lang = Language.ESP;
                expect(Chromatic.fromString("La#")).toBe(Chromatic.AA);
            });

            it('With outer spaces: La#', () => {
                Settings.lang = Language.ESP;
                expect(Chromatic.fromString("   La#    ")).toBe(Chromatic.AA);
            });

            it('With inner spaces: La#', () => {
                Settings.lang = Language.ESP;
                expect(Chromatic.fromString("   L a #    ")).toBe(Chromatic.AA);
            });

            it('With b: Lab (undefined)', () => {
                Settings.lang = Language.ESP;
                let chromatic = Chromatic.fromString("Lab");
                expect(chromatic).toBeNull();
            });

            it('Another language: C (undefined)', () => {
                Settings.lang = Language.ESP;
                let chromatic = Chromatic.fromString("C");
                expect(chromatic).toBeNull();
            });
        })

        describe("ENG", () => {
            it('B', () => {
                Settings.lang = Language.ENG;
                expect(Chromatic.fromString("B")).toBe(Chromatic.B);
            });

            it('With #: A#', () => {
                Settings.lang = Language.ENG;
                expect(Chromatic.fromString("A#")).toBe(Chromatic.AA);
            });

            it('With spaces at start and end: A#', () => {
                Settings.lang = Language.ENG;
                expect(Chromatic.fromString("   A#    ")).toBe(Chromatic.AA);
            });

            it('With spaces in the middle: A#', () => {
                Settings.lang = Language.ENG;
                expect(Chromatic.fromString("   A #    ")).toBe(Chromatic.AA);
            });

            it('With b: Ab (error)', () => {
                Settings.lang = Language.ENG;
                const chromatic = Chromatic.fromString("Ab");
                expect(chromatic).toBeNull();
            });

            it('Another language: Do (error)', () => {
                Settings.lang = Language.ENG;
                const chromatic = Chromatic.fromString("Do");
                expect(chromatic).toBeNull();
            });
        })
    })

    it('valueOf()', () => {
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
})

describe("immutable methods", () => {
    describe("withShift", () => {
        it('C+1', () => {
            let chromatic = Chromatic.C.withShift(1);
            let expected = Chromatic.CC;
            expect(chromatic).toBe(expected);
        });

        it('C+2', () => {
            let chromatic = Chromatic.C.withShift(2);
            let expected = Chromatic.D;
            expect(chromatic).toBe(expected);
        });

        it('C-1', () => {
            let chromatic = Chromatic.C.withShift(-1);
            let expected = Chromatic.B;
            expect(chromatic).toBe(expected);
        });

        it('C+14', () => {
            let chromatic = Chromatic.C.withShift(14);
            let expected = Chromatic.D;
            expect(chromatic).toBe(expected);
        });

        it('C-27', () => {
            let chromatic = Chromatic.C.withShift(-27);
            let expected = Chromatic.A;
            expect(chromatic).toBe(expected);
        });
    })
})

describe("sortable", () => {
    describe("compareTo", () => {
        it("C = C", () => {
            const val = Chromatic.C.compareTo(Chromatic.C);
            expect(val).toBe(0);
        })

        it("C < D", () => {
            const val = Chromatic.C.compareTo(Chromatic.D);
            expect(val).toBe(-1);
        })

        it("D > C", () => {
            const val = Chromatic.D.compareTo(Chromatic.C);
            expect(val).toBe(1);
        })

        it("C < B", () => {
            const val = Chromatic.C.compareTo(Chromatic.B);
            expect(val).toBe(-1);
        })

        it("B > C", () => {
            const val = Chromatic.B.compareTo(Chromatic.C);
            expect(val).toBe(1);
        })
    })
})

describe("object methods", () => {
    describe("toString", () => {
        it('ENG', () => {
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

        it('ESP', () => {
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
    })
})