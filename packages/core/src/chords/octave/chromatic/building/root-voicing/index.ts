import { Pitch, rootIntervals as pitchesRootIntervals } from "pitches/chromatic";
import { Voicing } from "voicings/chromatic";
import Chord from "../../Chord";
import fromPitches from "../pitches";

export default function fromRootVoicing(root: Pitch, voicing: Voicing): Chord {
  const pitches = pitchesRootIntervals(root, voicing.rootIntervals);

  return fromPitches(...pitches);
}
