import { cache } from "../caching/cache";
import { Scale } from "../Scale";
import { IntervalArray, Interval, Intervals } from "intervals/alt";

export function fromIntraIntervals(...intervals: IntervalArray): Scale {
  checkSumOctave(intervals);

  return cache.getOrCreate(intervals);
}

function checkSumOctave(intervals: IntervalArray): void {
  let sum: Interval | null = Intervals.PERFECT_UNISON;

  for (let i = 0; i < intervals.length; i++) {
    if (sum === null)
      break;

    sum = Intervals.add(sum, intervals[i]);
  }

  if (sum !== Intervals.PERFECT_OCTAVE)
    throw new Error(`Intervals doesn't sum up to a perfect octave: ${intervals} sums up to ${sum}`);
}
