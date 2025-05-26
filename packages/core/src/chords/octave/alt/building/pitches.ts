import type { PitchArray } from "pitches/alt";
import { fromPitches as PSfrom } from "sets/pitch-set/alt/building";
import { Chord } from "../Chord";
import { from } from "./from";

export function fromPitches(...pitches: PitchArray): Chord {
  return from( {
    pitchSet: PSfrom(...pitches),
    root: pitches[0],
    bass: pitches[0],
  } );
}
