import { cyclicMod } from "@datune/utils";
import { Chord, toVoicing } from "@datune/core/chords/alt";
import Options from "lang/Options";
import { Pitch } from "@datune/core/pitches/alt";
import pitchStringify from "strings/pitches/alt";
import getVoicingShortName from "strings/voicings/alt/shortName";
import { getInversionOf, inv } from "@datune/core/voicings/alt";

export default function stringify(chord: Chord, options?: Options): string {
  const voicing = toVoicing(chord);

  if (!voicing)
    return getDefaultName(chord, options);

  const inversion = getInversionOf(voicing);
  const invVoicing = inv(voicing, -inversion);
  const rootPosition = cyclicMod(-inversion, chord.length);
  const rootName = pitchStringify(chord.pitches[rootPosition], options);
  const invVoicingShortName = getVoicingShortName(invVoicing);
  let inversionName = "";

  if (inversion !== 0)
    inversionName = getInversionName(chord, options);

  return rootName + invVoicingShortName + inversionName;
}

function getDefaultName(chord: Chord, options?: Options): string {
  return chord.pitches.map((p) => pitchStringify(p, options)).join("-");
}

function getInversionName(chord: Chord, options?: Options): string {
  const pitch: Pitch = chord.pitches[0];
  const pitchName = pitchStringify(pitch, options);
  const str = `/${pitchName}`;

  return str;
}
