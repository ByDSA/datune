import { Language } from "../lang/Language";
import { SPN } from "../pitch/symbolic/SPN";
import { SymbolicPitch } from "../pitch/symbolic/SymbolicPitch";
import * as precalc from "../precalc";
import { Settings } from "../settings/Settings";
import { Tuning } from "../tuning/Tuning";
import { MidiPitch } from "./MidiPitch";
precalc.midiPitches();
precalc.settings();

test('PRECALC', async () => {
    let midiNote = MidiPitch.C5;

    let spn: SPN = midiNote.spn;
    let cents: number = midiNote.cents;

    expect(spn).toEqual(SPN.C4);
    expect(cents).toEqual(0);
});

test('frequency - C4', async () => {
    let midiNote = MidiPitch.C4;
    let frequency: number = midiNote.frequency;
    let expected: number = 130.81;

    expect(frequency).toBeCloseTo(expected);
});

test('frequency - A4', async () => {
    let midiNote = MidiPitch.A4;
    let frequency: number = midiNote.frequency;
    let expected: number = 220;

    expect(frequency).toBeCloseTo(expected);
});

test('frequency - A5', async () => {
    let midiNote = MidiPitch.A5;
    let frequency: number = midiNote.frequency;
    let expected: number = 440;

    expect(frequency).toBeCloseTo(expected);
});

test('frequency - A0', async () => {
    let midiNote = MidiPitch.A0;
    let frequency: number = midiNote.frequency;
    let expected: number = 13.75;

    expect(frequency).toBeCloseTo(expected);
});

test('frequency - C0', async () => {
    let midiNote = MidiPitch.C0;
    let frequency: number = midiNote.frequency;
    let expected: number = 8.18;

    expect(frequency).toBeCloseTo(expected);
});

test('frequency - B1', async () => {
    let midiNote = MidiPitch.B2;
    let frequency: number = midiNote.frequency;
    let expected: number = 61.74;

    expect(frequency).toBeCloseTo(expected);
});

test('code - C0', async () => {
    let midiNote = MidiPitch.C0;
    let code: number = midiNote.code;
    let expected: number = 0;

    expect(code).toEqual(expected);
});

test('SPN - C0', async () => {
    let midiNote = MidiPitch.C0;
    let spn: SPN = midiNote.spn;
    let expected: SPN = SPN.C_S1;

    expect(spn).toEqual(expected);
});

test('code - B0', async () => {
    let midiNote = MidiPitch.B0;
    let code: number = midiNote.code;
    let expected: number = 11;

    expect(code).toEqual(expected);
});

test('code - C1', async () => {
    let midiNote = MidiPitch.C1;
    let code: number = midiNote.code;
    let expected: number = 12;

    expect(code).toEqual(expected);
});

test('code - A5', async () => {
    let midiNote = MidiPitch.A5;
    let code: number = midiNote.code;
    let expected: number = 69;

    expect(code).toBeCloseTo(expected);
});

test('SPN - A5', async () => {
    let midiNote = MidiPitch.A5;
    let spn: SPN = midiNote.spn;
    let expected: SPN = SPN.A4;

    expect(spn).toEqual(expected);
});

test('SPN - C10', async () => {
    let midiNote = MidiPitch.C10;
    let spn: SPN = midiNote.spn;
    let expected: SPN = SPN.C9;

    expect(spn).toEqual(expected);
});

test('MidiPitch - code - A4', () => {
    let midiNote = MidiPitch.A4;
    let code: number = midiNote.code;
    let expected: number = 57;

    expect(code).toBeCloseTo(expected);
});

test('MidiPitch - code - C5', () => {
    let midiNote = MidiPitch.C5;
    let code: number = midiNote.code;
    let expected: number = 60;

    expect(code).toBeCloseTo(expected);
});

test('MidiPitch - code - C6', () => {
    let midiNote = MidiPitch.C6;
    let code: number = midiNote.code;
    let expected: number = 72;

    expect(code).toBeCloseTo(expected);
});

test('MidiPitch - code - C8', () => {
    let midiNote = MidiPitch.C8;
    let code: number = midiNote.code;
    let expected: number = 96;

    expect(code).toBeCloseTo(expected);
});

test('MidiPitch - code - C9', () => {
    let midiNote = MidiPitch.C9;
    let code: number = midiNote.code;
    let expected: number = 108;

    expect(code).toBeCloseTo(expected);
});


test('MidiPitch - code - B9', () => {
    let midiNote = MidiPitch.B9;
    let code: number = midiNote.code;
    let expected: number = 119;

    expect(code).toBeCloseTo(expected);
});

