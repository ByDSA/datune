import * as init from "../initializer";
import { Tuning } from "../tuning/Tuning";
import { PitchParametric } from "./PitchParametric";
import { SPN as SPN } from "./symbolic/SPN";
import { Pitch } from "./Pitch";
init.spns.default();
init.tunings.default();

test('PitchParametric - from - C4 EQUAL_440 = 261.63', () => {
    let chromaticSymbolicPitch = SPN.C4;
    let tuning = Tuning.EQUAL_440;
    let pitchParametric = PitchParametric.from(chromaticSymbolicPitch, tuning);
    let actual = pitchParametric.frequency;
    let expected = 261.63;

    expect(actual).toBeCloseTo(expected);
});

test('PitchParametric - from - C0 EQUAL_440 = 16.35', () => {
    let chromaticSymbolicPitch = SPN.C0;
    let tuning = Tuning.EQUAL_440;
    let pitchParametric = PitchParametric.from(chromaticSymbolicPitch, tuning);
    let actual = pitchParametric.frequency;
    let expected = 16.35;

    expect(actual).toBeCloseTo(expected);
});

test('overtones - A440_ET12 - A4', () => {
    let chromaticSymbolicPitch = SPN.A4;
    let tuning = Tuning.EQUAL_440;
    let pitch: Pitch = PitchParametric.from(chromaticSymbolicPitch, tuning);
    let actual = pitch.overtones;

    expect(actual).toEqual([
        440,
        440*2,
        440*3,
        440*4,
        440*5,
        440*6,
        440*7,
        440*8,
        440*9,
        440*10,
        440*11,
        440*12,
        440*13,
        440*14,
        440*15,
        440*16,
        440*17,
        440*18,
        440*19,
        440*20,
        440*21,
        440*22,
        440*23,
        440*24,
        440*25,
        440*26,
        440*27,
        440*28,
        440*29,
        440*30,
        440*31,
        440*32,
        440*33,
        440*34,
        440*35,
        440*36,
        440*37,
        440*38,
        440*39,
        440*40,
        440*41,
        440*42,
        440*43,
        440*44,
        440*45,
    ]);
});