import { Diatonic } from "../../../diatonic/Diatonic";
import { Chromatic } from '../../../chromatic/Chromatic';
import { DiatonicAlt } from "../../DiatonicAlt";
import { TonalityAlt } from "../../../../../../tonalities";

test('from Chromatic and Diatonic', () => {
    expect(DiatonicAlt.builder()
        .setNote(Chromatic.C)
        .setDiatonic(Diatonic.B)
        .build()).toBe(DiatonicAlt.BB);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.DD)
        .setDiatonic(Diatonic.E)
        .build()).toBe(DiatonicAlt.Eb);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.GG)
        .setDiatonic(Diatonic.A)
        .build()).toBe(DiatonicAlt.Ab);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.AA)
        .setDiatonic(Diatonic.B)
        .build()).toBe(DiatonicAlt.Bb);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.CC)
        .setDiatonic(Diatonic.B)
        .build()).toBe(DiatonicAlt.BBB);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.AA)
        .setDiatonic(Diatonic.C)
        .build()).toBe(DiatonicAlt.Cbb);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.C)
        .setDiatonic(Diatonic.C)
        .build()).toBe(DiatonicAlt.C);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.G)
        .setDiatonic(Diatonic.G)
        .build()).toBe(DiatonicAlt.G);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.E)
        .setDiatonic(Diatonic.F)
        .build()).toBe(DiatonicAlt.Fb);

    expect(DiatonicAlt.builder()
        .setNote(Chromatic.F)
        .setDiatonic(Diatonic.E)
        .build()).toBe(DiatonicAlt.EE);
});

describe("from Chromatic and DiatonicAlt list", () => {
    it("Chromatic DD in Tonality Cm = Eb", () => {
        const list = TonalityAlt.Cm.notes;
        const diatonicAlt = DiatonicAlt.builder()
            .setNote(Chromatic.DD)
            .setNoteAltList(...list)
            .build();

        expect(diatonicAlt).toBe(DiatonicAlt.Eb);
    })
})