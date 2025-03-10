import { Intervals as I, Pitches as P, IntervalQualities as IQ } from "@datune/core/alt";
import { Pitches as DP, Intervals as DI } from "@datune/core/diatonic";
import { useStringify } from "@datune/strings";
import { parseInterval } from "@datune/strings/alt";

useStringify();

/* Using constants */
// PERFECT_UNISON, MINOR_SECOND, ..., PERFECT_FIFTEENTH
console.log("obj", I.P1); /* ->
Interval {
  diatonicInterval: Interval { magnitude: 0, direction: 0 },
  quality: Quality { shortName: 'P' }
} */
console.log("toString", I.d5.toString()); // -> "d5"

/* Using functions */
// Modifiers
console.log("add", I.add(I.m3, I.m3)?.toString()); // m3 + m3 = d5
console.log("sub", I.sub(I.P8, I.d4)?.toString()); // P8 - d4 = a5
console.log("mult", I.mult(I.m3, 3)?.toString()); // m3 * 3 = d7

// Builders
console.log("fromIntervalQuality", I.fromIntervalQuality(DI.SEVENTH, IQ.dd)?.toString()); // dd7 (double diminished SEVENTH)

console.log(
  "between", // Shortest interval
  I.between(P.C, P.E)?.toString(), // M3
  I.between(P.E, P.C)?.toString(), // -M3
  I.between(P.C, P.A)?.toString(), // -m3
  I.between(
    P.fromDPitchAlts(DP.C, -2),
    P.fromDPitchAlts(DP.C, 4),
  )?.toString(), // -> (+6)1 (from Cbb to C####)
  I.between(
    P.fromDPitchAlts(DP.C, -4),
    P.fromDPitchAlts(DP.C, 4),
  )?.toString(), // -> (-4)1 (from Cbbbb to C#### of previous octave)
);
console.log(
  "betweenNext",
  I.betweenNext(P.C, P.Eb)?.toString(), // m3
  I.betweenNext(P.C, P.Ab)?.toString(), // m6
  I.betweenNext(P.E, P.CC)?.toString(), // M6
);

// Conversion
console.log(
  "toChromaticInterval",
  I.d5.toChromaticInterval().toString(), // d5 -> d5/a4 (6)
  I.M7.toChromaticInterval().toString(), // M7 (11)
  I.d7.toChromaticInterval().toString(), // d7 -> M6 (9)
  I.dd7.toChromaticInterval().toString(), // dd7 -> m6 (8)
);

/* String parsing */
useStringify();
console.log("parse d5", parseInterval("d5")?.toString()); // -> d5
// Error: console.log( parseInterval("d5", { langId: LangId.ES }) );
console.log("stringify da11", I.da11.toString()); // -> "da11" (double augmented ELEVENTH)
// Error: console.log( stringifyInterval(I.MAJOR_NINTH, { langId: LangId.ES }) );

/* Others */
console.log("neg", I.neg(I.P4).toString()); // -> -P4
console.log(
  "abs",
  I.abs(I.neg(I.d5)).toString(), // -> d5
  I.abs(I.d5).toString(), // -> d5
);
console.log("simplify", I.simplify(I.P8).toString()); // -> P1 (UNISON)
console.log(
  "cyclic", // Only positive intervals between unison to octave
  I.cyclic(I.neg(I.m3)).toString(), // M6 (same pitch applyng M6 or -m3, but in differente octave)
  I.cyclic(I.M9).toString(), // M2 (like "simplify")
  I.cyclic(I.m3).toString(), // m3 (no changes)
);
console.log(
  "serie",
  I.serie( {
    interval: I.P5,
    length: 7,
    startIndex: -1,
  } )?.map(String), // -P5, P1, P5, M9, M13, M17, M21
  I.serie( {
    interval: I.P5,
    length: 7,
    startIndex: -1,
  } )
    ?.map(I.cyclic)
    .sort((a, b)=>+a - +b)
    .map(String), // P1, M2, M3, P4, P5, M6, M7 (Major Scale)
  I.serie( {
    interval: I.P5,
    length: 7,
    startIndex: 0,
  } )
    ?.map(I.cyclic)
    .sort((a, b)=>+a - +b)
    .map(String), // P1, M2, M3, a4, P5, M6, M7 (Lydian Scale)
);
