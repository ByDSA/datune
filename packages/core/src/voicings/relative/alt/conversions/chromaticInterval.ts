import { Arrays } from "@datune/utils";
import { toChromaticInterval } from "intervals/alt";
import { fromRootIntervals as CVFromRootIntervals } from "../../chromatic";
import Voicing from "../Voicing";

export default function toChromatic(obj: Voicing) {
  const arrayVoicing: Arrays.Number = [] as any;

  for (const value of obj.rootIntervals)
    arrayVoicing.push(toChromaticInterval(value));

  return CVFromRootIntervals(...arrayVoicing);
}
