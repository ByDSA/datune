import type { PitchArray } from "pitches/chromatic";
import type { Chord } from "../Chord";
import { fromPitches as PSfrom } from "sets/pitch-sets/chromatic/building";
import { from } from "./from";

export function fromPitches(...pitches: PitchArray): Chord {
  return from( {
    pitchSet: PSfrom(...pitches),
    root: pitches[0],
    bass: pitches[0],
  } );
}
