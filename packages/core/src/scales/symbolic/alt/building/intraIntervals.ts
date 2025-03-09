import type { Scale } from "../Scale";
import type { IntervalArray, Interval } from "intervals/alt";
import { Intervals as I } from "intervals/alt";
import { cache } from "../caching/cache";

export function fromIntraIntervals(...intervals: IntervalArray): Scale {
  checkSumOctave(intervals);

  return cache.getOrCreate(intervals);
}

function checkSumOctave(intervals: IntervalArray): void {
  let sum: Interval | null = I.P1;

  for (let i = 0; i < intervals.length; i++) {
    if (sum === null)
      break;

    sum = I.add(sum, intervals[i]);
  }

  if (sum !== I.P8)
    throw new Error(`Intervals doesn't sum up to a perfect octave: ${intervals} sums up to ${sum}`);
}
