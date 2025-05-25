import type { Chord } from "chords/alt";
import type { Voicing } from "voicings/alt";
import { Voicings as V } from "..";

export function fromRootChord(obj: Chord): Voicing {
  return V.fromRootIntervals(...obj.rootIntervals);
}
