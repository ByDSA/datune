import type { Dto } from "./Dto";
import { Intervals as DIntervals } from "intervals/diatonic";
import { hash as qualityHash } from "intervals/quality";

export function hash(dto: Dto): string {
  const qHashCode = qualityHash(dto.quality);
  const diHashCode = DIntervals.hash(dto.diatonicInterval);

  return `${diHashCode}${qHashCode}`;
}
