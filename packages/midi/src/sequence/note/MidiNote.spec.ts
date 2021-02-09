import { MusicalDuration } from "@datune/core";
import { MidiPitch } from "../../pitch/MidiPitch";
import { MidiNote } from "./MidiNote";

test('from - C5 QUARTER 90', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let from: MusicalDuration = MusicalDuration.HALF;
    let velocity = 90;

    let midiNote = MidiNote.builder()
        .pitch(midiPitch)
        .duration(duration)
        .velocity(velocity)
        .from(from)
        .create();

    expect(midiNote.pitch).toEqual(midiPitch);
    expect(midiNote.duration).toEqual(duration);
    expect(midiNote.velocity).toEqual(velocity);
    expect(midiNote.from).toEqual(from);
});

test('from - vel 200 (vel to 127)', () => {
    let velocity = 200;

    let midiNote = MidiNote.builder()
        .velocity(velocity)
        .create();

    expect(midiNote.velocity).toEqual(127);
});

test('from - vel -12 (vel to 0)', () => {
    let velocity = -12;

    let midiNote = MidiNote.builder()
        .velocity(velocity)
        .create();

    expect(midiNote.velocity).toEqual(0);
});