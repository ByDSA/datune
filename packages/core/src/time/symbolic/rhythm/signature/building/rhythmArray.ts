import { MusicalDuration, QUARTER } from "../../../musical-duration";
import { Array } from "../../array";
import { fromArray as patternFromArray } from "../../pattern";
import fromPattern from "./pattern";

export default function fromRhythmArray(a: Array, beat: MusicalDuration = QUARTER) {
  const pattern = patternFromArray(...a);

  return fromPattern(pattern, beat);
}
