import { init } from "@datune/core";
import { Intervals as I, SPNs, Pitches as P } from "@datune/core/chromatic";

init();

/* Using constants */
// P1, m2, M2, ..., P15
console.log( "obj", I.P1 ); // -> 0 (UNISON = 0)
console.log( "toString", I.d5.toString() ); // -> 6
console.log( "valueOf", I.M3.valueOf() ); // -> 4


/* Using functions */
console.log( "add", I.add(I.M3, I.m3) ); // M3 + m3 = P5 (7)
console.log( "sub", I.sub(I.P8, I.P4) ); // P8 - P4 = P5 (7)

// Between pitches
console.log("between", // Shortest interval
  I.between(P.C, P.E), // M3 (4)
  I.between(P.E, P.C), // M3 descendent (-4)
  I.between(P.C, P.A) // m3 descendent (-3)
);
console.log("betweenNext",
  I.betweenNext(P.C, P.E), // M3 (4)
  I.betweenNext(P.E, P.C), // m6 (8)
  I.betweenNext(P.C, P.A) // M6 (9)
);
console.log("betweenSPN",
  I.betweenSPN(SPNs.A4, SPNs.C5), // m3 (3)
  I.betweenSPN(SPNs.C5, SPNs.A4), // m3 descendent (-3)
  I.betweenSPN(SPNs.A4, SPNs.A7) // three octaves (36)
);


/* String parsing */

import { parseInterval, stringifyInterval } from "@datune/strings/chromatic";
import { LangId, loadFromFile } from "@datune/strings/lang";

loadFromFile({folder: "langs", langId: LangId.EN});
loadFromFile({folder: "langs", langId: LangId.ES});

console.log( "parse d5", parseInterval("d5") ); // -> d5 (6)
// Error: console.log( parseInterval("d5", { langId: LangId.ES }) );
console.log( "stringify M9", stringifyInterval(I.M9) ); // -> "M9"
// Error: console.log( stringifyInterval(I.MAJOR_NINTH, { langId: LangId.ES }) );


/* Others */
console.log("neg", I.neg(I.P4)); // -> P4 descendent (-5)
console.log("abs",
  I.abs(I.neg(I.P4)), // -> P4 (5)
  I.abs(I.P4) // -> P4 (5)
);
console.log("simplify", I.simplify(I.P8) ); // -> UNISON (0)
console.log("octaves",
  I.octaves(I.P5), // -> 0
  I.octaves(I.m9), // -> 1
  I.octaves( I.neg(I.M14)), // -> -1
  I.octaves( I.neg(I.P15)), // -> -2
  I.octaves( I.betweenSPN(SPNs.A4, SPNs.C7) ), // -> 2
);