import * as init from "../initializer";
import { MusicalDuration } from "../tempo/MusicalDuration";
import { MidiNote, MidiNoteNode } from "./MidiNote";
import { MidiPitch } from "./MidiPitch";
import { MidiSequence } from "./MidiSequence";
import { TemporalNode } from "../timelayer/TemporalNode";
init.midiPitches.default();
init.musicalDurations.default();

test('from - cellSize=QUARTER', () => {
    let cellSize: MusicalDuration = MusicalDuration.QUARTER;
    let midiSequence: MidiSequence = MidiSequence.create();

    expect((<any>midiSequence).cellSize).toEqual(cellSize);
});

test('add - ZERO [C5 QUARTER]', () => {
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let midiNote: MidiNote = MidiNote.from(MidiPitch.C5, duration);
    let midiNoteNode: MidiNoteNode = TemporalNode.createFrom(MusicalDuration.ZERO, midiNote);

    let midiSequence: MidiSequence = MidiSequence.create();
    midiSequence.addNode(midiNoteNode);
    let durableEvents: MidiNoteNode[] = midiSequence.getNodesAt(MusicalDuration.ZERO);

    expect(durableEvents.length).toEqual(1);
    expect(durableEvents[0]).toEqual(midiNoteNode);
});

test('removeNodesAt - sample - EIGHT = nothing at ZERO', () => {
    let midiSequence: MidiSequence = generateSample();
    midiSequence.removeNodesAt(MusicalDuration.EIGHTH);
    let durableEvents: MidiNoteNode[] = midiSequence.getNodesAt(MusicalDuration.ZERO);

    expect(durableEvents.length).toEqual(0);
});

test('removeNodesAt - sampleArp - remove EIGHT, length = 2', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.EIGHTH);

    expect(midiSequence.nodes.length).toEqual(2);
});

test('removeNodesAt - sampleArp - remove QUARTER , 1 at ZERO', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.QUARTER);
    let durableEvents: MidiNoteNode[] = midiSequence.getNodesAt(MusicalDuration.ZERO);

    expect(durableEvents.length).toEqual(1);
});

test('removeNodesAt - sampleArp - remove QUARTER, nothing at QUARTER', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.QUARTER);
    let durableEvents: MidiNoteNode[] = midiSequence.getNodesAt(MusicalDuration.QUARTER);

    expect(durableEvents.length).toEqual(0);
});

test('removeNodesAt - sampleArp - remove QUARTER, 1 element at HALF', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.QUARTER);
    let durableEvents: MidiNoteNode[] = midiSequence.getNodesAt(MusicalDuration.HALF);

    expect(durableEvents.length).toEqual(1);
});

test('removeNodesAt - sampleArp - remove EIGHT -> 0 element at HALF.dotted', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.EIGHTH);
    let durableEvents: MidiNoteNode[] = midiSequence.getNodesAt(MusicalDuration.HALF.dotted);

    expect(durableEvents.length).toEqual(0);
});

test('getNodesAt - sampleArp - WHOLE = nothing', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    let durableEvents: MidiNoteNode[] = midiSequence.getNodesAt(MusicalDuration.WHOLE);

    expect(durableEvents.length).toEqual(0);
});

test('events - sampleArp - length = 3', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    let length = midiSequence.nodes.length;

    expect(length).toEqual(3);
});

test('events - sample - length = 3', () => {
    let midiSequence: MidiSequence = generateSample();
    let length = midiSequence.nodes.length;

    expect(length).toEqual(3);
});


test('duration - sample - duration = QUARTER', () => {
    let midiSequence: MidiSequence = generateSample();
    let duration = midiSequence.duration;

    expect(duration).toEqual(MusicalDuration.QUARTER);
});

test('duration - sampleArp - duration = HALF.dotted', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    let duration = midiSequence.duration;

    expect(duration).toEqual(MusicalDuration.HALF.dotted);
});

test('addSequence - add sampleArp', () => {
    let midiSequence: MidiSequence = MidiSequence.create();
    let sampleArtSequence = generateSampleArp();
    midiSequence.addSequenceAtEnd(sampleArtSequence);
    let duration = midiSequence.duration;

    expect(duration).toEqual(sampleArtSequence.duration);
});

// SAMPLES
function generateSample(): MidiSequence {
    let midiSequence: MidiSequence = MidiSequence.create();

    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let midiNote: MidiNote = MidiNote.from(MidiPitch.C5, duration);
    let midiEvent: MidiNoteNode = TemporalNode.createFrom(MusicalDuration.ZERO, midiNote);

    let midiNote2: MidiNote = MidiNote.from(MidiPitch.E5, duration);
    let midiEvent2: MidiNoteNode = TemporalNode.createFrom(MusicalDuration.ZERO, midiNote2);

    let midiNote3: MidiNote = MidiNote.from(MidiPitch.G5, duration);
    let midiEvent3: MidiNoteNode = TemporalNode.createFrom(MusicalDuration.ZERO, midiNote3);

    midiSequence.addNode(midiEvent);
    midiSequence.addNode(midiEvent2);
    midiSequence.addNode(midiEvent3);

    return midiSequence;
}

function generateSampleArp(): MidiSequence {
    let midiSequence: MidiSequence = MidiSequence.create();

    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let midiNote: MidiNote = MidiNote.from(MidiPitch.C5, duration);
    let midiEvent: MidiNoteNode = TemporalNode.createFrom(MusicalDuration.ZERO, midiNote);

    let midiNote2: MidiNote = MidiNote.from(MidiPitch.E5, duration);
    let midiEvent2: MidiNoteNode = TemporalNode.createFrom(MusicalDuration.QUARTER, midiNote2);

    let midiNote3: MidiNote = MidiNote.from(MidiPitch.G5, duration);
    let midiEvent3: MidiNoteNode = TemporalNode.createFrom(MusicalDuration.HALF, midiNote3);

    midiSequence.addNode(midiEvent);
    midiSequence.addNode(midiEvent2);
    midiSequence.addNode(midiEvent3);

    return midiSequence;
}

/***************************************/