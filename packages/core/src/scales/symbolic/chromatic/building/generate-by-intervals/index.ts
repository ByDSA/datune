import type { Interval } from "intervals/chromatic";
import type { Scale } from "../../Scale";
import type { Degree, DegreeArray } from "degrees/chromatic";
import { Intervals as I } from "intervals/chromatic";
import { cyclicOctave } from "intervals/symbolic/chromatic/modifiers";
import { rootToDeltaIntervals } from "intervals/symbolic/chromatic/conversions";
import { Scales as S } from "../..";

class Generator {
  private interval: Interval;

  private length: number;

  private startIndex: number;

  private unorderedIntervals: DegreeArray | undefined;

  private rootIntervals: DegreeArray | undefined;

  private deltaIntervals: DegreeArray | undefined;

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

  private calculateUnorderedIntervals(): DegreeArray {
    let lastInterval: Degree = this.fixInitialInterval();
    const unorderedIntervals = [lastInterval];

    for (let i = 1; i < this.length; i++) {
      lastInterval = cyclicOctave(I.shift(lastInterval, this.interval));

      if (unorderedIntervals.includes(lastInterval))
        break;

      unorderedIntervals.push(lastInterval);
    }

    return unorderedIntervals as DegreeArray;
  }

  private fixInitialInterval(): Degree {
    let initialInterval = I.P1;

    if (this.startIndex > 0) {
      for (let i = 0; i < this.startIndex; i++)
        initialInterval = I.shift(initialInterval, this.interval);
    } else if (this.startIndex < 0) {
      for (let i = this.startIndex; i < 0; i++)
        initialInterval = I.shiftDown(initialInterval, this.interval);
    }

    return cyclicOctave(initialInterval);
  }

  generate(): Scale {
    this.unorderedIntervals = this.calculateUnorderedIntervals();
    this.rootIntervals = sortIntervals(this.unorderedIntervals);
    this.deltaIntervals = rootToDeltaIntervals(...this.rootIntervals) as DegreeArray;

    return S.fromDeltaIntervals(...this.deltaIntervals);
  }
}

function sortIntervals(unorderedIntervals: DegreeArray): DegreeArray {
  const rootIntervals = [...unorderedIntervals];

  rootIntervals.sort((a, b) => a - b);

  return <DegreeArray>rootIntervals;
}

type Input = {
  interval: Interval;
  length: number;
  startIndex?: number;
};
export function generateByIntervals( { interval, length, startIndex = 0 }: Input): Scale {
  return Generator.from(interval, length, startIndex).generate();
}
