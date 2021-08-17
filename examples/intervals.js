import { Interval, IntervalAlt, IntervalDiatonic, Note, NoteAlt, Quality } from "@datune/core";

// IntervalDiatonic: UNISON, SECOND, THIRD...
let iDName = IntervalDiatonic.FIFTH; // FIFTH
let iDInt = IntervalDiatonic.from(2); // THIRD
let iDAdd = IntervalDiatonic.FIFTH.withAdd(IntervalDiatonic.FIFTH); // NINTH
let iDSub = IntervalDiatonic.UNISON.withSub(IntervalDiatonic.FIFTH); // FOURTH

console.log("--IntervalDiatonic--");
console.log(iDName.toString());
console.log(iDInt.toString());
console.log(iDAdd.toString());
console.log(iDSub.toString());

// Interval (12 semitones)
let i = Interval.PERFECT_FIFTH; // 7
let iBetween = Interval.between(Note.C, Note.A); // 9

console.log("--Interval--");
console.log(i);
console.log(iBetween);

// IntervalAlt: PERFECT UNISON, MINOR SECOND, MAJOR SECOND...
let iAltName = IntervalAlt.PERFECT_FIFTH; // P5
let iAlt = IntervalAlt.from(IntervalDiatonic.THIRD, Quality.MINOR); // m3
let iAltIntervals = IntervalAlt.fromIntervals(6, IntervalDiatonic.FOURTH); // a4
let iAltStr = IntervalAlt.fromString("P4"); // P4
let iAltBetween = IntervalAlt.between(NoteAlt.C, NoteAlt.Bbb); // d7
let iAltAdd = IntervalAlt.MINOR_SIXTH.withAdd(IntervalAlt.MINOR_SIXTH); // d11
let iAltSub = IntervalAlt.PERFECT_UNISON.withSub(IntervalAlt.MAJOR_THIRD); // m6

console.log("--IntervalAlt--");
console.log(iAltName.toString());
console.log(iAlt.toString());
console.log(iAltIntervals.toString());
console.log(iAltStr.toString());
console.log(iAltBetween.toString());
console.log(iBetween.toString())
console.log(iAltAdd.toString());
console.log(iAltSub.toString());
