import type { Voicing } from "../Voicing";
import type { IntervalArray, Interval } from "intervals/chromatic";
import { cyclicMod } from "@datune/utils";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { fromRootIntervals } from "../building/rootIntervals";

export function inv(obj: Voicing, n: number = 1): Voicing {
  let values: IntervalArray = [...obj.rootIntervals] as IntervalArray;
  const nFixed = cyclicMod(n, obj.length);

  for (let i = 0; i < nFixed; i++) {
    let firstRootInterval: Interval = values.shift() as Interval;
    const lastRootInterval: Interval = values[values.length - 1];

    firstRootInterval = getFixedOctaveRootInterval(lastRootInterval, firstRootInterval);
    values.push(firstRootInterval);
    values = <IntervalArray>values.map(

      (value: Interval) => value - values[0],
    );
  }

  return fromRootIntervals(...values);
}

function getFixedOctaveRootInterval(lastRootInterval: Interval, rootInterval: Interval): number {
  const rootIntervalInOneOctave = rootInterval % CNUMBER;
  const lastRootIntervalOctave = Math.floor(lastRootInterval / CNUMBER);
  let ret = (lastRootIntervalOctave * CNUMBER) + rootIntervalInOneOctave;

  if (ret < lastRootInterval)
    ret += CNUMBER;

  return ret;
}

export function omit(voicing: Voicing, ...intervals: Interval[]): Voicing | null {
  let newIntervals = voicing.rootIntervals.filter(i=>!intervals.includes(i));

  if (newIntervals.length <= 1)
    return null;

  return fromRootIntervals(...newIntervals as IntervalArray);
}

export function add(voicing: Voicing, ...intervals: Interval[]): Voicing {
  let newIntervals: IntervalArray = [...voicing.rootIntervals, ...intervals];

  return fromRootIntervals(...newIntervals as IntervalArray);
}
