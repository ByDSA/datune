import { frac, FracExp, mult } from "@datune/utils/math";
import { Array as IntervalArray, from, Interval as IntervalPitch, UNISON } from "intervals/real";
import ScalePitch from "../../ScalePitch";
import scaleFromIntervals from "../intervals";

class ScalePitchGenerator {
  private _interval: IntervalPitch;

  private _length: number;

  constructor(_interval: IntervalPitch, _length: number) {
    this._interval = _interval;
    this._length = _length;
  }

  private _unreductedIntervals: IntervalArray | undefined;

  private _unorderedIntervals: IntervalArray | undefined;

  private _orderedIntervals: IntervalArray | undefined;

  static from(interval: IntervalPitch, length: number): ScalePitchGenerator {
    if (length < 2)
      throw new Error("Length cannot be lower than 2");

    return new ScalePitchGenerator(interval, length);
  }

  private calculateUnreductedIntervals(): IntervalArray {
    this._unreductedIntervals = [UNISON, this._interval];
    let lastInterval: IntervalPitch = this._unreductedIntervals[1];

    for (let i = 2; i < this._length; i++) {
      const newRatio = mult(lastInterval.ratio, this._interval.ratio);

      lastInterval = from(newRatio);
      this._unreductedIntervals.push(lastInterval);
    }

    return this._unreductedIntervals;
  }

  private calculateUnorderedIntervals(unreductedIntervals: IntervalArray): IntervalArray {
    const unorderedIntervals = [];

    for (let i = 0; i < this._length; i++) {
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

      const newInterval: IntervalPitch = from(newRatio);

      unorderedIntervals.push(newInterval);
    }

    return <IntervalArray>unorderedIntervals;
  }

  generate(): ScalePitch {
    this._unreductedIntervals = this.calculateUnreductedIntervals();
    this._unorderedIntervals = this.calculateUnorderedIntervals(this._unreductedIntervals);
    this._orderedIntervals = sortIntervals(this._unorderedIntervals);

    return scaleFromIntervals(...this._orderedIntervals);
  }
}

function sortIntervals(unorderedIntervals: IntervalArray): IntervalArray {
  const orderedIntervals: IntervalArray = [...unorderedIntervals];

  orderedIntervals.sort((a, b) => +a.ratio - +b.ratio);

  return orderedIntervals;
}

export default function gen(interval: IntervalPitch, length: number): ScalePitch {
  return new ScalePitchGenerator(interval, length).generate();
}
