import { cyclicMod } from "@datune/utils";
import { Chord } from "@datune/core/chords/alt";
import { toVoicing } from "@datune/core/chords/octave/alt/conversions";
import { Pitch } from "@datune/core/pitches/alt";
import { inv } from "@datune/core/voicings/relative/alt/modifiers/inv";
import { getInversionOf } from "@datune/core/voicings/relative/alt/constants";
import { Options } from "lang/Options";
import { stringifyPitch } from "strings/pitches/alt";
import { stringifyShortName } from "strings/voicings/alt/shortName";

export function stringifyChord(chord: Chord, options?: Options): string {
  const voicing = toVoicing(chord);

  if (!voicing)
    return getDefaultName(chord, options);

  const inversion = getInversionOf(voicing);
  const invVoicing = inv(voicing, -inversion);
  const rootPosition = cyclicMod(-inversion, chord.length);
  const rootName = stringifyPitch(chord.pitches[rootPosition], options);
  const invVoicingShortName = stringifyShortName(invVoicing);
  let inversionName = "";

  if (inversion !== 0)
    inversionName = getInversionName(chord, options);

  return rootName + invVoicingShortName + inversionName;
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
