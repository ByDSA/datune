import { MidiPitch } from "@datune/midi";
import { Options } from "lang";
import { stringifyPitch } from "strings/pitches/chromatic";

export const stringifyMidiPitch = (pitch: MidiPitch, options?: Options): string => {
  const octavePitchStr = stringifyPitch(pitch.spn.pitch, options);
  const detunedPart = pitch.detuned !== 0 ? ` (${pitch.detuned > 0 ? "+" : ""}${pitch.detuned})` : "";

  return octavePitchStr + (pitch.spn.octave + 1) + detunedPart;
};
