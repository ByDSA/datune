import type { Quality } from "../quality/Quality";
import { hash as qualityHash } from "../quality/conversions/hash";
import type { Interval as DiatonicInterval } from "intervals/diatonic";
import { hash as hashIntervalDiatonic } from "intervals/symbolic/diatonic/caching/hashObj";

export type Dto = {
  diatonicInterval: DiatonicInterval;
  quality: Quality;
};

export function hashDto(dto: Dto): string {
  const qHashCode = qualityHash(dto.quality);
  const diHashCode = hashIntervalDiatonic(dto.diatonicInterval);

  return `${diHashCode}${qHashCode}`;
}
