import { Dto } from "../building";
import SPN from "../SPN";

export default function toDto(obj: SPN): Dto {
  return {
    pitch: obj.pitch,
    octave: obj.octave,
  };
}
