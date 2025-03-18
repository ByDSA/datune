import type { Voicing } from "../Voicing";
import { NonEmptyNumberArray } from "datils";
import { Intervals as CI } from "intervals/chromatic";
import { Voicings as CVoicings } from "../../chromatic";

export function toChromaticInterval(obj: Voicing) {
  const arrayVoicing: NonEmptyNumberArray = [] as any;

  for (const value of obj.rootIntervals)
    arrayVoicing.push(CI.fromAltInterval(value));

  return CVoicings.fromRootIntervals(...arrayVoicing);
}
