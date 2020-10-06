import { SPN } from "../pitches/symbolic/SPN";
import * as init from "../initializer";
import { ConcertPitch } from "./ConcertPitch";
import { Tuning } from "./Tuning";
init.chromatics.default();
init.diatonicAlts.default();
init.spns.default();
init.concertPitches.default();
init.temperaments.default();
init.settings.default();
init.tunings.default();

test('Tuning - EQUAL_440 - A4 = 440', () => {
    let symbolicPitch = ConcertPitch.A440.symbolicPitch;

    let actual: number = Tuning.EQUAL_440.getFrequency(symbolicPitch);
    let expected: number = 440;

    expect(actual).toEqual(expected);
});

test('Tuning - EQUAL_440 - C0', () => {
    let symbolicPitch = SPN.C0;

    let actual: number = Tuning.EQUAL_440.getFrequency(symbolicPitch);
    let expected: number = 16.35;

    expect(actual).toBeCloseTo(expected);
});

test('Tuning - EQUAL_440 - AA4', () => {
    let symbolicPitch = SPN.AA4;

    let actual: number = Tuning.EQUAL_440.getFrequency(symbolicPitch);
    let expected: number = 466.16;

    expect(actual).toBeCloseTo(expected);
});

test('Tuning - EQUAL_440 - GG4', () => {
    let symbolicPitch = SPN.GG4;

    let actual: number = Tuning.EQUAL_440.getFrequency(symbolicPitch);
    let expected: number = 415.30;

    expect(actual).toBeCloseTo(expected);
});

test('Tuning - LIMIT_5_SYMMETRIC_N1_440 - A4 = 440', () => {
    let symbolicPitch = ConcertPitch.A440.symbolicPitch;

    let actual: number = Tuning.LIMIT_5_SYMMETRIC_N1_440.getFrequency(symbolicPitch);
    let expected: number = 440;

    expect(actual).toEqual(expected);
});

test('Tuning - LIMIT_5_SYMMETRIC_N1_440 - E4 = 330', () => {
    let symbolicPitch = SPN.E4;

    let actual: number = Tuning.LIMIT_5_SYMMETRIC_N1_440.getFrequency(symbolicPitch);
    let expected: number = 330;

    expect(actual).toEqual(expected);
});