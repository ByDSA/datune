import { calcFrequency, EQUAL_440 } from "@datune/core/tunings/chromatic";
import Pitch from "../MidiPitch";

export default (self: Pitch): number => {
  const precalcFrequencyWithoutDetuned = calcFrequency(EQUAL_440, self.spn);

  return precalcFrequencyWithoutDetuned * 2 ** (self.detuned / 1200);
};
