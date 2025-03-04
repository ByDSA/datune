import type { Voicing } from "../Voicing";
import { cyclicMod } from "@datune/utils";
import { IntervalArray, Interval } from "intervals/chromatic";
import { Pitches } from "pitches/chromatic";
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
  const rootIntervalInOneOctave = rootInterval % Pitches.NUMBER;
  const lastRootIntervalOctave = Math.floor(lastRootInterval / Pitches.NUMBER);
  let ret = (lastRootIntervalOctave * Pitches.NUMBER) + rootIntervalInOneOctave;

  if (ret < lastRootInterval)
    ret += Pitches.NUMBER;

  return ret;
}
