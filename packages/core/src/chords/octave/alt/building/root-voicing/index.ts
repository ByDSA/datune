import { Pitch, Pitches } from "pitches/alt";
import { Voicing } from "voicings/alt";
import Chord from "../../Chord";
import fromPitches from "../pitches";

export default function fromRootVoicing(root: Pitch, voicing: Voicing): Chord {
  const pitches = Pitches.rootIntervals(root, voicing.rootIntervals);

  return fromPitches(...pitches);
}
