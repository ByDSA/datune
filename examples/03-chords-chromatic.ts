import { Chords as C, Pitches as P, Intervals as I, Voicings as V, Keys as K, Funcs as F } from "@datune/core/chromatic";
import { useStringify } from "@datune/strings";
import { parseChord } from "@datune/strings/chromatic";
import { LangId } from "@datune/strings/lang";

/* Using constants */
console.log("obj", C.Cm); /* ->
Chord {
  pitches: [
    Pitch { intValue: 0 },
    Pitch { intValue: 3 },
    Pitch { intValue: 7 }
  ],
  root: Pitch { intValue: 0 },
  length: 3
} */
console.log("toString", C.Cm.toString()); // -> C-D#-G

// Properties: constants
console.log("length", C.Cm.length); // -> 3
console.log("pitches", C.G7.pitches.map(String)); // -> [G, B, D, F]
console.log(
  "root",
  C.FFMaj7.root.toString(), // ->F#
  C.bass(C.C, P.F).root.toString(), // -> F
);

// Properties: functions
console.log(
  "has",
  C.C.has(P.C), // -> true
  C.C.has(P.D), // -> false
);
console.log(
  "hasAny",
  C.C.hasAny(P.C, P.D), // -> true
  C.C.hasAny(P.D, P.F), // -> false
);
console.log(
  "hasAll",
  C.C.hasAll(P.C, P.E), // -> true
  C.C.hasAll(P.C, P.D), // -> false
);

/* Using functions */
// Building
console.log("fromPitches", C.fromPitches(P.C, P.E, P.G, P.Bb).toString()); // -> C-E-G-A# (C7)
console.log("fromRootVoicing", C.fromRootVoicing(P.G, V.TRIAD_SUS4).toString()); // -> G-C-D (Gsus4)
console.log("fromKeyFunction", C.fromKeyFunc(K.C, F.VIm).toString()); // -> A-C-E (Am)

// Modifiers
console.log("add", C.add(C.C, I.M2).toString()); // -> D-F#-A (D)
console.log("sub", C.sub(C.C7, I.P4).toString()); // -> G-B-D-F (G7)
console.log(
  "inv",
  C.inv(C.C).toString(), // -> E-G-C (C/E)
  C.inv(C.C, 2).toString(), // -> G-C-E (C/G)
  C.inv(C.C, 3).toString(), // -> C-E-G (C)
  C.inv(C.C, -1).toString(), // -> G-C-E (C/G)
);
console.log(
  "bass",
  C.bass(C.C, P.F).toString(), // -> F-C-E-G (C/F)
  C.bass(C.C, P.C).toString(), // -> C-E-G (C, same chord)
  C.bass(C.C, P.G).toString(), // -> G-C-E (C/G) (moves G to bass)
);

/* String parsing */
// Parsing
console.log("parse C", parseChord("C")?.toString()); // -> C-E-G (C)
console.log("parse Eb", parseChord("Eb")?.toString()); // -> D#-G-A# (D#)
console.log("parse qwerty", parseChord("qwerty")); // -> null
console.log("parse c major", parseChord("c major")?.toString()); // -> C-E-G (C)
console.log("parse cmaj7b5", parseChord("cmaj7b5")?.toString()); // -> C-E-F#-B (CMaj7b5)
console.log("parse C/F", parseChord("C/F")?.toString()); // -> F-C-E-G (C/F)
console.log("parse Cm/A#", parseChord("Cm/A#")?.toString()); // -> A#-C-D#-G (Cm/A#)
console.log("parse Cm13", parseChord("Cm13")?.toString()); // -> C-D#-G-A#-D-F-A (Cm13)
console.log("parse C13#5b9", parseChord("C13#5b9")?.toString()); // -> C-E-G#-A#-C#-F-A (C13#5♭9)
console.log("parse Sol7 ES", parseChord("Sol7", {
  langId: LangId.ES,
} )?.toString()); // -> G-B-D-F (G7)

// Stringify
useStringify();
console.log("stringify Bº", C.B0.toString()); // -> "Bº"
// Error: console.log("stringify G ES", stringifyChord(C.C7, { langId: LangId.ES })?.toString() );
console.log("stringify C bass F", C.bass(C.C, P.F).toString()); // -> "C/F"
console.log("stringify Cm bass E", C.bass(C.Cm, P.E).toString()); // -> "Cm/E"
console.log("stringify C13b5a9", C.C13b5a9.toString()); // -> "C13♭5♯9"
console.log("stringify C13b5", C.fromRootVoicing(P.C, V.THIRTEENTH_b5).toString()); // -> "C13♭5"

/* Others */
console.log("toVoicing", C.toVoicing(C.G7).toString()); // -> 0-4-7-10 (SEVENTH)
console.log("ALL_NON_INVERSIONS", C.ALL_NON_INVERSIONS.length); // -> 660
console.log("ALL", C.ALL.length); // -> 3468
