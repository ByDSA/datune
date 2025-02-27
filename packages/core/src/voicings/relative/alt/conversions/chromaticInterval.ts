import { Arrays } from "@datune/utils";
import { Intervals } from "intervals/alt";
import { Voicings as CVoicings } from "../../chromatic";
import Voicing from "../Voicing";

export default function toChromatic(obj: Voicing) {
  const arrayVoicing: Arrays.Number = [] as any;

  for (const value of obj.rootIntervals)
    arrayVoicing.push(Intervals.toChromaticInterval(value));

  return CVoicings.fromRootIntervals(...arrayVoicing);
}
