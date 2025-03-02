import { cyclicMod } from "@datune/utils";
import { fromRootIntervals } from "../building/rootIntervals";
import type { Voicing } from "../Voicing";
import { IntervalArray, Interval } from "intervals/symbolic/alt";
import { add } from "intervals/symbolic/alt/modifiers/add";
import { sub } from "intervals/symbolic/alt/modifiers/sub";
import { toChromaticInterval } from "intervals/symbolic/alt/conversions";
import { PERFECT_OCTAVE } from "intervals/symbolic/alt/constants";

export function inv(obj: Voicing, n: number = 1): Voicing {
  if (obj.rootIntervals.length < 2)
    return obj;

  const nFixed = cyclicMod(n, obj.length);
  let rootIntervals: IntervalArray = [...obj.rootIntervals];

  for (let i = 0; i < nFixed; i++) {
    let firstValue: Interval = rootIntervals.shift() as Interval;

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
