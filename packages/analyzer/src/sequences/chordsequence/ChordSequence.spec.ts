import { Chord, MusicalDuration, Note, RhythmPattern, SPN } from "@datune/core";
import { TonalApporach } from "../../approaches/tonal/TonalApproach";
import { NotesSequence } from "../notessequence/NotesSequence";

const testNoteTimeSequence = () => {
    const notesTimeSequence = new NotesSequence();
    notesTimeSequence.addEvent(SPN.C4, notesTimeSequence.duration, MusicalDuration.QUARTER);
    notesTimeSequence.addEvent(SPN.E4, notesTimeSequence.duration, MusicalDuration.QUARTER);
    notesTimeSequence.addEvent(SPN.G4, notesTimeSequence.duration, MusicalDuration.QUARTER);
    notesTimeSequence.addEvent(SPN.B4, notesTimeSequence.duration, MusicalDuration.QUARTER);
    notesTimeSequence.addEvent(SPN.D5, notesTimeSequence.duration, MusicalDuration.QUARTER);
    notesTimeSequence.addEvent(SPN.F5, notesTimeSequence.duration, MusicalDuration.QUARTER);
    notesTimeSequence.addEvent(SPN.A5, notesTimeSequence.duration, MusicalDuration.QUARTER);
    notesTimeSequence.addEvent(SPN.C6, notesTimeSequence.duration, MusicalDuration.QUARTER);

    return notesTimeSequence;
}

it("Chord Analyser 4/4", () => {
    const notesTimeSequence = testNoteTimeSequence();
    const harmonicSequence = TonalApporach.create(RhythmPattern.QUARTER, MusicalDuration.QUARTER);
    harmonicSequence.notesTimeSequence.addTimeLayer(notesTimeSequence);
    harmonicSequence.calculateChords();

    const nodes = harmonicSequence.chordSequence.nodes;
    const chords = nodes.map(n => n.event.chord);
    expect(chords[0]).toBe(Chord.CMaj7);
    expect(chords[1]).toBe(Chord.Dm7);
});

it("Chord Analyser 3/4", () => {
    const notesTimeSequence = testNoteTimeSequence();
    const harmonicSequence = TonalApporach.create(RhythmPattern.THIRD, MusicalDuration.QUARTER);
    harmonicSequence.notesTimeSequence.addTimeLayer(notesTimeSequence);
    harmonicSequence.calculateChords();

    const nodes = harmonicSequence.chordSequence.nodes;
    const chords = nodes.map(n => n.event.chord);
    expect(chords[0]).toBe(Chord.C);
    expect(chords[1]).toBe(Chord.B0);
    expect(chords[2]).toBe(Chord.fromNotes(Note.A, Note.C));
});