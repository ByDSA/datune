import { Pitch } from "pitches/alt";
import SPN from "../../SPN";
import cache from "../cache";
import { Dto } from "../dto";

export default function from(pitch: Pitch, octave: number): SPN | null {
  if (octave > 10 || octave <= -2)
    return null;

  const dto: Dto = {
    pitch,
    octave,
  };

  return cache.getOrCreate(dto);
}
