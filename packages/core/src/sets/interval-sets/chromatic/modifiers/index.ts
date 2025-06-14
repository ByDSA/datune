import type { IntervalSet } from "../IntervalSet";
import type { IntervalArray, Interval } from "intervals/chromatic";
import { cyclicMod } from "datils/math";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { fromRootIntervals } from "../building/rootIntervals";

export function inv(obj: IntervalSet, n: number = 1): IntervalSet {
  let values: IntervalArray = [...obj.rootIntervals] as IntervalArray;
  const nFixed = cyclicMod(n, obj.size);

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

export function remove(obj: IntervalSet, ...intervals: Interval[]): IntervalSet {
  let newIntervals = obj.rootIntervals.filter(i=>!intervals.includes(i));

  return fromRootIntervals(...newIntervals);
}

export function add(obj: IntervalSet, ...intervals: IntervalArray): IntervalSet {
  let newIntervals = [...obj.rootIntervals, ...intervals] as IntervalArray;

  return fromRootIntervals(...newIntervals as IntervalArray);
}

export function shift(obj: IntervalSet, interval: Interval): IntervalSet {
  const rootIntervals = obj.rootIntervals.map(i=>i + interval) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}

export function shiftDown(obj: IntervalSet, interval: Interval): IntervalSet {
  const rootIntervals = obj.rootIntervals.map(i=>i - interval) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}
