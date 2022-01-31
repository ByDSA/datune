/* eslint-disable no-empty-function */
/* eslint-disable accessor-pairs */
import { add as intervalAdd, Array as IntervalArray, Interval, PERFECT_OCTAVE, PERFECT_UNISON, sub as intervalSub } from "intervals/chromatic";
import { NUMBER } from "pitches/chromatic";
import { fromIntraIntervals } from "../..";
import Scale from "../../Scale";

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
      lastInterval = intervalAdd(lastInterval, this.interval);
      lastInterval = toSimpleInterval(lastInterval);

      if (unorderedIntervals.includes(lastInterval))
        break;

      unorderedIntervals.push(lastInterval);
    }

    return unorderedIntervals;
  }

  private fixInitialInterval(): Interval {
    let initialInterval = PERFECT_UNISON;

    if (this.startIndex > 0) {
      for (let i = 0; i < this.startIndex; i++)
        initialInterval = intervalAdd(initialInterval, this.interval);
    } else if (this.startIndex < 0) {
      for (let i = this.startIndex; i < 0; i++)
        initialInterval = intervalSub(initialInterval, this.interval);
    }

    return toSimpleInterval(initialInterval);
  }

  generate(): Scale {
    this.unorderedIntervals = this.calculateUnorderedIntervals();
    this.rootIntervals = sortIntervals(this.unorderedIntervals);
    this.intraIntervals = calculateIntraIntervals(this.rootIntervals);

    return fromIntraIntervals(...this.intraIntervals);
  }
}

function calculateIntraIntervals(rootIntervals: IntervalArray): IntervalArray {
  const intraIntervals = [];
  let accumulated = PERFECT_UNISON;

  for (let i = 1; i < rootIntervals.length; i++) {
    const lastRootInterval = rootIntervals[i - 1];
    const currentRootInterval = rootIntervals[i];
    const interval = intervalSub(currentRootInterval, lastRootInterval);

    accumulated = intervalAdd(accumulated, interval);
    intraIntervals.push(interval);
  }

  const remainingInterval = intervalSub(PERFECT_OCTAVE, accumulated);

  intraIntervals.push(remainingInterval);

  return <IntervalArray>intraIntervals;
}

function toSimpleInterval(input: Interval): Interval {
  let interval = input;

  while (interval >= NUMBER)
    interval = intervalSub(interval, PERFECT_OCTAVE);

  while (interval < 0)
    interval = intervalAdd(interval, PERFECT_OCTAVE);

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
