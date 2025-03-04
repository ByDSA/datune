import { IntervalArray, Interval, Intervals } from "intervals/alt";
import { cache } from "../caching/cache";
import { Scale } from "../Scale";

export function fromIntraIntervals(...intervals: IntervalArray): Scale {
  checkSumOctave(intervals);

  return cache.getOrCreate(intervals);
}

function checkSumOctave(intervals: IntervalArray): void {
  let sum: Interval | null = Intervals.P1;

  for (let i = 0; i < intervals.length; i++) {
    if (sum === null)
      break;

    sum = Intervals.add(sum, intervals[i]);
  }

  if (sum !== Intervals.P8)
    throw new Error(`Intervals doesn't sum up to a perfect octave: ${intervals} sums up to ${sum}`);
}
