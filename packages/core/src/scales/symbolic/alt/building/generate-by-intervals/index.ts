import { Array as IntervalArray, cyclic, Interval, serie, sub, toChromaticInterval } from "intervals/alt";
import { fromRootIntervals } from "../..";
import Scale from "../../Scale";

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
    const serieIntervals = serie( {
      interval: this.interval,
      startIndex: this.startIndex,
      length: this.length,
    } ) as IntervalArray;
    const serieIntervalsInOctave = serieIntervals.map(cyclic) as IntervalArray;

    return serieIntervalsInOctave;
  }

  generate(): Scale {
    const unorderedIntervals = this.calculateUnorderedIntervals();
    const sortedIntervals = sortIntervals(unorderedIntervals);
    const firstInterval = sortedIntervals[0];
    const rootIntervals = sortedIntervals.map(
      (value) => sub(value, firstInterval),
    ) as IntervalArray;

    return fromRootIntervals(...rootIntervals);
  }
}

function sortIntervals(unorderedIntervals: IntervalArray): IntervalArray {
  const rootIntervals = [...unorderedIntervals];

  rootIntervals.sort((a, b) => toChromaticInterval(a) - toChromaticInterval(b));

  return <IntervalArray>rootIntervals;
}

type Input = {
  interval: Interval;
  length: number;
  startIndex?: number;
};
export default function generate( { interval, length, startIndex = 0 }: Input): Scale {
  return Generator.from(interval, length, startIndex).generate();
}
