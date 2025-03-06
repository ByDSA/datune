import { Chords as C, Keys as K, Pitches as P, Scales as S } from "@datune/core/chromatic";
import { stringifyScale } from "@datune/strings/chromatic";
import { LangId, loadFromFile } from "@datune/strings/lang";

// Loading language files
loadFromFile( {
  folder: "langs",
  langId: LangId.EN,
} );
loadFromFile( {
  folder: "langs",
  langId: LangId.ES,
} );

/* Constants */
console.log("obj", K.C); /* ->
Key {
  root: Pitch { intValue: 0 },
  scale: Scale {
    rootIntervals: [
      0, 2,  4, 5,
      7, 9, 11
    ],
    length: 7,
    degrees: [
      0, 2,  4, 5,
      7, 9, 11
    ],
    toString: [Function (anonymous)]
  },
  length: 7,
  pitches: [
    Pitch { intValue: 0 },
    Pitch { intValue: 2 },
    Pitch { intValue: 4 },
    Pitch { intValue: 5 },
    Pitch { intValue: 7 },
    Pitch { intValue: 9 },
    Pitch { intValue: 11 }
  ]
} */

/* Properties: constants */
console.log(
  "root",
  K.Am.root.toString(), // -> A
);
console.log(
  "scale",
  stringifyScale(K.FFm.scale), // -> Minor
);
console.log(
  "pitches",
  K.Am.pitches.toString(), // -> A,B,C,D,E,F,G
);
console.log(
  "length",
  K.C.length, // -> 7
);

/* Properties: functions */
console.log(
  "hasChord",
  K.C.hasChord(C.G7), // -> true
  K.C.hasChord(C.D), // -> false
);
console.log(
  "hasPitches",
  K.C.hasPitches(P.C, P.D, P.A, P.G), // -> true
  K.C.hasPitches(P.C, P.Eb), // -> false
  K.FFm.hasPitches(P.FF, P.Gb), // -> true
);

/* Building */
console.log(
  "fromRootScale",
  K.from(P.C, S.MAJOR).toString(), // -> C Major
  K.from(P.G, S.MIXOLYDIAN).pitches.toString(), // -> G Mixolydian
);

/* Others */
console.log(
  "rootChord",
  K.rootChord3(K.C)?.toString(), // -> C-E-G (C)
  K.rootChord3(K.Am)?.toString(), // -> A-C-E (Am)
  K.rootChord4(K.C)?.toString(), // -> C-E-G-B (CMaj7)
  K.rootChord4(K.Am)?.toString(), // -> A-C-E-G (Am7)
  K.rootChord3(K.from(P.C, S.LOCRIAN))?.toString(), // -> C-D#-F# (Cº)
  K.rootChord3(K.from(P.C, S.ORIENTAL))?.toString(), // -> C-F-A (F/C)
  K.rootChord4(K.from(P.C, S.ORIENTAL)), // -> null
);
