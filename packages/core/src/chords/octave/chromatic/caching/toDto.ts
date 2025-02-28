import { Arrays } from "@datune/utils";
import { Chord } from "../Chord";
import type { Dto } from "./Dto";
import { toDto as pitchToDto } from "pitches/chromatic/caching/toDto";

export const toDto = (self: Chord): Dto => {
  const dto = self.pitches.map(pitchToDto);

  return dto as Arrays.Number;
};
