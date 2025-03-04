import type { Arrays } from "@datune/utils";
import type { Voicing } from "../Voicing";
import { Intervals } from "intervals/alt";
import { Voicings as CVoicings } from "../../chromatic";

export function toChromaticInterval(obj: Voicing) {
  const arrayVoicing: Arrays.Number = [] as any;

  for (const value of obj.rootIntervals)
    arrayVoicing.push(Intervals.toChromaticInterval(value));

  return CVoicings.fromRootIntervals(...arrayVoicing);
}
