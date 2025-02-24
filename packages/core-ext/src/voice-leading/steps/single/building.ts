/* eslint-disable import/prefer-default-export */
import { Interval } from "@datune/core/intervals/chromatic";
import cache from "./cache";
import SingleStep from "./SingleStep";

export function from(index: number, interval: Interval | null): SingleStep {
  return cache.getOrCreate( {
    index,
    interval,
  } );
}
