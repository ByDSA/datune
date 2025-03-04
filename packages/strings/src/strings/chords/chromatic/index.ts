import { cyclicMod } from "@datune/utils";
import { Chord } from "@datune/core/chords/chromatic";
import { toVoicing } from "@datune/core/chords/octave/chromatic/conversions";
import { Pitch } from "@datune/core/pitches/chromatic";
import { inv } from "@datune/core/voicings/relative/chromatic/modifiers";
import { getNumInversionOf } from "@datune/core/voicings/relative/chromatic/constants/inversionMap";
import { Voicing, Voicings as V } from "@datune/core/chromatic";
import { stringifyPitch } from "strings/pitches/chromatic";
import { stringifyShortName } from "strings/voicings/chromatic/shortName";

export function stringifyChord(chord: Chord): string {
  const voicing = toVoicing(chord);
  const custom = customStringify(chord, voicing);

  if (custom)
    return custom;

  const inversion = getNumInversionOf(voicing);
  const invVoicing = inv(voicing, -inversion);
  const rootPosition = cyclicMod(-inversion, chord.length);
  const rootName = stringifyPitch(chord.pitches[rootPosition]);
  const invVoicingShortName = stringifyShortName(invVoicing);
  let inversionName = "";

  if (inversion !== 0)
    inversionName = getInversionName(chord);

  return rootName + invVoicingShortName + inversionName;
}

function getInversionName(chord: Chord): string {
  // eslint-disable-next-line prefer-destructuring
  const pitch: Pitch = chord.pitches[0];
  const pitchName = stringifyPitch(pitch);
  const str = `/${pitchName}`;

  return str;
}

function customStringify(chord: Chord, voicing: Voicing): string | null {
  const MAJOR_OVERS = new Set([
    V.MAJOR_OVER_M2, V.MAJOR_OVER_m2,
    V.MAJOR_OVER_m3, V.MAJOR_OVER_P4, V.MAJOR_OVER_d5, V.MAJOR_OVER_a5,
  ]);
  const MINOR_OVERS = new Set([
    V.MINOR_OVER_m2,
    V.MINOR_OVER_M2, V.MINOR_OVER_M3, V.MINOR_OVER_P4, V.MINOR_OVER_d5, V.MINOR_OVER_m7,
  ]);

  if (chord.root === chord.pitches[0]
    && MAJOR_OVERS.has(voicing))
    return stringifyPitch(chord.pitches[1]) + "/" + stringifyPitch(chord.pitches[0]);

  if (chord.root === chord.pitches[0]
    && MINOR_OVERS.has(voicing))
    return stringifyPitch(chord.pitches[1]) + stringifyShortName(V.TRIAD_MINOR) + "/" + stringifyPitch(chord.pitches[0]);

  return null;
}
