import { Pitches as P, Intervals as I } from "@datune/core/alt";
import { Pitches as CP } from "@datune/core/chromatic";
import { Pitches as DP } from "@datune/core/diatonic";
import { parsePitch, stringifyPitch } from "@datune/strings/alt";
import { LangId, loadFromFile } from "@datune/strings/lang";

/* Using constants */
// Normal Pitches: C, D, E, F, G, A, B
console.log("obj", P.Eb); // -> Pitch { diatonic: Pitch { intValue: 2 }, alts: -1 }
console.log("valueOf", P.C.valueOf()); // -> 0 (C=0)
console.log("toString normal", P.C.toString()); // -> C

// Sharp Pitches: CC (C#), DD (D#), ..., BB (B#)
// Flat Pitches: Cb, Db, ..., Bb
console.log("toString Eb", P.Eb.toString()); // -> Eb
console.log("toString D#", P.DD.toString()); // -> D#

/* Using functions */
console.log("add", P.add(P.C, I.d5).toString()); // C + d5 = Gb
console.log(
  "sub",
  P.sub(P.C, I.P4).toString(), // C - P4 = G
  P.sub(P.C, I.neg(I.P4)).toString(), // C - (-P4) = F
  P.sub(P.C, I.d8).toString(), // C - d8 = C#
  P.sub(P.C, I.a8).toString(), // C - a8 = Cb
);
console.log("fromChromatic", P.fromChromatic(CP.Eb).toString()); // D#
console.log("fromDiatonicAlts", P.fromDiatonicAlts(DP.B, -2).toString()); // Bbb
console.log("rootIntervals", P.rootIntervals(P.C, [I.m3, I.P5]).map(String)); // -> [ C + m3 = D#, C + P5 = G ]
console.log("toChromatic", P.toChromatic(P.Eb)); // -> D# (Chromatic)

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
console.log("stringify F##", stringifyPitch(P.FFF)?.toString()); // -> "F♯♯"
console.log("stringify Gbb ES", stringifyPitch(P.Gbb, {
  langId: LangId.ES,
} )?.toString()); // -> "Sol♭♭"

/* Others */
console.log("ALL", P.ALL.length); // -> 49 (7 * 7, all Diatonic Pitches with -3, -2, -1, 0, 1, 2, 3 alts)
