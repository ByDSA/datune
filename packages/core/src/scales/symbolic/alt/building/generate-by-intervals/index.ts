import { Scales } from "../..";
import { Scale } from "../../Scale";
import { IntervalArray, Interval, Intervals } from "intervals/alt";

class Generator {
  private interval: Interval;

  private length: number;

  private startIndex: number;

  private constructor(interval: Interval, length: number, startIndex: number) {
    this.interval = interval;
    this.length = length;
    this.startIndex = startIndex;
  }

  static from(interval: Interval, length: number, startIndex = 0): Generator {
    if (length < 2)
      throw new Error("Length cannot be lower than 2");

    return new Generator(interval, length, startIndex);
  }

  private calculateUnorderedIntervals(): IntervalArray {
    const { cyclic, serie } = Intervals;
    const serieIntervals = serie( {
      interval: this.interval,
      startIndex: this.startIndex,
      length: this.length,
    } ) as IntervalArray;
    const serieIntervalsInOctave = serieIntervals.map(cyclic) as IntervalArray;

    return serieIntervalsInOctave;
  }

  generate(): Scale {
    const { sub } = Intervals;
    const unorderedIntervals = this.calculateUnorderedIntervals();
    const sortedIntervals = sortIntervals(unorderedIntervals);
    const [firstInterval] = sortedIntervals;
    const rootIntervals = sortedIntervals.map(
      (value) => sub(value, firstInterval),
    ) as IntervalArray;

    return Scales.fromRootIntervals(...rootIntervals);
  }
}

function sortIntervals(unorderedIntervals: IntervalArray): IntervalArray {
  const { toChromaticInterval } = Intervals;
  const rootIntervals = [...unorderedIntervals];

  rootIntervals.sort((a, b) => toChromaticInterval(a) - toChromaticInterval(b));

  return <IntervalArray>rootIntervals;
}

type Input = {
  interval: Interval;
  length: number;
  startIndex?: number;
};
export function generateByIntervals( { interval, length, startIndex = 0 }: Input): Scale {
  return Generator.from(interval, length, startIndex).generate();
}
