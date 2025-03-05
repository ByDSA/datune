import type { Voicing } from "voicings/chromatic";
import type { Pitch } from "pitches/chromatic";
import type { Chord } from "../../Chord";
import { Pitches as P } from "pitches/chromatic";
import { fromPitches } from "../pitches";

export function fromRootVoicing(root: Pitch, voicing: Voicing): Chord {
  const pitches = P.rootIntervals(root, voicing.rootIntervals);

  return fromPitches(...pitches);
}
