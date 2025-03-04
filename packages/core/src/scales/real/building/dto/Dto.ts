import type { Arrays } from "@datune/utils";
import type { Interval as IntervalPitch } from "intervals/real";
import { hash as hashIntervals } from "intervals/real/conversions/hash";

export type Dto = Arrays.NonEmpty<IntervalPitch>;

export function hashDto(dto: Dto): string {
  return dto.map(hashIntervals).join("-");
}
