import { init } from "@datune/core";
import { Chords as C, Pitches as P, Intervals as I, Voicings as V, Keys as K, Functions as F } from "@datune/core/alt";

init();

/* Using constants */
console.log( "obj", C.Cm ); /* ->
Chord {
  pitches: [
    Pitch { diatonic: [Pitch], alts: 0 },
    Pitch { diatonic: [Pitch], alts: -1 },
    Pitch { diatonic: [Pitch], alts: 0 }
  ],
  root: Pitch { diatonic: Pitch { intValue: 0 }, alts: 0 },
  length: 3
}*/
console.log("toString",
  C.Cm.toString(), // -> "C-Eb-G"
  C.FFm.toString() // -> "F#-A-C#" (F#-A-C#)
);

// Properties: constants
console.log( "length", C.Cm.length ); // -> 3
console.log( "pitches", C.G7.pitches.map(String) ); // -> [G, B, D, F]
console.log( "root",
  C.FFMaj7.root.toString(), // ->F#
  C.bass(C.C, P.F).root.toString(), // -> F
);

// Properties: functions
console.log( "has",
  C.Cm.has(P.Eb), // -> true
  C.Cm.has(P.DD) // -> false
);
console.log( "hasAny",
  C.C.hasAny(P.C, P.D), // -> true
  C.C.hasAny(P.D, P.F), // -> false
);
console.log( "hasAll",
  C.Cm.hasAll(P.C, P.Eb), // -> true
  C.Cm.hasAll(P.Eb, P.DD), // -> false
);


/* Using functions */
// Building
console.log( "fromPitches", C.fromPitches(P.C, P.E, P.G, P.Bb).toString() ); // -> C-E-G-Bb (C7)
console.log( "fromRootVoicing", C.fromRootVoicing(P.G, V.TRIAD_SUS4).toString() ); // -> G-C-D (Gsus4)
console.log( "fromKeyFunction", C.fromKeyFunction(K.C, F.VIm).toString() ); // -> A-C-E (Am)

// Modifiers
console.log( "add",
  C.add(C.C, I.M2).toString(), // D-F#-A (D)
  C.add(C.Cm, I.d5).toString(), // Gb-Bbb-Db (Gbm)
  C.add(C.Cm, I.a4).toString() // F#-A-C# (F#m)
);
console.log( "sub", C.sub(C.C7, I.P4).toString()); // G-B-D-F (G7)
console.log( "inv",
  C.inv(C.Cm).toString(), // Eb-G-C (C/Eb)
  C.inv(C.Cm, 2).toString(), // G-C-Eb (C/G)
  C.inv(C.Cm, 3).toString(), // C-E-G (C)
  C.inv(C.Cm, -1).toString(), // G-C-Eb (C/G)
);
console.log( "bass",
  C.bass(C.Cm, P.F).toString(), // F-C-Eb-G (Cm/F)
);

/* String parsing */

import { parseChord, stringifyChord } from "@datune/strings/alt";
import { LangId, loadFromFile } from "@datune/strings/lang";

loadFromFile({folder: "langs", langId: LangId.EN});
loadFromFile({folder: "langs", langId: LangId.ES});

// Parsing
console.log("parse F#m", parseChord("F#m")?.toString() ); // -> F#-A-C# (F#m)
console.log("parse Eb", parseChord("Eb")?.toString() ); // -> Eb-G-Bb (Eb)
console.log("parse qwerty", parseChord("qwerty") ); // -> null
console.log("parse c minor", parseChord("c minor")?.toString() ); // -> C-Eb-G (Cm)
console.log("parse cmaj7b5", parseChord("cmaj7b5")?.toString() ); // -> C-E-Gb-B (CMaj7b5)
console.log("parse Cm/F", parseChord("Cm/F")?.toString() ); // -> F-C-Eb-G (Cm/F)
console.log("parse Cm/A#", parseChord("Cm/A#")?.toString() ); // -> A#-C-D#-G (Cm/A#)
console.log("parse Cm13", parseChord("Cm13")?.toString() ); // -> C-Eb-G-Bb-D-F-A (Cm13)
console.log("parse C13#5b9", parseChord("C13#5b9")?.toString() ); // -> C-E-G#-Bb-Db-F-A (C13#5♭9)
console.log("parse Sol7 ES", parseChord("Sol7", { langId: LangId.ES })?.toString() ); // -> G-B-D-F (G7)

// Stringify
console.log("stringify Bº", stringifyChord(C.B0)?.toString() ); // -> "Bº"
// Error: console.log("stringify G ES", stringifyChord(C.C7, { langId: LangId.ES })?.toString() );
console.log("stringify C bass F", stringifyChord(C.bass(C.C, P.F))?.toString() ); // -> "C/F"
console.log("stringify Cm bass E", stringifyChord(C.bass(C.Cm, P.E))?.toString() ); // -> "Cm/E"
console.log("stringify CMaj13b5a9", stringifyChord(C.CMaj13b5a9)?.toString() ); // -> "CMaj13♭5♯9"
console.log("stringify C13b5", stringifyChord(C.fromRootVoicing(P.C, V.THIRTEENTH_b5))?.toString() ); // -> "C13♭5"


/* Others */
console.log("toVoicing", C.toVoicing(C.G7).toString()); // -> P1-M3-P5-m7 (SEVENTH)
console.log("ALL_NON_INVERSIONS", C.ALL_NON_INVERSIONS.length); // -> 2695
console.log("ALL", C.ALL.length); // -> 14357