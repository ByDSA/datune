import { Chromatic } from "../degrees/Chromatic";
import { Diatonic } from "../degrees/Diatonic";
import { DiatonicAlt } from "../degrees/DiatonicAlt";
import * as init from "../initializer";
import { VoicingGenerator } from "./VoicingGenerator";
init.chromatics.default();
init.diatonicAlts.default();

test('CLOSED - C E G', () => {
    let degrees = [Chromatic.C, Chromatic.E, Chromatic.G];
    let actual = VoicingGenerator.CLOSED.make(degrees);

    expect(actual.length).toEqual(3);
    expect(actual[0].degree).toEqual(Chromatic.C);
    expect(actual[0].octaveRelative).toEqual(0);
    expect(actual[1].degree).toEqual(Chromatic.E);
    expect(actual[1].octaveRelative).toEqual(0);
    expect(actual[2].degree).toEqual(Chromatic.G);
    expect(actual[2].octaveRelative).toEqual(0);
});

test('CLOSED - REPEAT DEGREE - C E G C', () => {
    let degrees = [Chromatic.C, Chromatic.E, Chromatic.G, Chromatic.C];
    let actual = VoicingGenerator.CLOSED.make(degrees);

    expect(actual.length).toEqual(3);
    expect(actual[0].degree).toEqual(Chromatic.C);
    expect(actual[0].octaveRelative).toEqual(0);
    expect(actual[1].degree).toEqual(Chromatic.E);
    expect(actual[1].octaveRelative).toEqual(0);
    expect(actual[2].degree).toEqual(Chromatic.G);
    expect(actual[2].octaveRelative).toEqual(0);
});

test('CLOSED - C E G B', () => {
    let degrees = [Chromatic.C, Chromatic.E, Chromatic.G, Chromatic.B];
    let actual = VoicingGenerator.CLOSED.make(degrees);

    expect(actual.length).toEqual(4);
    expect(actual[0].degree).toEqual(Chromatic.C);
    expect(actual[0].octaveRelative).toEqual(0);
    expect(actual[1].degree).toEqual(Chromatic.E);
    expect(actual[1].octaveRelative).toEqual(0);
    expect(actual[2].degree).toEqual(Chromatic.G);
    expect(actual[2].octaveRelative).toEqual(0);
    expect(actual[3].degree).toEqual(Chromatic.B);
    expect(actual[3].octaveRelative).toEqual(0);
});

test('CLOSED - C E G B D', () => {
    let degrees = [Chromatic.C, Chromatic.E, Chromatic.G, Chromatic.B, Chromatic.D];
    let actual = VoicingGenerator.CLOSED.make(degrees);

    expect(actual.length).toEqual(5);
    expect(actual[0].degree).toEqual(Chromatic.C);
    expect(actual[0].octaveRelative).toEqual(0);
    expect(actual[1].degree).toEqual(Chromatic.D);
    expect(actual[1].octaveRelative).toEqual(0);
    expect(actual[2].degree).toEqual(Chromatic.E);
    expect(actual[2].octaveRelative).toEqual(0);
    expect(actual[3].degree).toEqual(Chromatic.G);
    expect(actual[3].octaveRelative).toEqual(0);
    expect(actual[4].degree).toEqual(Chromatic.B);
    expect(actual[4].octaveRelative).toEqual(0);
});

test('CLOSED UNSORTED - REPEAT DEGREE - C G E C', () => {
    let degrees = [Chromatic.C, Chromatic.G, Chromatic.E, Chromatic.C];
    let actual = VoicingGenerator.CLOSED_UNSORTED.make(degrees);

    expect(actual.length).toEqual(3);
    expect(actual[0].degree).toEqual(Chromatic.C);
    expect(actual[0].octaveRelative).toEqual(0);
    expect(actual[1].degree).toEqual(Chromatic.G);
    expect(actual[1].octaveRelative).toEqual(0);
    expect(actual[2].degree).toEqual(Chromatic.E);
    expect(actual[2].octaveRelative).toEqual(1);
});

test('CLOSED UNSORTED - C E G B D', () => {
    let degrees = [Chromatic.C, Chromatic.E, Chromatic.G, Chromatic.B, Chromatic.D];
    let actual = VoicingGenerator.CLOSED_UNSORTED.make(degrees);

    expect(actual.length).toEqual(5);
    expect(actual[0].degree).toEqual(Chromatic.C);
    expect(actual[0].octaveRelative).toEqual(0);
    expect(actual[1].degree).toEqual(Chromatic.E);
    expect(actual[1].octaveRelative).toEqual(0);
    expect(actual[2].degree).toEqual(Chromatic.G);
    expect(actual[2].octaveRelative).toEqual(0);
    expect(actual[3].degree).toEqual(Chromatic.B);
    expect(actual[3].octaveRelative).toEqual(0);
    expect(actual[4].degree).toEqual(Chromatic.D);
    expect(actual[4].octaveRelative).toEqual(1);
});

test('CLOSED - DiatonicAlt: C Eb G Bb', () => {
    let degrees = [DiatonicAlt.C, DiatonicAlt.Eb, DiatonicAlt.G, DiatonicAlt.Bb];
    let actual = VoicingGenerator.CLOSED.make(degrees);

    expect(actual.length).toEqual(4);
    expect(actual[0].degree).toEqual(DiatonicAlt.C);
    expect(actual[0].octaveRelative).toEqual(0);
    expect(actual[1].degree).toEqual(DiatonicAlt.Eb);
    expect(actual[1].octaveRelative).toEqual(0);
    expect(actual[2].degree).toEqual(DiatonicAlt.G);
    expect(actual[2].octaveRelative).toEqual(0);
    expect(actual[3].degree).toEqual(DiatonicAlt.Bb);
    expect(actual[3].octaveRelative).toEqual(0);
});

test('CLOSED UNSORTED - Diatonic: C E G B D', () => {
    let degrees = [Diatonic.C, Diatonic.E, Diatonic.G, Diatonic.B, Diatonic.D];
    let actual = VoicingGenerator.CLOSED_UNSORTED.make(degrees);

    expect(actual.length).toEqual(5);
    expect(actual[0].degree).toEqual(Diatonic.C);
    expect(actual[0].octaveRelative).toEqual(0);
    expect(actual[1].degree).toEqual(Diatonic.E);
    expect(actual[1].octaveRelative).toEqual(0);
    expect(actual[2].degree).toEqual(Diatonic.G);
    expect(actual[2].octaveRelative).toEqual(0);
    expect(actual[3].degree).toEqual(Diatonic.B);
    expect(actual[3].octaveRelative).toEqual(0);
    expect(actual[4].degree).toEqual(Diatonic.D);
    expect(actual[4].octaveRelative).toEqual(1);
});