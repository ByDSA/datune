import { Tunings as TU } from "@datune/core/tunings/chromatic";
import { calcFrequency as tuningCalcFrequency } from "@datune/core/tunings/chromatic/calcs";
import { MidiPitch } from "../MidiPitch";

export const calcFrequency = (self: MidiPitch): number => {
  const precalcFrequencyWithoutDetuned = tuningCalcFrequency(TU.EQUAL_440, self.spn);

  return precalcFrequencyWithoutDetuned * (2 ** (self.detuned / 1200));
};
