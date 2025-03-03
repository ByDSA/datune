import type { Voicing } from "../Voicing";
import { fromRootIntervals } from "./rootIntervals";
import { IntervalArray, Intervals } from "intervals/symbolic/alt";
import type { Interval as IntervalDiatonic } from "intervals/symbolic/diatonic";
import { Voicing as ChromaticVoicing } from "voicings/relative/chromatic";
import { Voicing as DiatonicVoicing } from "voicings/relative/diatonic";

export function fromVoicings(
  cVoicing: ChromaticVoicing,
  dVoicing: DiatonicVoicing,
): Voicing | null {
  const rootIntervals: IntervalArray = [] as any;

  for (let i = 0; i < cVoicing.length; i++) {
    const semisFromRoot = cVoicing.rootIntervals[i];
    const diatonicInterval: IntervalDiatonic = dVoicing.rootIntervals[i];
    const rootInterval = Intervals.fromIntervals( {
      chromaticInterval: semisFromRoot,
      diatonicInterval,
    } );

    if (!rootInterval)
      return null;

    rootIntervals.push(rootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
