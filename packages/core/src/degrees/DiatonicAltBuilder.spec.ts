import * as init from "../initializer";
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

test('from Chromatic and Diatonic', () => {
    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.C)
        .setDiatonic(Diatonic.B)
        .build()).toBe(DiatonicAlt.BB);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.DD)
        .setDiatonic(Diatonic.E)
        .build()).toBe(DiatonicAlt.Eb);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.GG)
        .setDiatonic(Diatonic.A)
        .build()).toBe(DiatonicAlt.Ab);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.AA)
        .setDiatonic(Diatonic.B)
        .build()).toBe(DiatonicAlt.Bb);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.CC)
        .setDiatonic(Diatonic.B)
        .build()).toBe(DiatonicAlt.BBB);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.AA)
        .setDiatonic(Diatonic.C)
        .build()).toBe(DiatonicAlt.Cbb);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.C)
        .setDiatonic(Diatonic.C)
        .build()).toBe(DiatonicAlt.C);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.G)
        .setDiatonic(Diatonic.G)
        .build()).toBe(DiatonicAlt.G);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.E)
        .setDiatonic(Diatonic.F)
        .build()).toBe(DiatonicAlt.Fb);

    expect(DiatonicAlt.builder()
        .setChromatic(Chromatic.F)
        .setDiatonic(Diatonic.E)
        .build()).toBe(DiatonicAlt.EE);
});

describe("from Chromatic and DiatonicAlt list", () => {
    it("Chromatic DD in Tonality Cm = Eb", () => {
        const list = Tonality.Cm.notes;
        const diatonicAlt = DiatonicAlt.builder()
            .setChromatic(Chromatic.DD)
            .setDiatonicAltList(list)
            .build();

        expect(diatonicAlt).toBe(DiatonicAlt.Eb);
    })
})