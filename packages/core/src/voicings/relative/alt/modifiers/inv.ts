import { cyclicMod } from "@datune/utils";
import { fromRootIntervals } from "../building/rootIntervals";
import type { Voicing } from "../Voicing";
import { IntervalArray, Interval, Intervals } from "intervals/symbolic/alt";

export function inv(obj: Voicing, n: number = 1): Voicing {
  const { add, PERFECT_OCTAVE, sub, toChromaticInterval } = Intervals;

  if (obj.rootIntervals.length < 2)
    return obj;

  const nFixed = cyclicMod(n, obj.length);
  let rootIntervals: IntervalArray = [...obj.rootIntervals];

  for (let i = 0; i < nFixed; i++) {
    let firstValue: Interval = <Interval>rootIntervals.shift();

    while (toChromaticInterval(firstValue)
    < toChromaticInterval(rootIntervals[rootIntervals.length - 1]))
      firstValue = add(firstValue, PERFECT_OCTAVE) as Interval;

    rootIntervals.push(firstValue);
    // eslint-disable-next-line prefer-destructuring
    firstValue = rootIntervals[0];
    rootIntervals = <IntervalArray>rootIntervals.map(
      (value: Interval) => sub(value, firstValue),
    );
  }

  return fromRootIntervals(...rootIntervals);
}
