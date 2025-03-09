import type { Degree } from "../Degree";
import type { Degree as CDegree } from "degrees/chromatic";
import type { Interval } from "alt";
import { Degrees, type Degree as DDegree } from "degrees/diatonic";
import { fixAlts } from "pitches/alt/fixAlts";
import { calcAlts } from "pitches/alt/calcAlts";
import { toInt } from "intervals/symbolic/alt/quality/conversions";
import { isMainInterval } from "intervals/symbolic/diatonic/isMainInterval";
import { cache } from "../caching/cache";

export function from(dDegree: DDegree, alts: number): Degree {
  const fixedAlts = fixAlts(alts);

  return cache.getOrCreate( {
    diatonicDegree: dDegree,
    alts: fixedAlts,
  } );
}

export function fromDegrees(dDegree: DDegree, cDegree: CDegree): Degree {
  const alts = calcAlts(cDegree, dDegree);

  return from(dDegree, alts);
}

export function fromInterval(interval: Interval): Degree {
  const dDegree = Degrees.fromInt(+interval.diatonicInterval);
  const alts = toInt(interval.quality, isMainInterval(interval.diatonicInterval));

  if (!alts)
    throw new Error();

  return from(dDegree, alts);
}
