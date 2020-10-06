import * as init from "../initializer";
import { MusicalDuration } from "../tempo/MusicalDuration";
import { MidiNote } from "./MidiNote";
import { MidiPitch } from "./MidiPitch";
init.midiPitches.default();

test('from - C5 QUARTER 90', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let velocity = 90;

    let midiNote = MidiNote.from(midiPitch, duration, velocity);

    expect(midiNote.pitch).toEqual(midiPitch);
    expect(midiNote.duration).toEqual(duration);
    expect(midiNote.velocity).toEqual(velocity);
});

test('from - C5 QUARTER 200 (vel to 127)', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let velocity = 200;

    let midiNote = MidiNote.from(midiPitch, duration, velocity);

    expect(midiNote.velocity).toEqual(127);
});

test('from - C5 QUARTER -12 (vel to 0)', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let velocity = -12;

    let midiNote = MidiNote.from(midiPitch, duration, velocity);

    expect(midiNote.velocity).toEqual(0);
});

test('set Velocity - -12 (vel to 0)', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;

    let midiNote = MidiNote.from(midiPitch, duration);
    midiNote.velocity = -12;

    expect(midiNote.velocity).toEqual(0);
});

test('set Velocity - 200 (vel to 127)', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;

    let midiNote = MidiNote.from(midiPitch, duration);
    midiNote.velocity = 200;

    expect(midiNote.velocity).toEqual(127);
});