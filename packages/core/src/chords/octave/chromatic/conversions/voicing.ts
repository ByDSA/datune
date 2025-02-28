import type { Chord } from "../Chord";
import type { Voicing } from "voicings/chromatic";
import { Voicings } from "voicings/chromatic";

export function toVoicing(obj: Chord): Voicing {
  return Voicings.fromPitches(...obj.pitches);
}
