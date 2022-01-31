import { add, Array as IntervalArray, Interval, PERFECT_OCTAVE, PERFECT_UNISON } from "intervals/alt";
import { cache } from "../caching";
import Scale from "../Scale";

export default function fromIntraIntervals(...intervals: IntervalArray): Scale {
  checkSumOctave(intervals);

  return cache.getOrCreate(intervals);
}

function checkSumOctave(intervals: IntervalArray): void {
  let sum: Interval | null = PERFECT_UNISON;

  for (let i = 0; i < intervals.length; i++) {
    if (sum === null)
      break;

    sum = add(sum, intervals[i]);
  }

  if (sum !== PERFECT_OCTAVE)
    throw new Error(`Intervals doesn't sum up to a perfect octave: ${intervals} sums up to ${sum}`);
}
