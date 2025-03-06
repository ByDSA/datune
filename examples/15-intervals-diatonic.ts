import { Intervals as I } from "@datune/core/diatonic";
import { stringifyInterval } from "@datune/strings/diatonic";
import { LangId, loadFromFile } from "@datune/strings/lang";

/* Using constants */
// UNISON, SECOND, ..., FIFTEENTH
console.log("obj", I.SIXTH); // -> Interval { magnitude: 5, direction: 0 }
console.log("toString", I.SIXTH.toString()); // -> "6"
console.log("valueOf", I.SIXTH.valueOf()); // -> 5 (int value)

/* Using functions */
console.log("add", I.add(I.THIRD, I.THIRD).toString()); // THIRD + THIRD = FIFTH
console.log("sub", I.sub(I.UNISON, I.THIRD).toString()); // -> THIRD descendent
console.log("fromInt", I.fromInt(4).toString(), I.fromInt(-4).toString()); // -> FIFTH, FIFTH descendent
console.log("neg", I.neg(I.FIFTH)); // -> Interval { magnitude: 4, direction: 1 } (FIFTH descendent)

/* String parsing */
// Loading language files
loadFromFile( {
  folder: "langs",
  langId: LangId.EN,
} );
loadFromFile( {
  folder: "langs",
  langId: LangId.ES,
} );

// Error: console.log( parseInterval("FIFTH")?.toString() );
console.log("stringify", stringifyInterval(I.FIFTH)?.toString()); // -> "FIFTH"
// Error: console.log( stringifyInterval(I.FIFTH, { langId: LangId.ES })?.toString() );

/* Others */
console.log("abs", I.abs(I.neg(I.UNISON)).toString()); // -> UNISON
console.log("simplify", I.simplify(I.NINTH)); // -> SECOND
// Main intervals: UNISON, FOURTH, FIFTH (and octaved, in both directions)
console.log(
  "isMainInterval",
  I.isMainInterval(I.FOURTH), // -> true
  I.isMainInterval(I.THIRD), // -> false
  I.isMainInterval(I.neg(I.OCTAVE)), // -> true
  I.isMainInterval(I.add(I.FIFTH, I.fromInt(+I.OCTAVE * 4))), // -> true (FIFTH + 4 OCTAVES)
);
