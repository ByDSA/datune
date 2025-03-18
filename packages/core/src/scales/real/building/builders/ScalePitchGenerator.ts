import type { Scale } from "../../Scale";
import { frac, FracExp, mult } from "datils/math/num-exp";
import { IntervalArray, Intervals, Interval } from "intervals/real";
import { fromIntervals } from "../intervals";

class ScalePitchGenerator {
  #interval: Interval;

  #length: number;

  constructor(_interval: Interval, _length: number) {
    this.#interval = _interval;
    this.#length = _length;
  }

  #unreductedIntervals: IntervalArray | undefined;

  #unorderedIntervals: IntervalArray | undefined;

  #orderedIntervals: IntervalArray | undefined;

  static from(interval: Interval, length: number): ScalePitchGenerator {
    if (length < 2)
      throw new Error("Length cannot be lower than 2");

    return new ScalePitchGenerator(interval, length);
  }

  private calculateUnreductedIntervals(): IntervalArray {
    this.#unreductedIntervals = [Intervals.UNISON, this.#interval];
    // eslint-disable-next-line prefer-destructuring
    let lastInterval: Interval = this.#unreductedIntervals[1];

    for (let i = 2; i < this.#length; i++) {
      const newRatio = mult(lastInterval.ratio, this.#interval.ratio);

      lastInterval = Intervals.from(newRatio);
      this.#unreductedIntervals.push(lastInterval);
    }

    return this.#unreductedIntervals;
  }

  private calculateUnorderedIntervals(unreductedIntervals: IntervalArray): IntervalArray {
    const unorderedIntervals = [];

    for (let i = 0; i < this.#length; i++) {
      const unreducted = unreductedIntervals[i];
      const oldRatio = unreducted.ratio;
      let newRatio = oldRatio;

      while (+newRatio >= 2) {
        if (unreducted.ratio instanceof FracExp) {
          const { fraction } = <any>newRatio;

          newRatio = frac(fraction.n, fraction.d * 2);
        } else
          newRatio = +newRatio / 2;
      }

      const newInterval: Interval = Intervals.from(newRatio);

      unorderedIntervals.push(newInterval);
    }

    return <IntervalArray>unorderedIntervals;
  }

  generate(): Scale {
    this.#unreductedIntervals = this.calculateUnreductedIntervals();
    this.#unorderedIntervals = this.calculateUnorderedIntervals(this.#unreductedIntervals);
    this.#orderedIntervals = sortIntervals(this.#unorderedIntervals);

    return fromIntervals(...this.#orderedIntervals);
  }
}

function sortIntervals(unorderedIntervals: IntervalArray): IntervalArray {
  const orderedIntervals: IntervalArray = [...unorderedIntervals];

  orderedIntervals.sort((a, b) => +a.ratio - +b.ratio);

  return orderedIntervals;
}

export function gen(interval: Interval, length: number): Scale {
  return new ScalePitchGenerator(interval, length).generate();
}
