import * as precalc from "../precalc";
import { BPM } from "./BPM";
import { MusicalDuration } from "./MusicalDuration";
precalc.bpms();

test('BPM - from - 120 QUARTER', () => {
    let n = 120;
    let beat: MusicalDuration = MusicalDuration.QUARTER;

    let bpm = BPM.from(n, beat);

    expect(bpm.bpm).toEqual(n);
    expect(bpm.beat).toEqual(beat);
});

test('BPM - from - 120', () => {
    let n = 120;

    let bpm = BPM.from(n);

    let expectedBeat: MusicalDuration = MusicalDuration.QUARTER;

    expect(bpm.bpm).toEqual(n);
    expect(bpm.beat).toEqual(expectedBeat);
});

test('BPM - precalc - QUARTER_120', () => {
    let bpm = BPM.QUARTER_120;

    let expectedBeat: MusicalDuration = MusicalDuration.QUARTER;
    let expectedNum: number = 120;

    expect(bpm.bpm).toEqual(expectedNum);
    expect(bpm.beat).toEqual(expectedBeat);
});

test('BPM - getMillis - QUARTER_120 - WHOLE = 2s', () => {
    let bpm = BPM.QUARTER_120;

    let actualDuration = bpm.getMillis(MusicalDuration.WHOLE);
    let expectedDuration: number = 2000;

    expect(actualDuration).toEqual(expectedDuration);
});

test('BPM - getMillis - QUARTER_120 - QUARTER = 0.5s', () => {
    let bpm = BPM.QUARTER_120;

    let actualDuration = bpm.getMillis(MusicalDuration.QUARTER);
    let expectedDuration: number = 500;

    expect(actualDuration).toEqual(expectedDuration);
});