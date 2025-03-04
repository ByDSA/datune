import type { Interval } from "../Interval";
import type { Quality } from "../quality/Quality";
import type { Interval as DInterval } from "intervals/diatonic";
import { Intervals } from "intervals/diatonic";
import { UNISON } from "intervals/symbolic/diatonic/constants";
import { toInt as qualityToInt } from "../quality/conversions";
import { P } from "../quality/constants";
import { cache } from "../caching/cache";

export function fromIntervalQuality(
  diatonicInterval: DInterval,
  quality: Quality,
): Interval | null {
  const isMainValue = Intervals.isMainInterval(diatonicInterval);
  const qualityInt = qualityToInt(quality, isMainValue);

  if (qualityInt === null)
    return null;

  const fixedDiatonicInterval = fixDiatonicInterval(diatonicInterval, quality);

  return cache.getOrCreate( {
    diatonicInterval: fixedDiatonicInterval,
    quality,
  } );
}

// P1 === -P1
function fixDiatonicInterval(
  diatonicInterval: DInterval,
  quality: Quality,
): DInterval {
  if (diatonicInterval.magnitude === 0 && quality === P)
    return UNISON;

  return diatonicInterval;
}
