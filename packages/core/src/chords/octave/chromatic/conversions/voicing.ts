import { Voicings, Voicing } from "voicings/chromatic";
import Chord from "../Chord";

export default function voicing(obj: Chord): Voicing {
  return Voicings.fromPitches(...obj.pitches);
}
