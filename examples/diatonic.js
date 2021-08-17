import { Diatonic, IntervalAlt, IntervalDiatonic, KeyAlt, Note, NoteAlt } from "@datune/core";

// Diatonic: C, D, E, F, G, A, B
let dName = Diatonic.C; // C
let dStr = Diatonic.fromString("D"); // D
let dAdd = Diatonic.C.withAdd(IntervalDiatonic.FIFTH); // G
let dSub = Diatonic.C.withSub(IntervalDiatonic.THIRD); // A
let dInt = Diatonic.fromInt(6); // B

console.log("--Diatonic--");
console.log(dName.toString());
console.log(dStr.toString());
console.log(dAdd.toString());
console.log(dSub.toString());
console.log(dInt.toString());

// Note (12 semitones): C, C