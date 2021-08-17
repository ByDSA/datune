import { Chord, ChordAlt, Func, KeyAlt, Note, NoteAlt, PatternAlt } from "@datune/core";

// Chord
let c = Chord.C; // C
let cNotes = Chord.fromNotes(Note.C, Note.E, Note.G, Note.AA); // C7
let cString = Chord.fromString("CMaj7"); // CMaj7
let cRootPattern;
let cKeyFunc;
let cInv = Chord.C.withInv(2); // C/G
let cShift = Chord.C7.withShift(3); // D