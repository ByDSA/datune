import type { IntervalArray, Interval } from "intervals/chromatic";
import type { Scale } from "../../Scale";
import { Intervals as I } from "intervals/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Scales as S } from "../..";

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
      lastInterval = I.add(lastInterval, this.interval);
      lastInterval = toSimpleInterval(lastInterval);

      if (unorderedIntervals.includes(lastInterval))
        break;

      unorderedIntervals.push(lastInterval);
    }

    return unorderedIntervals;
  }

  private fixInitialInterval(): Interval {
    let initialInterval = I.P1;

    if (this.startIndex > 0) {
      for (let i = 0; i < this.startIndex; i++)
        initialInterval = I.add(initialInterval, this.interval);
    } else if (this.startIndex < 0) {
      for (let i = this.startIndex; i < 0; i++)
        initialInterval = I.sub(initialInterval, this.interval);
    }

    return toSimpleInterval(initialInterval);
  }

  generate(): Scale {
    this.unorderedIntervals = this.calculateUnorderedIntervals();
    this.rootIntervals = sortIntervals(this.unorderedIntervals);
    this.intraIntervals = calculateIntraIntervals(this.rootIntervals);

    return S.fromIntraIntervals(...this.intraIntervals);
  }
}

function calculateIntraIntervals(rootIntervals: IntervalArray): IntervalArray {
  const intraIntervals = [];
  let accumulated = I.P1;

  for (let i = 1; i < rootIntervals.length; i++) {
    const lastRootInterval = rootIntervals[i - 1];
    const currentRootInterval = rootIntervals[i];
    const interval = I.sub(currentRootInterval, lastRootInterval);

    accumulated = I.add(accumulated, interval);
    intraIntervals.push(interval);
  }

  const remainingInterval = I.sub(I.P8, accumulated);

  intraIntervals.push(remainingInterval);

  return <IntervalArray>intraIntervals;
}

function toSimpleInterval(input: Interval): Interval {
  let interval = input;

  while (interval >= P.NUMBER)
    interval = I.sub(interval, I.P8);

  while (interval < 0)
    interval = I.add(interval, I.P8);

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
export function generateByIntervals( { interval, length, startIndex = 0 }: Input): Scale {
  return Generator.from(interval, length, startIndex).generate();
}
