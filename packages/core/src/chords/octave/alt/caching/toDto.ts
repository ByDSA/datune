import { Dto } from ".";
import Chord from "../Chord";

export default function dto(self: Chord): Dto {
  return self.pitches;
}
