import { fromPitches as voicingFromPitches, Voicing } from "voicings/chromatic";
import Chord from "../Chord";

export default function voicing(obj: Chord): Voicing {
  return voicingFromPitches(...obj.pitches);
}
