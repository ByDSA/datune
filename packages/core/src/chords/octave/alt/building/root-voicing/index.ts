import type { Voicing } from "voicings/alt";
import type { Pitch } from "pitches/alt";
import type { Chord } from "../../Chord";
import { Pitches as P } from "pitches/alt";
import { fromPitches } from "../pitches";

export function fromRootVoicing(root: Pitch, voicing: Voicing): Chord {
  const pitches = P.rootIntervals(root, voicing.rootIntervals);

  return fromPitches(...pitches);
}
