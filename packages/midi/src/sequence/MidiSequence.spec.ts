import { MusicalDuration } from "@datune/core";
import { TemporalNode, TemporalNodeBuilder } from "@datune/utils";
import { MidiPitch } from "../pitch/MidiPitch";
import { MidiSequence } from "./MidiSequence";
import { MidiNode } from "./node/MidiNode";
import { MidiNote } from "./note/MidiNote";

it('from - cellSize=QUARTER', () => {
    let cellSize: MusicalDuration = MusicalDuration.QUARTER;
    let midiSequence: MidiSequence = MidiSequence.create();

    expect((<any>midiSequence).cellSize).toEqual(cellSize);
});

it('add - ZERO [C5 QUARTER]', () => {
    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let midiNote: MidiNote = MidiNote.builder()
        .pitch(MidiPitch.C5)
        .duration(duration)
        .create();
    let midiNoteNode: MidiNode = MidiNode.builder()
        .midiNote(midiNote)
        .from(MusicalDuration.ZERO)
        .create();

    let midiSequence: MidiSequence = MidiSequence.create();
    midiSequence.addNode(midiNoteNode);
    let durableEvents: MidiNode[] = <MidiNode[]>midiSequence.getNodesAt(MusicalDuration.ZERO);

    expect(durableEvents.length).toEqual(1);
    expect(durableEvents[0]).toEqual(midiNoteNode);
});

it('removeNodesAt - sample - EIGHT = nothing at ZERO', () => {
    let midiSequence: MidiSequence = generateSample();
    midiSequence.removeNodesAt(MusicalDuration.EIGHTH);
    let durableEvents: MidiNode[] = <MidiNode[]>midiSequence.getNodesAt(MusicalDuration.ZERO);

    expect(durableEvents.length).toEqual(0);
});

it('removeNodesAt - sampleArp - remove EIGHT, length = 2', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.EIGHTH);

    expect(midiSequence.nodes.length).toEqual(2);
});

it('removeNodesAt - sampleArp - remove QUARTER , 1 at ZERO', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.QUARTER);
    let durableEvents: MidiNode[] = <MidiNode[]>midiSequence.getNodesAt(MusicalDuration.ZERO);

    expect(durableEvents.length).toEqual(1);
});

it('removeNodesAt - sampleArp - remove QUARTER, nothing at QUARTER', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.QUARTER);
    let durableEvents: MidiNode[] = <MidiNode[]>midiSequence.getNodesAt(MusicalDuration.QUARTER);

    expect(durableEvents.length).toEqual(0);
});

it('removeNodesAt - sampleArp - remove QUARTER, 1 element at HALF', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.QUARTER);
    let durableEvents: MidiNode[] = <MidiNode[]>midiSequence.getNodesAt(MusicalDuration.HALF);

    expect(durableEvents.length).toEqual(1);
});

it('removeNodesAt - sampleArp - remove EIGHT -> 0 element at HALF.dotted', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    midiSequence.removeNodesAt(MusicalDuration.EIGHTH);
    let durableEvents: MidiNode[] = <MidiNode[]>midiSequence.getNodesAt(MusicalDuration.HALF.dotted);

    expect(durableEvents.length).toEqual(0);
});

it('getNodesAt - sampleArp - WHOLE = nothing', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    let durableEvents: MidiNode[] = <MidiNode[]>midiSequence.getNodesAt(MusicalDuration.WHOLE);

    expect(durableEvents.length).toEqual(0);
});

it('events - sampleArp - length = 3', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    let length = midiSequence.nodes.length;

    expect(length).toEqual(3);
});

it('events - sample - length = 3', () => {
    let midiSequence: MidiSequence = generateSample();
    let length = midiSequence.nodes.length;

    expect(length).toEqual(3);
});

it('duration - sample - duration = QUARTER', () => {
    let midiSequence: MidiSequence = generateSample();
    let duration = midiSequence.duration;

    expect(duration).toEqual(MusicalDuration.QUARTER);
});

it('duration - sampleArp - duration = HALF.dotted', () => {
    let midiSequence: MidiSequence = generateSampleArp();
    let duration = midiSequence.duration;

    expect(duration).toEqual(MusicalDuration.HALF.dotted);
});

it('addSequence - add sampleArp', () => {
    let midiSequence: MidiSequence = MidiSequence.create();
    let sampleArtSequence = generateSampleArp();
    midiSequence.addTimeLayer(sampleArtSequence);
    let duration = midiSequence.duration;

    expect(duration).toEqual(sampleArtSequence.duration);
});

// SAMPLES
function generateSample(): MidiSequence {
    let midiSequence: MidiSequence = MidiSequence.create();

    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let midiNote: MidiNote = MidiNote.builder()
        .pitch(MidiPitch.C5)
        .duration(duration)
        .create();
    let midiEvent: MidiNode = MidiNode.builder()
        .from(MusicalDuration.ZERO)
        .midiNote(midiNote)
        .create();

    let midiNote2: MidiNote = MidiNote.builder()
        .pitch(MidiPitch.E5)
        .duration(duration)
        .create();
    let midiEvent2: MidiNode = MidiNode.builder()
        .from(MusicalDuration.ZERO)
        .midiNote(midiNote2)
        .create();

    let midiNote3: MidiNote = MidiNote.builder()
        .pitch(MidiPitch.G5)
        .duration(duration)
        .create();
    let midiEvent3: MidiNode = MidiNode.builder()
        .from(MusicalDuration.ZERO)
        .midiNote(midiNote3)
        .create();

    midiSequence.addNode(midiEvent);
    midiSequence.addNode(midiEvent2);
    midiSequence.addNode(midiEvent3);

    return midiSequence;
}

function generateSampleArp(): MidiSequence {
    let midiSequence: MidiSequence = MidiSequence.create();

    let duration: MusicalDuration = MusicalDuration.QUARTER;
    let midiNote: MidiNote = MidiNote.builder()
        .pitch(MidiPitch.C5)
        .duration(duration)
        .create();
    let midiEvent: MidiNode = <MidiNode>new TemporalNodeBuilder<MidiNote, MusicalDuration>()
        .from(MusicalDuration.ZERO)
        .to(MusicalDuration.QUARTER)
        .event(midiNote)
        .create();

    let midiNote2: MidiNote = MidiNote.builder()
        .pitch(MidiPitch.E5)
        .duration(duration)
        .create();
    let midiEvent2: MidiNode = <MidiNode>new TemporalNodeBuilder<MidiNote, MusicalDuration>()
        .from(MusicalDuration.QUARTER)
        .duration(MusicalDuration.QUARTER)
        .event(midiNote2)
        .create();

    let midiNote3: MidiNote = MidiNote.builder()
        .pitch(MidiPitch.G5)
        .duration(duration)
        .create();
    let midiEvent3: MidiNode = <MidiNode>new TemporalNodeBuilder<MidiNote, MusicalDuration>()
        .from(MusicalDuration.HALF)
        .duration(MusicalDuration.QUARTER)
        .event(midiNote3)
        .create();

    midiSequence.addNode(midiEvent);
    midiSequence.addNode(midiEvent2);
    midiSequence.addNode(midiEvent3);

    return midiSequence;
}

/***************************************/