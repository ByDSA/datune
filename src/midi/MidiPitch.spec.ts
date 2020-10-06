import { Language } from "../lang/Language";
import { SPN } from "../pitches/symbolic/SPN";
import { SymbolicPitch } from "../pitches/symbolic/SymbolicPitch";
import * as init from "../initializer";
import { Settings } from "../settings/Settings";
import { Tuning } from "../tuning/Tuning";
import { MidiPitch } from "./MidiPitch";
init.midiPitches.default();
init.settings.default();

describe.each([
    [MidiPitch.C5, SPN.C4],
    [MidiPitch.C0, SPN.C_S1],
    [MidiPitch.A0, SPN.A_S1],
    [MidiPitch.A5, SPN.A4],
    [MidiPitch.C10, SPN.C9],
])('PRECALC SPN', (midiPitch, expectedSPN) => {
    let spn: SPN = midiPitch.spn;
    expect(spn).toEqual(expectedSPN);
})

describe.each([
    [MidiPitch.C0, 8.18],
    [MidiPitch.A0, 13.75],
    [MidiPitch.A1, 27.5],
    [MidiPitch.A2, 55],
    [MidiPitch.B2, 61.74],
    [MidiPitch.A3, 110],
    [MidiPitch.C4, 130.81],
    [MidiPitch.A4, 220],
    [MidiPitch.A5, 440],
    [MidiPitch.C10, 8372.02],
    [MidiPitch.G10, 12543.85],
])("frequency", (midiPitch, expectedFrequency) => {
    it(`${midiPitch}.frequency = ${expectedFrequency}`, async () => {
        let frequency: number = midiPitch.frequency;

        expect(frequency).toBeCloseTo(expectedFrequency);
    });
})

describe.each([
    [MidiPitch.C0, 0],
    [MidiPitch.MIN, 0],
    [MidiPitch.B0, 11],
    [MidiPitch.C1, 12],
    [MidiPitch.A5, 69],
    [MidiPitch.A4, 57],
    [MidiPitch.C5, 60],
    [MidiPitch.C6, 72],
    [MidiPitch.C8, 96],
    [MidiPitch.C9, 108],
    [MidiPitch.B9, 119],
    [MidiPitch.C10, 120],
    [MidiPitch.MAX, 127],
])('code', (midiPitch, code) => {
    test(`${midiPitch}.code = ${midiPitch.code}`, () => {
        let actualCode: number = midiPitch.code;

        expect(actualCode).toBe(code);
    });

    test(`fromCode(${midiPitch.code}) = ${midiPitch}`, () => {
        let actualMidiPitch = MidiPitch.fromCode(code);

        expect(actualMidiPitch).toBe(midiPitch);
    });
})

test('MidiPitch - fromFrequency - 440 = A5', () => {
    let midiNote = MidiPitch.fromFrequency(440);
    let expected: MidiPitch = MidiPitch.A5;

    expect(midiNote).toEqual(expected);
});

test('fromFrequency - LIMIT_5_SYMMETRIC_N1_440 E5 = E5 + 2 cents', () => {
    let symbolicPitch: SymbolicPitch = SPN.E5;
    let freq: number = Tuning.LIMIT_5_SYMMETRIC_N1_440.getFrequency(symbolicPitch);
    let midiNote = MidiPitch.fromFrequency(freq);
    let expectedDetuned = 2;

    expect(midiNote.spn).toEqual(symbolicPitch);
    expect(midiNote.cents).toEqual(expectedDetuned);
});

test('fromFrequency - LIMIT_5_SYMMETRIC_N1_440 FF5 = FF5 - 16 cents', () => {
    let symbolicPitch: SymbolicPitch = SPN.FF5;
    let freq: number = Tuning.LIMIT_5_SYMMETRIC_N1_440.getFrequency(symbolicPitch);
    let midiNote = MidiPitch.fromFrequency(freq);
    let expectedCents = -16;

    expect(midiNote.spn).toEqual(symbolicPitch);
    expect(midiNote.cents).toEqual(expectedCents);
});

test('fromFrequency - 60 ~ 60 ', () => {
    let expected: number = 60;
    let midiNote = MidiPitch.fromFrequency(expected);
    let frequency: number = midiNote.frequency;

    expect(frequency).toBeCloseTo(expected, 0);
});

test('fromFrequency - 60 = SPN.B1 - 49 cents', () => {
    let expected: number = 60;
    let midiNote = MidiPitch.fromFrequency(expected);
    let spn: SPN = midiNote.spn;
    let cents: number = midiNote.cents;

    expect(spn).toEqual(SPN.B1);
    expect(cents).toEqual(-49);
});

test('from - A5 -1200 cents', () => {
    let midiNote = MidiPitch.from(SPN.A5, -1200);
    let spn: SPN = midiNote.spn;
    let cents: number = midiNote.cents;

    expect(spn).toEqual(SPN.A5);
    expect(cents).toEqual(-1200);
});

test('toString - ENG - 60 Hz', () => {
    Settings.lang = Language.ENG;
    let midiNote = MidiPitch.fromFrequency(60);
    let expected = "B2 (-49)";

    expect(midiNote.toString()).toEqual(expected);
});

test('toString - ENG - A5 -1200 cents', () => {
    let midiNote = MidiPitch.from(SPN.A4, -1200);
    let expected = "A5 (-1200)";

    expect(midiNote.toString()).toEqual(expected);
});

test('toString - ESP - 440 Hz', () => {
    Settings.lang = Language.ESP;
    let midiNote = MidiPitch.fromFrequency(440);
    let expected = "La5";

    expect(midiNote.toString()).toEqual(expected);
});