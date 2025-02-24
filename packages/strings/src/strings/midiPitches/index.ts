import { MidiPitch } from "@datune/midi";
import { Options } from "lang";
import chromaticStringify from "strings/pitches/chromatic";

export default (pitch: MidiPitch, options?: Options): string => {
  const octavePitchStr = chromaticStringify(pitch.spn.pitch, options);
  const detunedPart = pitch.detuned !== 0 ? ` (${pitch.detuned > 0 ? "+" : ""}${pitch.detuned})` : "";

  return octavePitchStr + (pitch.spn.octave + 1) + detunedPart;
};