test('MidiPitch - code - C10', () => {
    let midiNote = MidiPitch.C10;
    let code: number = midiNote.code;
    let expected: number = 120;

    expect(code).toEqual(expected);
});

test('MidiPitch - code - MIN = 0', () => {
    let midiNote = MidiPitch.MIN;
    let code: number = midiNote.code;
    let expected: number = 0;

    expect(code).toEqual(expected);
});

test('MidiPitch - code - MAX = 127', () => {
    let midiNote = MidiPitch.MAX;
    let code: number = midiNote.code;
    let expected: number = 127;

    expect(code).toEqual(expected);
});

test('MidiPitch - frequency - G10', () => {
    let midiNote = MidiPitch.G10;
    let frequency: number = midiNote.frequency;
    let expected: number = 12543.85;

    expect(frequency).toBeCloseTo(expected);
});

test('MidiPitch - frequency - C10', () => {
    let midiNote = MidiPitch.C10;
    let frequency: number = midiNote.frequency;
    let expected: number = 8372.02;

    expect(frequency).toBeCloseTo(expected);
});

test('MidiPitch - fromCode - 60 = C5', () => {
    let midiNote = MidiPitch.fromCode(60);
    let expected: MidiPitch = MidiPitch.C5;

    expect(midiNote).toEqual(expected);
});

test('MidiPitch - fromFrequency - 440 = A5', () => {
    let midiNote = MidiPitch.fromFrequency(440);
    let expected: MidiPitch = MidiPitch.A5;

    expect(midiNote).toEqual(expected);
});

test('MidiPitch - fromFrequency - LIMIT_5_SYMMETRIC_N1_440 E5 = E5 + 2 cents', () => {
    let symbolicPitch: SymbolicPitch = SPN.E5;
    let freq: number = Tuning.LIMIT_5_SYMMETRIC_N1_440.getFrequency(symbolicPitch);
    let midiNote = MidiPitch.fromFrequency(freq);
    let expectedDetuned = 2;

    expect(midiNote.spn).toEqual(symbolicPitch);
    expect(midiNote.cents).toEqual(expectedDetuned);
});

test('MidiPitch - fromFrequency - LIMIT_5_SYMMETRIC_N1_440 FF5 = FF5 - 16 cents', () => {
    let symbolicPitch: SymbolicPitch = SPN.FF5;
    let freq: number = Tuning.LIMIT_5_SYMMETRIC_N1_440.getFrequency(symbolicPitch);
    let midiNote = MidiPitch.fromFrequency(freq);
    let expectedCents = -16;

    expect(midiNote.spn).toEqual(symbolicPitch);
    expect(midiNote.cents).toEqual(expectedCents);
});

test('MidiPitch - fromFrequency - 60 ~ 60 ', () => {
    let expected: number = 60;
    let midiNote = MidiPitch.fromFrequency(expected);
    let frequency: number = midiNote.frequency;

    expect(frequency).toBeCloseTo(expected, 0);
});

test('MidiPitch - fromFrequency - 60 = SPN.B1 - 49 cents', () => {
    let expected: number = 60;
    let midiNote = MidiPitch.fromFrequency(expected);
    let spn: SPN = midiNote.spn;
    let cents: number = midiNote.cents;

    expect(spn).toEqual(SPN.B1);
    expect(cents).toEqual(-49);
});

test('MidiPitch - from - A5 -1200 cents', () => {
    let midiNote = MidiPitch.from(SPN.A5, -1200);
    let spn: SPN = midiNote.spn;
    let cents: number = midiNote.cents;

    expect(spn).toEqual(SPN.A5);
    expect(cents).toEqual(-1200);
});

test('MidiPitch - toString - ENG - 60 Hz', () => {
    Settings.lang = Language.ENG;
    let midiNote = MidiPitch.fromFrequency(60);
    let expected = "B2 (-49)";

    expect(midiNote.toString()).toEqual(expected);
});

test('MidiPitch - toString - ENG - A5 -1200 cents', () => {
    let midiNote = MidiPitch.from(SPN.A4, -1200);
    let expected = "A5 (-1200)";

    expect(midiNote.toString()).toEqual(expected);
});

test('MidiPitch - toString - ESP - 440 Hz', () => {
    Settings.lang = Language.ESP;
    let midiNote = MidiPitch.fromFrequency(440);
    let expected = "La5";

    expect(midiNote.toString()).toEqual(expected);
});