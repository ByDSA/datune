import { EQUAL_440 } from "@datune/core/tunings/chromatic/constants";
import { calcFrequency as tuningCalcFrequency } from "@datune/core/tunings/chromatic/calcs";
import { MidiPitch } from "../MidiPitch";

export const calcFrequency = (self: MidiPitch): number => {
  const precalcFrequencyWithoutDetuned = tuningCalcFrequency(EQUAL_440, self.spn);

  return precalcFrequencyWithoutDetuned * (2 ** (self.detuned / 1200));
};
