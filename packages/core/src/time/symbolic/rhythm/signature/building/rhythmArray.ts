import { QUARTER } from "../../../musical-duration/constants";
import { default as MusicalDuration } from "../../../musical-duration/MusicalDuration";
import { Array } from "../../array";
import { fromArray as patternFromArray } from "../../pattern/building";
import fromPattern from "./pattern";

export default function fromRhythmArray(a: Array, beat: MusicalDuration = QUARTER) {
  const pattern = patternFromArray(...a);

  return fromPattern(pattern, beat);
}
