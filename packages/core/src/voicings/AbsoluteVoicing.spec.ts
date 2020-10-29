import { DiatonicAlt } from "../degrees/DiatonicAlt";
import * as init from "../initializer";
import { AbsoluteVoicing, createAbsoluteVoicing } from "./AbsoluteVoicing";
import { VoicingGenerator } from "./VoicingGenerator";
init.chromatics.default();
init.diatonicAlts.default();

test('CLOSED - G E C, o = 5', () => {
    let degrees = [DiatonicAlt.G, DiatonicAlt.E, DiatonicAlt.C];
    let voicing = VoicingGenerator.CLOSED.make(degrees);
    let actual: AbsoluteVoicing = createAbsoluteVoicing(voicing, 5);

    expect(actual.length).toEqual(3);
    expect(actual[0].degree).toEqual(DiatonicAlt.C);
    expect(actual[0].octave).toEqual(5);
    expect(actual[1].degree).toEqual(DiatonicAlt.E);
    expect(actual[1].octave).toEqual(5);
    expect(actual[2].degree).toEqual(DiatonicAlt.G);
    expect(actual[2].octave).toEqual(5);
});

test('CLOSED UNSORTED - G E C, o = 5', () => {
    let degrees = [DiatonicAlt.G, DiatonicAlt.E, DiatonicAlt.C];
    let voicing = VoicingGenerator.CLOSED_UNSORTED.make(degrees);
    let actual: AbsoluteVoicing = createAbsoluteVoicing(voicing, 5);

    expect(actual.length).toEqual(3);
    expect(actual[0].degree).toEqual(DiatonicAlt.G);
    expect(actual[0].octave).toEqual(5);
    expect(actual[1].degree).toEqual(DiatonicAlt.E);
    expect(actual[1].octave).toEqual(6);
    expect(actual[2].degree).toEqual(DiatonicAlt.C);
    expect(actual[2].octave).toEqual(7);
});