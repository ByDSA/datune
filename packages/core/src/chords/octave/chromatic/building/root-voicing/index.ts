import type { Voicing } from "voicings/chromatic";
import { Pitch, Pitches } from "pitches/chromatic";
import { Chord } from "../../Chord";
import { fromPitches } from "../pitches";

export function fromRootVoicing(root: Pitch, voicing: Voicing): Chord {
  const pitches = Pitches.rootIntervals(root, voicing.rootIntervals);

  return fromPitches(...pitches);
}
