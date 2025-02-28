import { QUARTER } from "../../../musical-duration/constants";
import type { MusicalDuration } from "../../../musical-duration/MusicalDuration";
import type { Array } from "../../array";
import { fromArray as patternFromArray } from "../../pattern/building";
import { fromPattern } from "./pattern";

export function fromRhythmArray(a: Array, beat: MusicalDuration = QUARTER) {
  const pattern = patternFromArray(...a);

  return fromPattern(pattern, beat);
}
