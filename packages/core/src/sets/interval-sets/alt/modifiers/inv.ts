import type { IntervalSet } from "../IntervalSet";
import { cyclicMod } from "datils/math";
import { Intervals as CI } from "intervals/symbolic/chromatic";
import { IntervalArray, Interval } from "intervals/symbolic/alt";
import { shift } from "intervals/symbolic/alt/modifiers/shift";
import { shiftDown } from "intervals/symbolic/alt/modifiers/shiftDown";
import { P8 } from "intervals/symbolic/alt/constants";
import { fromRootIntervals } from "../building/rootIntervals";

export function inv(obj: IntervalSet, n: number = 1): IntervalSet {
  if (obj.size < 2)
    return obj;

  let rootIntervals = [...obj.rootIntervals] as IntervalArray;
  const nFixed = cyclicMod(n, obj.size);

  for (let i = 0; i < nFixed; i++) {
    let firstValue: Interval = rootIntervals.shift() as Interval;

    while (CI.fromAltInterval(firstValue)
    < CI.fromAltInterval(rootIntervals[rootIntervals.length - 1]))
      firstValue = shift(firstValue, P8) as Interval;

    rootIntervals.push(firstValue);
    firstValue = rootIntervals[0];
    rootIntervals = <IntervalArray>rootIntervals.map(
      (value: Interval) => shiftDown(value, firstValue),
    );
  }

  return fromRootIntervals(...rootIntervals);
}
