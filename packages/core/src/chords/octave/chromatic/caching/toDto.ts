import type { Arrays } from "@datune/utils";
import type { Dto } from "./Dto";
import { toDto as pitchToDto } from "pitches/chromatic/caching/toDto";
import { Chord } from "../Chord";

export const toDto = (self: Chord): Dto => {
  const dto = self.pitches.map(pitchToDto);

  return dto as Arrays.Number;
};
