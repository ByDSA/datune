import type { Interval as DiatonicInterval } from "intervals/diatonic";
import type { Quality } from "intervals/quality";
import { hash as hashIntervalDiatonic } from "intervals/symbolic/diatonic/caching/hashObj";
import { hash as qualityHash } from "intervals/symbolic/quality/conversions/hash";

export type Dto = {
  diatonicInterval: DiatonicInterval;
  quality: Quality;
};

export function hashDto(dto: Dto): string {
  const qHashCode = qualityHash(dto.quality);
  const diHashCode = hashIntervalDiatonic(dto.diatonicInterval);

  return `${diHashCode}${qHashCode}`;
}
