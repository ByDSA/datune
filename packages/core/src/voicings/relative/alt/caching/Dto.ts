import type { IntervalArray } from "intervals/alt";
import { hash as hashIntervals } from "intervals/symbolic/alt/caching/hashObj";

export type Dto = IntervalArray;

export function hashDto(dto: Dto): string {
  return dto.map(hashIntervals).join("-");
}
