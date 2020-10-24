import { DiatonicAltChord } from "@datune/core/chords/DiatonicAltChord";
import { DiatonicAlt } from "@datune/core/degrees/DiatonicAlt";
import * as init from "@datune/core/initializer";
import { SPN } from "@datune/core/pitches/symbolic/SPN";
import { RhythmPattern } from "@datune/core/rythm/RhythmPattern";
import { MusicalDuration } from "@datune/core/tempo/MusicalDuration";
import { HarmonicSequence } from "./HarmonicSequence";
import { Note } from "./Note";
import { NotesTimeSequence } from "./NotesTimeSequence";
init.settings.default();
init.diatonicAltChords.default();
init.spns.default();
init.musicalDurations.default();

const testNoteTimeSequence = () => {
    const notesTimeSequence = new NotesTimeSequence();
    notesTimeSequence.addEventAtEnd(Note.from(SPN.C4, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(Note.from(SPN.E4, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(Note.from(SPN.G4, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(Note.from(SPN.B4, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(Note.from(SPN.D5, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(Note.from(SPN.F5, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(Note.from(SPN.A5, MusicalDuration.QUARTER));
    notesTimeSequence.addEventAtEnd(Note.from(SPN.C6, MusicalDuration.QUARTER));

    return notesTimeSequence;
}

it("Chord Analyser 4/4", () => {
    const notesTimeSequence = testNoteTimeSequence();
    const harmonicSequence = HarmonicSequence.create(RhythmPattern.QUARTER, MusicalDuration.QUARTER);
    harmonicSequence.notesTimeSequence.addSequenceAtEnd(notesTimeSequence);
    harmonicSequence.calculateChords();

    const nodes = harmonicSequence.chordSequence.nodes;
    const chords = nodes.map(n => n.event.chord);
    expect(chords[0]).toBe(DiatonicAltChord.CMaj7);
    expect(chords[1]).toBe(DiatonicAltChord.Dm7);
});

it("Chord Analyser 3/4", () => {
    const notesTimeSequence = testNoteTimeSequence();
    const harmonicSequence = HarmonicSequence.create(RhythmPattern.THIRD, MusicalDuration.QUARTER);
    harmonicSequence.notesTimeSequence.addSequenceAtEnd(notesTimeSequence);
    harmonicSequence.calculateChords();

    const nodes = harmonicSequence.chordSequence.nodes;
    const chords = nodes.map(n => n.event.chord);
    expect(chords[0]).toBe(DiatonicAltChord.C);
    expect(chords[1]).toBe(DiatonicAltChord.B0);
    expect(chords[2]).toBe(DiatonicAltChord.from([DiatonicAlt.A, DiatonicAlt.C]));
});