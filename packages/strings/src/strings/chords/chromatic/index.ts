import { cyclicMod } from "@datune/utils";
import { Chord, toVoicing } from "chords/chromatic";
import { Pitch } from "pitches/chromatic";
import pitchStringify from "strings/pitches/chromatic";
import getVoicingShortName from "strings/voicings/chromatic/shortName";
import { getInversionOf, inv } from "voicings/chromatic";

export default function stringify(chord: Chord): string {
  const voicing = toVoicing(chord);
  const inversion = getInversionOf(voicing);
  const invVoicing = inv(voicing, -inversion);
  const rootPosition = cyclicMod(-inversion, chord.length);
  const rootName = pitchStringify(chord.pitches[rootPosition]);
  const invVoicingShortName = getVoicingShortName(invVoicing);
  let inversionName = "";

  if (inversion !== 0)
    inversionName = getInversionName(chord);

  return rootName + invVoicingShortName + inversionName;
}

function getInversionName(chord: Chord): string {
  const pitch: Pitch = chord.pitches[0];
  const pitchName = pitchStringify(pitch);
  const str = `/${pitchName}`;

  return str;
}
