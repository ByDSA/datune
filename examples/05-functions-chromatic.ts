import { Funcs as F, Degrees as D, Voicings as V, Keys as K } from "@datune/core/chromatic";
import { useStringify } from "@datune/strings";
import { stringifyDegree } from "@datune/strings/chromatic";

useStringify();

/* Constants */
console.log("obj", F.I); /* -> DegreeFunction {
  degree: 0,
  voicing: Voicing { rootIntervals: [ 0, 4, 7 ], length: 3 },
  degrees: [ 0, 4, 7 ]
} */

/* Properties */
console.log(
  "degree",
  stringifyDegree(F.VSUS4.degree), // -> V
  stringifyDegree(F.bIIIm.degree), // -> bIII
);
console.log(
  "voicing",
  F.V7.voicing
    .toString(), // -> Seventh
);

/* Building */
console.log(
  "fromDegreeVoicing",
  F.fromDegreeVoicing(D.II, V.SEVENTH_MINOR)
    .toString(), // -> IIm7
  F.fromDegrees(D.I, D.IV, D.V)
    .toString(), // -> Isus4
);

/* Compose */
console.log(
  "compose",
  F.compose(F.V7, D.VI).toString(), // -> V7/VI
  F.compose(F.V, D.V, D.V).toString(), // -> V/V/V
  F.compose(F.II7, D.VI).toString(), // -> II7/VI
);

/* Get chord */
console.log(
  "getChord",
  F.V7.getChord(K.C).toString(), // -> G7

);

/* Others */
console.log(
  "getDegrees",
  F.getDegrees(F.I)
    .map(stringifyDegree)
    .toString(), // -> I, III, V
  F.getDegrees(F.ISUS4)
    .map(stringifyDegree)
    .toString(), // -> I, IV, V
);
