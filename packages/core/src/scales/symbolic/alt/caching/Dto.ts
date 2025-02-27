import { IntervalArray } from "intervals/alt";

export type Dto = IntervalArray;

import { Intervals } from "intervals/alt";

export function hashDto(dto: Dto): string {
  return dto.map(Intervals.hash).join("|");
}
