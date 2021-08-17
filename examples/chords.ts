import { Chord, ChordAlt, KeyAlt, Note, NoteAlt, ScaleAlt } from "@datune/core";

let Notes = [Note.C, Note.E, Note.G, Note.AA]; // [C, E, G, A#]
let chord = Chord.fromNotes(...Notes); // C7
console.log(chord.toString());

let notes2 = [NoteAlt.C, NoteAlt.E, NoteAlt.G, NoteAlt.Bb]; // [C, E, G, Bb]
let chord2 = ChordAlt.fromNotes(...notes2); // C7
console.log(chord2.toString());

let notes3 = [NoteAlt.C, NoteAlt.E, NoteAlt.G, NoteAlt.AA]; // [C, E, G, A#]
let chord3 = ChordAlt.fromNotes(...notes3); // C(P1,M3,P5,a6)
console.log(chord3.toString());

let notes4 = [NoteAlt.C, NoteAlt.Eb, NoteAlt.Gb, NoteAlt.Bbb]; // [C, Eb, Gb, Bbb]
let chord4 = ChordAlt.fromNotes(...notes4); // C(P1,M3,P5,a6)
console.log(chord4.toString());

function searcher(chord, root = null) {
    let ret = [];
    for (const scaleAlt of ScaleAlt.sets.all())
        for (const note of Note.all()) {
            const noteAlt = NoteAlt.fromNote(note);
            const tonalityAlt = KeyAlt.from(noteAlt, scaleAlt);
            if (tonalityAlt.containsChord(chord) && (noteAlt == null || noteAlt == root))
                ret.push(tonalityAlt);
        }

    return ret;
}
let c = ChordAlt.Em;
let tonalities = searcher(c, NoteAlt.CC);
for (const tonalityAlt of tonalities)
    console.log(tonalityAlt + " " + tonalityAlt.notes.map(n => n.toString()))