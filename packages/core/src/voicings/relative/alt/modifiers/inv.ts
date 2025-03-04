import type { Voicing } from "../Voicing";
import { cyclicMod } from "@datune/utils";
import { IntervalArray, Interval } from "intervals/symbolic/alt";
import { add } from "intervals/symbolic/alt/modifiers/add";
import { sub } from "intervals/symbolic/alt/modifiers/sub";
import { toChromaticInterval } from "intervals/symbolic/alt/conversions";
import { P8 } from "intervals/symbolic/alt/constants";
import { fromRootIntervals } from "../building/rootIntervals";

export function inv(obj: Voicing, n: number = 1): Voicing {
  if (obj.rootIntervals.length < 2)
    return obj;

  const nFixed = cyclicMod(n, obj.length);
  let rootIntervals: IntervalArray = [...obj.rootIntervals];

  for (let i = 0; i < nFixed; i++) {
    let firstValue: Interval = rootIntervals.shift() as Interval;

    while (toChromaticInterval(firstValue)
    < toChromaticInterval(rootIntervals[rootIntervals.length - 1]))
      firstValue = add(firstValue, P8) as Interval;

    rootIntervals.push(firstValue);
    // eslint-disable-next-line prefer-destructuring
    firstValue = rootIntervals[0];
    rootIntervals = <IntervalArray>rootIntervals.map(
      (value: Interval) => sub(value, firstValue),
    );
  }

  return fromRootIntervals(...rootIntervals);
}
