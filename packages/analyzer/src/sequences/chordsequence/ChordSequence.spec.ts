
import { Chord, MusicalDuration, Note, RhythmPattern, SPN } from "@datune/core";
import { NoteEvent } from "../notessequence/NoteEvent";
import { TonalApporach } from "../../approaches/tonal/TonalApproach";
import { NotesSequence } from "../notessequence/NotesSequence";

const testNoteTimeSequence = () => {
    const notesTimeSequence = new NotesSequence();
    notesTimeSequence.addEventAtEnd(NoteEvent.from(SPN.C4, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(NoteEvent.from(SPN.E4, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(NoteEvent.from(SPN.G4, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(NoteEvent.from(SPN.B4, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(NoteEvent.from(SPN.D5, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(NoteEvent.from(SPN.F5, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(NoteEvent.from(SPN.A5, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(NoteEvent.from(SPN.C6, MusicalDuration.QUARTER));

    return notesTimeSequence;
}

it("Chord Analyser 4/4", () => {
    const notesTimeSequence = testNoteTimeSequence();
    const harmonicSequence = TonalApporach.create(RhythmPattern.QUARTER, MusicalDuration.QUARTER);
    harmonicSequence.notesTimeSequence.addSequenceAtEnd(notesTimeSequence);
    harmonicSequence.calculateChords();

    const nodes = harmonicSequence.chordSequence.nodes;
    const chords = nodes.map(n => n.event.chord);
    expect(chords[0]).toBe(Chord.CMaj7);
    expect(chords[1]).toBe(Chord.Dm7);
});

it("Chord Analyser 3/4", () => {
    const notesTimeSequence = testNoteTimeSequence();
    const harmonicSequence = TonalApporach.create(RhythmPattern.THIRD, MusicalDuration.QUARTER);
    harmonicSequence.notesTimeSequence.addSequenceAtEnd(notesTimeSequence);
    harmonicSequence.calculateChords();

    const nodes = harmonicSequence.chordSequence.nodes;
    const chords = nodes.map(n => n.event.chord);
    expect(chords[0]).toBe(Chord.C);
    expect(chords[1]).toBe(Chord.B0);
    expect(chords[2]).toBe(Chord.fromNotes(Note.A, Note.C));
});