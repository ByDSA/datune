import { cyclicMod } from "@datune/utils";
import { Chord } from "@datune/core/chords/chromatic";
import { toVoicing } from "@datune/core/chords/octave/chromatic/conversions";
import { Pitch } from "@datune/core/pitches/chromatic";
import { inv } from "@datune/core/voicings/relative/chromatic/modifiers";
import { getInversionOf } from "@datune/core/voicings/relative/chromatic/constants";
import { stringifyPitch } from "strings/pitches/chromatic";
import { stringifyShortName } from "strings/voicings/chromatic/shortName";

export function stringifyChord(chord: Chord): string {
  const voicing = toVoicing(chord);
  const inversion = getInversionOf(voicing);
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
