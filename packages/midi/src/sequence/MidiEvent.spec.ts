import { Node } from "@datune/analyzer/sequences/Node";
import * as init from "@datune/core/initializer";
import { MusicalDuration } from "@datune/core/tempo/MusicalDuration";
import { MidiPitch } from "../pitch/MidiPitch";
import * as initMidiPitches from "../pitch/MidiPitchInitializer";
import { MidiNote } from "./MidiNote";
initMidiPitches.default();
init.musicalDurations.default();

test('from - ZERO (C5 QUARTER 90)', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let velocity = 90;

    let midiNote: MidiNote = MidiNote.from(midiPitch, duration, velocity);

    let midiEvent: Node<MidiNote, MusicalDuration> = Node.createFrom(MusicalDuration.ZERO, midiNote);
    expect(midiEvent.from).toEqual(MusicalDuration.ZERO);
    expect(midiEvent.event).toEqual(midiNote);
    expect(midiEvent.to).toEqual(MusicalDuration.QUARTER);
});

test('from - QUARTER (C5 QUARTER 90)', () => {
    let midiPitch: MidiPitch = MidiPitch.C5;
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let velocity = 90;

    let midiNote: MidiNote = MidiNote.from(midiPitch, duration, velocity);

    let midiEvent: Node<MidiNote, MusicalDuration> = Node.createFrom(MusicalDuration.QUARTER, midiNote);

    expect(midiEvent.from).toEqual(MusicalDuration.QUARTER);
    expect(midiEvent.event).toEqual(midiNote);
    expect(midiEvent.to).toEqual(MusicalDuration.HALF);
});