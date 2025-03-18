/* eslint-disable @typescript-eslint/naming-convention */
import { Keys as AK, Pitches as AP, Scales as AS, Intervals as AI, Degrees as AD, Funcs as AF } from "@datune/core/alt";
import { Keys as K, Chords as C, Pitches as P, Intervals as I, Scales as S, Voicings as V, Funcs, Spns as N, SpnArray, PitchArray } from "@datune/core/chromatic";
import { useStringify } from "@datune/strings";
import { stringifyDegree, stringifyScale } from "@datune/strings/chromatic";
import { parseChord as parseAChord } from "@datune/strings/alt";
import { LangId } from "@datune/strings/lang";
import { scaleFindVoicings } from "@datune/core-ext/scales";
import { TRIAD_MINOR, TRIAD_SUS4 } from "@datune/core/voicings/relative/chromatic/constants";
import { VoiceLeadings as VL } from "@datune/core-ext/voice-leading";

useStringify();

const phrygianScale = S.fromRootIntervals(I.P1, I.m2, I.m3, I.P4, I.P5, I.m6, I.m7);
const CPhrygianKey = K.from(P.C, S.PHRYGIAN);

console.log(
  "Enharmonic C Phrygian key pitches:",
  CPhrygianKey
    .pitches
    .toString(), // C,C♯,D♯,F,G,G♯,A♯
);
console.log(
  "Non-enharmonic C Phrygian key pitches:",
  AK.from(AP.C, AS.PHRYGIAN)
    .pitches
    .toString(), // C,D♭,E♭,F,G,A♭,B♭
);
console.log(
  "I want the pitches of CMaj13#5b9 chord:",
  parseAChord("CMaj13#5b9")?.pitches.toString(),
);
console.log(
  "What's the name of the diatonic scale with ♭V degree?",
  Array.from(AS.DIATONIC_SCALES)
    .filter(s=>s.degrees.includes(AD.bV))[0]
    .toString(), // -> "Locrian" ("P1-m2-m3-P4-d5-m6-m7" without useStringify)
  "And the scale with ♯IV?",
  Array.from(AS.DIATONIC_SCALES)
    .filter(s=>s.degrees.includes(AD.aIV))[0]
    .toString(), // -> "Lydian" ("P1-M2-M3-a4-P5-M6-M7" without useStringify)
);
console.log(
  "Quiero usar los nombres de las escalas en castellano:",
  stringifyScale(phrygianScale, {
    langId: LangId.ES, // o usa antes: useStringify( {lang: LangId.ES } );
  } ), // -> "Frigia"
);
console.log(
  "Has C Major key the Gm7 chord?",
  K.Cm.hasChord(C.Gm7), // -> true
);
console.log(
  "Has C Phrygian key the C chord?",
  CPhrygianKey.hasChord(C.C), // -> false
);
console.log(
  "Does Mixolydian scale include m7 interval from root?",
  S.MIXOLYDIAN.rootIntervals.includes(I.m7), // -> true
);
console.log(
  "Does Lydian scale include d5 interval from root?",
  "enharmonic:",
  S.LYDIAN.rootIntervals.includes(I.d5), // -> true
  "non-enharmonic:",
  AS.LYDIAN.rootIntervals.includes(AI.d5), // -> false
  "degree " + AD.aIV.toString() + ":",
  AS.LYDIAN.degrees.includes(AD.aIV), // -> true
);
console.log(
  "Does Lydian scale include #IV degree (non-enharmonic) from root?",
  AS.LYDIAN.degrees.includes(AD.aIV), // -> true
);
console.log(
  "Which alterations are there in Lydian scale?",
  AS.LOCRIAN.degrees
    .filter(d=>d.alts !== 0)
    .toString(), // -> ♭II,♭III,♭V,♭VI,♭VII
);
console.log(
  "Which chord is V7/VI in C Major key?",
  AF.V7_VI.getChord(AK.C)?.toString(), // -> E7
);
console.log(
  "Which voicing has a chord that has C-F-G pitches?",
  V.fromPitches(P.C, P.F, P.G).toString(), // -> Sus4
);

console.log(
  "Which Major and Minor triads are there in a minor scale?",
  scaleFindVoicings(S.MINOR, [V.TRIAD_MAJOR, TRIAD_MINOR])
    .map(a=>a.map(stringifyDegree).join("-")),
);
console.log(
  "Which sus4 and sus2 triads are there in C minor key?",
  scaleFindVoicings(S.MINOR, [V.TRIAD_SUS2, TRIAD_SUS4])
    .map(a=>Funcs.fromDegrees(...a).getChord(K.C))
    .map(String),
);

/* Voice Leading */
const base = [N.G4, N.B4, N.D5, N.F5] as SpnArray;
const voiceLeadingProps = {
  multipleGenConfig: {
    filters: [VL.StepsGen.processors.createAllowedPitchesFilter(base, K.C.pitches)],
    requireAnyResolution: true,
    keyResolution: {
      restingPitches: [P.C, P.E, P.G] as PitchArray,
    },
  },
};
const result = VL.generate(base, voiceLeadingProps);

console.log(
  "Where does G7 chord resolve (4-length chords) in C Major Key?",
  "There are " + result.targets.length + " chords:",
  JSON.stringify(
    VL.handleResult(result)
      .toChordMotionReasons()
      .map(cmr=>cmr.chord.toString() + " (" + cmr.target.map(n=>n?.pitch) + ")"),
    null,
    2,
  ),
);
const resultWithoutTensions = VL.generate(base, {
  ...voiceLeadingProps,
  combinationApplierConfig: {
    afterFilters: [
      VL.Appliers.processors.createDisallowInnerVoicingsFilter(V.M2, V.m2, V.TRITONE, V.m7, V.M7),
    ],
  },
} );

console.log(
  "Too many chords. I want only target chords without tensions/clusters, and know why.",
  "\nOkay, so there are " + resultWithoutTensions.targets.length + " chords:",
  JSON.stringify(VL.handleResult(resultWithoutTensions).toReadableChordMotionReasons(), null, 2),
);
