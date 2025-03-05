/* eslint-disable @typescript-eslint/naming-convention */
import { init } from "@datune/core";
import { Keys as AK, Pitches as AP, Scales as AS, Intervals as AI, Degrees as AD, Funcs as AF, Chord as AChord } from "@datune/core/alt";
import { Keys as K, Chords as C, Pitches as P, Intervals as I, Scales as S, Voicings } from "@datune/core/chromatic";
import { stringifyPitch, stringifyScale, stringifyVoicing } from "@datune/strings/chromatic";
import { stringifyPitch as stringifyAPitch, stringifyChord as stringifyAChord } from "@datune/strings/alt";
import { LangId, loadFromFile } from "@datune/strings/lang";

init();

loadFromFile( {
  folder: "langs",
  langId: LangId.EN,
} );
loadFromFile( {
  folder: "langs",
  langId: LangId.ES,
} );

const phrygianScale = S.fromRootIntervals(I.P1, I.m2, I.m3, I.P4, I.P5, I.m6, I.m7);
const CPhrygianKey = K.from(P.C, S.PHRYGIAN);
const C5Chord = C.fromPitches(P.C, P.G);

console.log(
  "Enharmonic C Phrygian key pitches:",
  CPhrygianKey
    .pitches
    .map(p=>stringifyPitch(p))
    .toString(), // C,C♯,D♯,F,G,G♯,A♯
);
console.log(
  "Non-enharmonic C Phrygian key pitches:",
  AK.from(AP.C, AS.PHRYGIAN)
    .pitches
    .map(p=>stringifyAPitch(p))
    .toString(), // C,D♭,E♭,F,G,A♭,B♭
);
console.log(
  "Stringify Phrygian scale:",
  stringifyScale(phrygianScale), // -> "Phrygian"
  stringifyScale(phrygianScale, {
    langId: LangId.ES,
  } ), // -> "Frigia"
);
console.log(
  "Has C Major key the Gm7 chord?",
  K.Cm.hasChord(C.Gm7), // -> true
);
console.log(
  "Has C Phrygian key the C5 chord?",
  CPhrygianKey.hasChord(C5Chord), // -> true
);
console.log(
  "Does Mixolydian scale include m7 interval from root?",
  S.MIXOLYDIAN.rootIntervals.includes(I.m7), // -> true
);
console.log(
  "Does Lydian scale include d5 interval (enharmonic) from root?",
  S.LYDIAN.rootIntervals.includes(I.d5), // -> true
);
console.log(
  "Does Lydian scale include d5 interval (non-enharmonic) from root?",
  AS.LYDIAN.rootIntervals.includes(AI.d5), // -> false
);
console.log(
  "Does Lydian scale include #IV degree (non-enharmonic) from root?",
  AS.LYDIAN.degrees.includes(AD.aIV), // -> true
);
console.log(
  "Which alterations are there in Locrian scale?",
  AS.LOCRIAN.degrees.map(d=>d.alts).toString(), // -> 0,-1,-1,0,-1,-1,-1
);
console.log(
  "Which chord is V7/VI in C Major key?",
  stringifyAChord(AF.V7_VI.getChord(AK.C) as AChord), // -> E7
);
console.log(
  "Which voicing has a chord that has C-F-G pitches?",
  stringifyVoicing(Voicings.fromPitches(P.C, P.F, P.G)),
);
