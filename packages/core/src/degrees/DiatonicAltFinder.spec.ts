import * as init from "../initializer";
import { Chromatic } from './Chromatic';
import { Diatonic } from "./Diatonic";
import { DiatonicAlt } from "./DiatonicAlt";
init.chromatics.default();
init.diatonics.default();
init.diatonicAlts.default();
init.intervalDiatonicAlts.default();
init.settings.default();
init.tonalities.default();

it('from Chromatic and Diatonic', () => {
    expect(DiatonicAlt.finder()
        .setChromatic(Chromatic.C)
        .addDiatonic(Diatonic.B)
        .find()[0]).toBe(DiatonicAlt.BB);

    expect(DiatonicAlt.finder()
        .setChromatic(Chromatic.DD)
        .addDiatonic(Diatonic.E)
        .find()[0]).toBe(DiatonicAlt.Eb);
});

it("diatonic = C: Cbb, Cbb,C, C#, C##", () => {
    const finder = DiatonicAlt.finder()
        .addDiatonic(Diatonic.C);
    const result = finder.find();

    expect(result.length).toBe(5);

    expect(result).toContain(DiatonicAlt.Cbb);
    expect(result).toContain(DiatonicAlt.Cb);
    expect(result).toContain(DiatonicAlt.C);
    expect(result).toContain(DiatonicAlt.CC);
    expect(result).toContain(DiatonicAlt.CCC);
})

it("chromatic = C: B#, C, Dbb", () => {
    const finder = DiatonicAlt.finder()
        .setChromatic(Chromatic.C);
    const result = finder.find();

    expect(result.length).toBe(3);

    expect(result).toContain(DiatonicAlt.BB);
    expect(result).toContain(DiatonicAlt.C);
    expect(result).toContain(DiatonicAlt.Dbb);
})

it("chromatic = C, diatonics = C, D: C, Dbb", () => {
    const finder = DiatonicAlt.finder()
        .setChromatic(Chromatic.C)
        .addDiatonic(Diatonic.C)
        .addDiatonic(Diatonic.D);
    const result = finder.find();

    expect(result.length).toBe(2);

    expect(result).toContain(DiatonicAlt.C);
    expect(result).toContain(DiatonicAlt.Dbb);
})

it("chromatic = C, maxSharp = 3, maxBemol = 1: A###, B#, C", () => {
    const finder = DiatonicAlt.finder()
        .setChromatic(Chromatic.C)
        .setMaxSharps(3)
        .setMaxBemols(1);
    const result = finder.find();

    expect(result.length).toBe(3);

    expect(result).toContain(DiatonicAlt.from(Diatonic.A, 3));
    expect(result).toContain(DiatonicAlt.BB);
    expect(result).toContain(DiatonicAlt.C);
})