import { type Chord } from "../Chord";
import { type Dto } from "./Dto";

export function toDto(self: Chord): Dto {
  return self.pitches;
}
