import { init } from "@datune/core";
import { Intervals as I, Scales as S } from "@datune/core/chromatic";
import { stringifyDegree, stringifyInterval, stringifyIntervalArray, stringifyScale } from "@datune/strings/chromatic";
import { stringifyDegree as stringifyADegree } from "@datune/strings/alt";
import { LangId, loadFromFile } from "@datune/strings/lang";

init();
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
console.log("obj", S.MAJOR); /* ->
Scale {
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
} */

/* Properties */
console.log(
  "rootIntervals",
  stringifyIntervalArray(S.MAJOR.rootIntervals), // -> P1-M2-M3-P4-P5-M6-M7
  stringifyIntervalArray(S.MINOR.rootIntervals), // -> P1-M2-m3-P4-P5-m6-m7
);
console.log(
  "length",
  S.MAJOR.length, // -> 7
  S.PENTATONIC.length, // -> 5
);
console.log(
  "degrees",
  S.MAJOR.degrees.map(stringifyDegree).toString(), // -> I,II,III,IV,V,VI,VII
  S.MINOR.degrees.map(stringifyDegree).toString(), // -> I,II,bIII,IV,V,bVI,bVII
);

/* Building */
console.log(
  "generateByIntervals",
  S.generateByIntervals( {
    interval: I.P5,
    length: 7,
    startIndex: 0,
  } )
    .degrees.map(stringifyDegree)
    .toString(), // -> I,II,III,bV,V,VI,VII (Lydian Scale)
  S.generateByIntervals( {
    interval: I.P5,
    length: 7,
    startIndex: -1,
  } )
    .degrees.map(stringifyDegree)
    .toString(), // -> I,II,III,V,V,VI,VII (Major Scale)
);
console.log(
  "fromIntraIntervals",
  stringifyScale(
    S.fromIntraIntervals(I.M2, I.M2, I.m2, I.M2, I.M2, I.M2, I.m2),
  ), // -> Major Scale
  stringifyScale(
    S.fromIntraIntervals(2, 2, 1, 2, 2, 2, 1),
  ), // -> Major Scale
  stringifyScale(
    S.fromIntraIntervals(I.M2, I.m2, I.M2, I.M2, I.m2, I.M2, I.M2),
  ), // -> Minor Scale
);
console.log(
  "fromRootIntervals",
  stringifyScale(
    S.fromRootIntervals(I.P1, I.M2, I.M3, I.P4, I.P5, I.M6, I.M7),
  ), // -> Major Scale
  stringifyScale(
    S.fromRootIntervals(0, 2, 4, 5, 7, 9, 11),
  ), // -> Major Scale
  stringifyScale(
    S.fromRootIntervals(I.P1, I.m2, I.m3, I.P4, I.P5, I.m6, I.m7),
  ), // -> Phrygian Scale
);

/* Modes */
console.log(
  "mode",
  stringifyScale(S.mode(S.MAJOR, 6)), // -> Minor Scale
  stringifyScale(S.mode(S.MINOR, 3)), // -> Major Scale
  stringifyScale(S.mode(S.HARMONIC_MINOR, 3)), // -> Ionian ♯5
);
console.log(
  "modes",
  S.modes(S.MAJOR)
    .map(
      s=>stringifyScale(s),
    )
    .toString(), // -> Major,Dorian,Phrygian,Lydian,Mixolydian,Minor,Locrian
  S.modes(S.MINOR)
    .map(
      s=>stringifyScale(s),
    )
    .toString(), // -> Minor,Locrian,Major,Dorian,Phrygian,Lydian,Mixolydian
);
console.log(
  "getModeIntraIntervals",
  S.getModeIntraIntervals(S.MAJOR, 6)
    .map(stringifyInterval)
    .toString(), // -> M2,m2,M2,M2,m2,M2,M2 (Minor Scale)
);

/* Others */
console.log(
  "toAlt",
  S.toAlt(S.LYDIAN).degrees.map(stringifyADegree).toString(), // -> I,II,III,♯IV,V,VI,VII
  // Chromatic version can't differentiate between bV and IV#:
  S.LYDIAN.degrees.map(stringifyDegree).toString(), // -> I,II,III,bV,V,VI,VII
);
