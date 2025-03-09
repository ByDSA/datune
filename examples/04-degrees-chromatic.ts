import { Degrees as D, Intervals as I } from "@datune/core/chromatic";
import { stringifyDegree } from "@datune/strings/chromatic";

/* Constants */
console.log(
  "obj",
  D.I, // -> 0
  D.bV, // -> 6
  D.bVII, // -> 10
);

/* Building */
console.log(
  "fromInt",
  D.fromInt(1), // -> 1 (I)
  D.fromInt(-1), // -> 11 (12 - 1, VII)
  D.fromInt(14), // -> 2 (14 % 12, II)
);

/* Modifiers */
console.log(
  "add",
  D.add(D.III, I.m3), // -> 7 (V)
  D.add(D.I, I.P8), // -> 0 (I)
);
console.log(
  "sub",
  D.sub(D.III, I.M3), // -> 0 (I)
  D.sub(D.I, I.m3), // -> 9 (VI)
);

/* Stringify */
console.log(
  "toString",
  D.V.toString(), // -> "7"
);
console.log(
  "stringify",
  stringifyDegree(D.V), // -> "V"
);
