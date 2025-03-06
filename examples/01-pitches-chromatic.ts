import { Pitches as P, Intervals as I } from "@datune/core/chromatic";
import { parsePitch, stringifyPitch } from "@datune/strings/chromatic";
import { LangId, loadFromFile } from "@datune/strings/lang";

/* Using constants */
// Normal Pitches: C, D, E, F, G, A, B
console.log("obj", P.A); // -> Pitch { intValue: 9 }
console.log("valueOf", P.C.valueOf()); // -> 0 (C=0)
console.log("toString normal", P.C.toString()); // -> C

// Sharp Pitches: CC (C#), DD (D#), ..., BB (B#)
// Flat Pitches: Cb, Db, ..., Bb
console.log("toString Eb", P.Eb.toString()); // -> D#
console.log("toString D#", P.DD.toString()); // -> D#

/* Using functions */
console.log("add", P.add(P.C, I.M9).toString()); // C + M9 = D
console.log("sub", P.sub(P.C, I.P4).toString()); // C - P4 = G
console.log("fromInt", P.fromInt(6).toString()); // 6 -> F#
console.log("rootIntervals", P.rootIntervals(P.C, [I.m3, I.P5]).map(String)); // -> [ C + m3 = D#, C + P5 = G ]

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

// Parsing
console.log("parse D#", parsePitch("D#")?.toString()); // -> D#
console.log("parse Eb", parsePitch("Eb")?.toString()); // -> D#
console.log("parse DD", parsePitch("DD")); // -> null
console.log("parse Solb ES", parsePitch("Solb", {
  langId: LangId.ES,
} )?.toString()); // -> F#

// Stringify
console.log("stringify G", stringifyPitch(P.G)?.toString()); // -> "G"
console.log("stringify G ES", stringifyPitch(P.G, {
  langId: LangId.ES,
} )?.toString()); // -> "Sol"

/* Others */
console.log("ALL", P.ALL.map(String).toString()); // -> C, C#, ..., B
console.log("NUMBER", P.NUMBER); // -> 12
