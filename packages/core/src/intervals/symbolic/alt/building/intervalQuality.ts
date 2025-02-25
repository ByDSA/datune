import { Interval as IntervalDiatonic, isMainInterval, UNISON } from "intervals/diatonic";
import { PERFECT, Quality, toInt as qualityToInt } from "intervals/quality";
import Interval from "../Interval";
import cache from "../caching/cache";

export default function from(
  diatonicInterval: IntervalDiatonic,
  quality: Quality,
): Interval | null {
  const isMainValue = isMainInterval(diatonicInterval);
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
  diatonicInterval: IntervalDiatonic,
  quality: Quality,
): IntervalDiatonic {
  if (diatonicInterval.magnitude === 0 && quality === PERFECT)
    return UNISON;

  return diatonicInterval;
}
