import { Array as IntervalArray, fromIntervals as DAIFromIntervals } from "intervals/symbolic/alt";
import { Interval as IntervalDiatonic } from "intervals/symbolic/diatonic";
import { Voicing as ChromaticVoicing } from "voicings/relative/chromatic";
import { Voicing as DiatonicVoicing } from "voicings/relative/diatonic";
import Voicing from "../Voicing";
import fromRootIntervals from "./rootIntervals";

export function fromVoicings(
  cVoicing: ChromaticVoicing,
  dVoicing: DiatonicVoicing,
): Voicing | null {
  const rootIntervals: IntervalArray = [] as any;

  for (let i = 0; i < cVoicing.length; i++) {
    const semisFromRoot = cVoicing.rootIntervals[i];
    const diatonicInterval: IntervalDiatonic = dVoicing.rootIntervals[i];
    const rootInterval = DAIFromIntervals( {
      chromaticInterval: semisFromRoot,
      diatonicInterval,
    } );

    if (!rootInterval)
      return null;

    rootIntervals.push(rootInterval);
  }

  return <Voicing> fromRootIntervals(...<IntervalArray>rootIntervals);
}

export {
  default as fromIntraIntervals,
} from "./intraIntervals";

export {
  default as fromRootIntervals,
} from "./rootIntervals";
