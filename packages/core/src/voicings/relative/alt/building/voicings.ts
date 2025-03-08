import type { Voicing } from "../Voicing";
import type { Interval as DInterval } from "intervals/symbolic/diatonic";
import { IntervalArray, Intervals as I } from "intervals/symbolic/alt";
import { Voicing as CVoicing } from "voicings/relative/chromatic";
import { Voicing as DVoicing } from "voicings/relative/diatonic";
import { fromRootIntervals } from "./rootIntervals";

export function fromVoicings(
  cVoicing: CVoicing,
  dVoicing: DVoicing,
): Voicing | null {
  const rootIntervals: IntervalArray = [] as any;

  for (let i = 0; i < cVoicing.length; i++) {
    const semisFromRoot = cVoicing.rootIntervals[i];
    const diatonicInterval: DInterval = dVoicing.rootIntervals[i];
    const rootInterval = I.fromIntervals( {
      chromaticInterval: semisFromRoot,
      diatonicInterval,
    } );

    if (!rootInterval)
      return null;

    rootIntervals.push(rootInterval);
  }

  return fromRootIntervals(...rootIntervals);
}
