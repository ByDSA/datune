import { MusicalDuration, SPN } from "@datune/core";
import { MidiNode, MidiNote, MidiPitch } from "@datune/midi";
import { LowerVoiceConstraint } from "../constraints/voice/LowerVoiceConstraint";
import { Voice } from "./Voice";

function initializeVoice() {
    let voice = new Voice();
    const note1 = MidiNote.builder()
        .pitch(MidiPitch.E5)
        .from(MusicalDuration.ZERO)
        .duration(MusicalDuration.QUARTER)
        .create();
    const note2 = note1.withPitch(MidiPitch.D5);
    const node1 = MidiNode.builder()
        .midiNote(note1)
        .from(MusicalDuration.ZERO)
        .create();
    const node2 = MidiNode.builder()
        .midiNote(note2)
        .from(MusicalDuration.QUARTER)
        .create();
    voice.notesSequence.addNode(node1);
    voice.notesSequence.addNode(node2);
    return voice;
}

function initializeLowerVoice() {
    let lowerVoice = new Voice();
    const note1 = MidiNote.builder()
        .pitch(MidiPitch.C5)
        .from(MusicalDuration.ZERO)
        .duration(MusicalDuration.QUARTER)
        .create();
    const note2 = note1.withPitch(MidiPitch.D5);
    lowerVoice.notesSequence.addEvent(note1, MusicalDuration.ZERO, MusicalDuration.QUARTER);
    lowerVoice.notesSequence.addEvent(note2, MusicalDuration.QUARTER, MusicalDuration.HALF);
    return lowerVoice;
}

it(`lower voice`, () => {
    let voice = initializeVoice();
    let lowerVoice = initializeLowerVoice();
    voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

    const actual = voice.checkVoiceConstraints(MusicalDuration.ZERO, MusicalDuration.QUARTER);
    const expected = true;
    expect(actual).toBe(expected);

});

it(`lower voice 2`, () => {
    let voice = initializeVoice();
    let lowerVoice = initializeLowerVoice();
    voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

    const actual = voice.checkVoiceConstraints(MusicalDuration.QUARTER, MusicalDuration.HALF);
    const expected = false;
    expect(actual).toBe(expected);
});

it(`lower voice SPN`, () => {
    let voice = initializeVoice();
    let lowerVoice = initializeLowerVoice();
    voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

    const actual = voice.checkVoiceConstraintsPitch(MidiPitch.C5, MusicalDuration.QUARTER, MusicalDuration.HALF);
    const expected = false;
    expect(actual).toBe(expected);
});

it(`lower voice SPN 2`, () => {
    let voice = initializeVoice();
    let lowerVoice = initializeLowerVoice();
    voice.addVoiceConstraint(new LowerVoiceConstraint(lowerVoice));

    const actual = voice.checkVoiceConstraintsPitch(MidiPitch.E5, MusicalDuration.QUARTER, MusicalDuration.HALF);
    const expected = true;
    expect(actual).toBe(expected);
});