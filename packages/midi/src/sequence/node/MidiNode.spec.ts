import { MusicalDuration } from "@datune/core";
import { MidiPitch } from "../../pitch/MidiPitch";
import { MidiNote } from "../note/MidiNote";
import { MidiNode } from "./MidiNode";

test('from - ZERO (C5 QUARTER 90)', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let velocity = 90;

    let midiNote: MidiNote = MidiNote.builder()
        .pitch(midiPitch)
        .duration(duration)
        .velocity(velocity)
        .create();

    let midiNode: MidiNode = MidiNode.builder()
        .midiNote(midiNote)
        .from(MusicalDuration.ZERO)
        .create();
    expect(midiNode.from).toBe(MusicalDuration.ZERO);
    expect(midiNode.event).toBe(midiNote);
    expect(midiNode.to).toBe(MusicalDuration.QUARTER);
});

test('from - QUARTER (C5 QUARTER 90)', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let velocity = 90;

    let midiNote: MidiNote = MidiNote.builder()
        .pitch(midiPitch)
        .duration(duration)
        .velocity(velocity)
        .create();

    let midiNode: MidiNode = MidiNode.builder()
        .midiNote(midiNote)
        .from(MusicalDuration.QUARTER)
        .create();

    expect(midiNode.from).toBe(MusicalDuration.QUARTER);
    expect(midiNode.event).toBe(midiNote);
    expect(midiNode.to).toBe(MusicalDuration.HALF);
});

test('changing to', () => {
    let duration: MusicalDuration = MusicalDuration.QUARTER;

    let midiNote: MidiNote = MidiNote.builder()
        .duration(duration)
        .create();

    let midiNode: MidiNode = MidiNode.builder()
        .midiNote(midiNote)
        .from(MusicalDuration.QUARTER)
        .create();

    midiNode.to = MusicalDuration.WHOLE;

    expect(midiNode.from).toBe(MusicalDuration.QUARTER);
    expect(midiNode.event).not.toBe(midiNote);
    expect(midiNode.event.duration).toBe(MusicalDuration.WHOLE.withSub(MusicalDuration.QUARTER));
    expect(midiNode.to).toBe(MusicalDuration.WHOLE);
});