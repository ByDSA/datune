import { Array as IntervalArray } from "intervals/alt";
import cache from "../caching/cache";
import DiatonicAltVoicing from "../Voicing";

export default function fromRootIntervals(...rootIntervals: IntervalArray): DiatonicAltVoicing {
  return cache.getOrCreate(rootIntervals);
}
