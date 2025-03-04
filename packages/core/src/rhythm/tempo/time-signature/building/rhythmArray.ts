import type { MusicalDuration } from "../../musical-duration/MusicalDuration";
import type { ArrayRhythm } from "../../../pattern/array";
import { QUARTER } from "../../musical-duration/constants";
import { fromArray as patternFromArray } from "../../../pattern/building";
import { fromPattern } from "./pattern";

export function fromRhythmArray(a: ArrayRhythm, beat: MusicalDuration = QUARTER) {
  const pattern = patternFromArray(...a);

  return fromPattern(pattern, beat);
}
