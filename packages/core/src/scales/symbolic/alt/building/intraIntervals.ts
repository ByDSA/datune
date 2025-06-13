import type { Scale } from "../Scale";
import type { Interval } from "intervals/alt";
import { Intervals as I } from "intervals/alt";
import { cache, type Key } from "../caching/cache";

export function fromIntraIntervals(...intervals: Key): Scale {
  checkSumOctave(intervals);

  return cache.getOrCreate(intervals);
}

function checkSumOctave(intervals: Key): void {
  let sum: Interval | null = I.P1;

  for (let i = 0; i < intervals.length; i++) {
    if (sum === null)
      break;

    sum = I.shift(sum, intervals[i]);
  }

  if (sum !== I.P8)
    throw new Error(`Intervals doesn't sum up to a perfect octave: ${intervals} sums up to ${sum}`);
}
