import { init } from "@datune/core";
import { Pitches as P, Intervals as I } from "@datune/core/diatonic";

init();

/* Using constants */
// C, D, E, F, G, A, B
console.log( "obj", P.C ); // -> Pitch { intValue: 0 }
console.log( "toString", P.C.toString() ); // -> C
console.log( "valueOf", P.C.valueOf() ); // -> 0 (C = 0)

/* Using functions */
console.log( "add", P.add(P.C, I.FIFTH).toString() ); // C + FIFTH = G
console.log( "sub", P.sub(P.C, I.THIRD).toString() ); // C - THIRD = A
console.log( "fromInt", P.fromInt(6).toString() ); // 6 -> B
console.log( "toChromatic", P.toChromatic(P.G) ); // -> G, Pitch (Chromatic) { intValue: 7 }


/* String parsing */

import { parsePitch, stringifyPitch } from "@datune/strings/diatonic";
import { LangId, loadFromFile } from "@datune/strings/lang";

loadFromFile({folder: "langs", langId: LangId.EN});
loadFromFile({folder: "langs", langId: LangId.ES});

// Parsing
console.log( "parsePitch D", parsePitch("D")?.toString() ); // -> D
console.log( "parsePitch Re ES", parsePitch("Re", { langId: LangId.ES })?.toString() ); // -> D

// Stringify
console.log( "stringify G", stringifyPitch(P.G)?.toString() ); // -> "G"
console.log( "stringify G ES", stringifyPitch(P.G, { langId: LangId.ES })?.toString() ); // -> "Sol"


/* Others */
console.log("ALL", P.ALL); // -> [ Pitch { intValue: 0 }, ..., Pitch { intValue: 6 } ]
console.log("NUMBER", P.NUMBER); // -> 7