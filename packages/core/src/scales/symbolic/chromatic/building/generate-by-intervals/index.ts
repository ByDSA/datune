import { Scales } from "../..";
import Scale from "../../Scale";
import { IntervalArray, Interval, Intervals } from "intervals/chromatic";
import { Pitches } from "pitches/chromatic";

class Generator {
  private interval: Interval;

  private length: number;

  private startIndex: number;

  private unorderedIntervals: IntervalArray | undefined;

  private rootIntervals: IntervalArray | undefined;

  private intraIntervals: IntervalArray | undefined;

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
    let lastInterval: Interval = this.fixInitialInterval();
    const unorderedIntervals: IntervalArray = [lastInterval];

    for (let i = 1; i < this.length; i++) {
      lastInterval = Intervals.add(lastInterval, this.interval);
      lastInterval = toSimpleInterval(lastInterval);

      if (unorderedIntervals.includes(lastInterval))
        break;

      unorderedIntervals.push(lastInterval);
    }

    return unorderedIntervals;
  }

  private fixInitialInterval(): Interval {
    let initialInterval = Intervals.PERFECT_UNISON;

    if (this.startIndex > 0) {
      for (let i = 0; i < this.startIndex; i++)
        initialInterval = Intervals.add(initialInterval, this.interval);
    } else if (this.startIndex < 0) {
      for (let i = this.startIndex; i < 0; i++)
        initialInterval = Intervals.sub(initialInterval, this.interval);
    }

    return toSimpleInterval(initialInterval);
  }

  generate(): Scale {
    this.unorderedIntervals = this.calculateUnorderedIntervals();
    this.rootIntervals = sortIntervals(this.unorderedIntervals);
    this.intraIntervals = calculateIntraIntervals(this.rootIntervals);

    return Scales.fromIntraIntervals(...this.intraIntervals);
  }
}

function calculateIntraIntervals(rootIntervals: IntervalArray): IntervalArray {
  const intraIntervals = [];
  let accumulated = Intervals.PERFECT_UNISON;

  for (let i = 1; i < rootIntervals.length; i++) {
    const lastRootInterval = rootIntervals[i - 1];
    const currentRootInterval = rootIntervals[i];
    const interval = Intervals.sub(currentRootInterval, lastRootInterval);

    accumulated = Intervals.add(accumulated, interval);
    intraIntervals.push(interval);
  }

  const remainingInterval = Intervals.sub(Intervals.PERFECT_OCTAVE, accumulated);

  intraIntervals.push(remainingInterval);

  return <IntervalArray>intraIntervals;
}

function toSimpleInterval(input: Interval): Interval {
  let interval = input;

  while (interval >= Pitches.NUMBER)
    interval = Intervals.sub(interval, Intervals.PERFECT_OCTAVE);

  while (interval < 0)
    interval = Intervals.add(interval, Intervals.PERFECT_OCTAVE);

  return interval;
}

function sortIntervals(unorderedIntervals: IntervalArray): IntervalArray {
  const rootIntervals = [...unorderedIntervals];

  rootIntervals.sort((a, b) => a - b);

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
