import { Chord } from "../../Chord";
import { fromPitches } from "../pitches";
import { Pitch, Pitches } from "pitches/alt";
import type { Voicing } from "voicings/alt";

export function fromRootVoicing(root: Pitch, voicing: Voicing): Chord {
  const pitches = Pitches.rootIntervals(root, voicing.rootIntervals);

  return fromPitches(...pitches);
}
