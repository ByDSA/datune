import { init } from "@datune/core";
import { Funcs as F, Degrees as D, Voicings as V, Keys as K } from "@datune/core/chromatic";
import { stringifyDegree, stringifyVoicing, stringifyFunc } from "@datune/strings/chromatic";
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
  "degrees",
  F.I.degrees.map(stringifyDegree).toString(), // -> I, III, V
  F.ISUS4.degrees.map(stringifyDegree).toString(), // -> I, IV, V
);
console.log(
  "voicing",
  stringifyVoicing(F.V7.voicing), // -> Seventh
);

/* Building */
console.log(
  "from",
  stringifyFunc(F.from( {
    degree: D.II,
    voicing: V.SEVENTH_MINOR,
  } )), // -> IIm7
);

/* Compose */
console.log(
  "compose",
  stringifyFunc(F.compose(F.V7, D.VI)), // -> V7/VI
  stringifyFunc(F.compose(F.V, D.V, D.V)), // -> V/V/V
  stringifyFunc(F.compose(F.II7, D.VI)), // -> II7/VI
);

/* Get chord */
console.log(
  "getChord",
  F.V7.getChord(K.C),

);

if (Math.random() < 2)
  throw new Error();

/* Stringify */
console.log(
  "stringify",
  stringifyFunc(F.II7), // -> "II7"
  stringifyFunc(F.V7_V), // -> "V7/V"
  stringifyFunc(F.V7ALT), // ->"V7/V"
);
