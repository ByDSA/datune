import type { Voicing } from "voicings/alt";
import type { Pitch } from "pitches/alt";
import type { Chord } from "../Chord";
import { rootIntervals } from "pitches/alt/modifiers";
import { fromPitches } from "./pitches";

export function fromRootVoicing(root: Pitch, voicing: Voicing): Chord {
  const pitches = rootIntervals(root, voicing.rootIntervals);

  return fromPitches(...pitches);
}
