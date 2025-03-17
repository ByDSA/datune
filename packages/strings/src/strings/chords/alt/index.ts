import { cyclicMod } from "@datune/utils";
import { Chord } from "@datune/core/chords/alt";
import { Pitch } from "@datune/core/pitches/alt";
import { inv } from "@datune/core/voicings/relative/alt/modifiers/inv";
import { getNumInversionOf } from "@datune/core/voicings/relative/alt/constants/inversionMap";
import { Voicing, Voicings as V, PitchArray } from "@datune/core/alt";
import { fromPitches } from "@datune/core/chords/octave/alt/building";
import { Options } from "lang/Options";
import { stringifyPitch } from "strings/pitches/alt";
import { stringifyShortName } from "strings/voicings/alt/shortName";

export function stringifyChord(chord: Chord, options?: Options): string {
  const simplifiedChord = removeRepeatedPitches(chord);
  const voicing = simplifiedChord.toVoicing();

  if (!voicing)
    return getDefaultName(simplifiedChord, options);

  const custom = customStringify(simplifiedChord, voicing);

  if (custom)
    return custom;

  const inversion = getNumInversionOf(voicing);
  const invVoicing = inv(voicing, -inversion);
  const rootPosition = cyclicMod(-inversion, simplifiedChord.length);
  const rootName = stringifyPitch(simplifiedChord.pitches[rootPosition], options);
  const invVoicingShortName = stringifyShortName(invVoicing);
  let inversionName = "";

  if (inversion !== 0)
    inversionName = getInversionName(simplifiedChord, options);

  return rootName + invVoicingShortName + inversionName;
}

function removeRepeatedPitches(chord: Chord): Chord {
  const pitches: PitchArray = [] as any;
  const added = new Set<Pitch>();

  for (const p of chord.pitches) {
    if (!added.has(p)) {
      pitches.push(p);

      added.add(p);
    }
  }

  return fromPitches(...pitches);
}

function getDefaultName(chord: Chord, options?: Options): string {
  return chord.pitches.map((p) => stringifyPitch(p, options)).join("-");
}

function getInversionName(chord: Chord, options?: Options): string {
  // eslint-disable-next-line prefer-destructuring
  const pitch: Pitch = chord.pitches[0];
  const pitchName = stringifyPitch(pitch, options);
  const str = `/${pitchName}`;

  return str;
}

let MAJOR_OVERS: Set<Voicing>;
let MINOR_OVERS: Set<Voicing>;

function customStringify(chord: Chord, voicing: Voicing): string | null {
  if (!MAJOR_OVERS) {
    MAJOR_OVERS = new Set([
      V.MAJOR_OVER_M2, V.MAJOR_OVER_m2,
      V.MAJOR_OVER_m3, V.MAJOR_OVER_P4, V.MAJOR_OVER_a4, V.MAJOR_OVER_d5,
      V.MAJOR_OVER_m6, V.MAJOR_OVER_a5,
    ]);

    MINOR_OVERS = new Set([
      V.MINOR_OVER_m2,
      V.MINOR_OVER_M2, V.MINOR_OVER_M3, V.MINOR_OVER_P4, V.MINOR_OVER_a4,
      V.MINOR_OVER_d5, V.MINOR_OVER_m7,
    ]);
  }

  if (chord.root === chord.pitches[0]
    && MAJOR_OVERS.has(voicing))
    return stringifyPitch(chord.pitches[1]) + "/" + stringifyPitch(chord.pitches[0]);

  if (chord.root === chord.pitches[0]
    && MINOR_OVERS.has(voicing))
    return stringifyPitch(chord.pitches[1]) + stringifyShortName(V.TRIAD_MINOR) + "/" + stringifyPitch(chord.pitches[0]);

  return null;
}
