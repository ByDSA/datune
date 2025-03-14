import type { Interval } from "@datune/core/intervals/chromatic";
import type { SingleStep } from "./SingleStep";
import { cache } from "./cache";

export function from(index: number, interval: Interval | null): SingleStep {
  return cache.getOrCreate( {
    index,
    interval,
  } );
}
