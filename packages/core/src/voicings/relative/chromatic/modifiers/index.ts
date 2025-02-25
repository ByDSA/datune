/* eslint-disable import/prefer-default-export */

import { cyclicMod } from "@datune/utils";
import { Array as ChromaticIntervalArray, Interval as ChromaticInterval, Interval } from "intervals/chromatic";
import { NUMBER } from "pitches/chromatic";
import { fromRootIntervals } from "../building";
import Voicing from "../Voicing";

export function inv(obj: Voicing, n: number = 1): Voicing {
  let values: ChromaticIntervalArray = [...obj.rootIntervals] as ChromaticIntervalArray;
  const nFixed = cyclicMod(n, obj.length);

  for (let i = 0; i < nFixed; i++) {
    let firstRootInterval: Interval = values.shift() as Interval;
    const lastRootInterval: Interval = values[values.length - 1];

    firstRootInterval = getFixedOctaveRootInterval(lastRootInterval, firstRootInterval);
    values.push(firstRootInterval);
    values = <ChromaticIntervalArray>values.map(
      // eslint-disable-next-line no-loop-func
      (value: ChromaticInterval) => value - values[0],
    );
  }

  return fromRootIntervals(...values);
}

function getFixedOctaveRootInterval(lastRootInterval: Interval, rootInterval: Interval): number {
  const rootIntervalInOneOctave = rootInterval % NUMBER;
  const lastRootIntervalOctave = Math.floor(lastRootInterval / NUMBER);
  let ret = lastRootIntervalOctave * NUMBER + rootIntervalInOneOctave;

  if (ret < lastRootInterval)
    ret += NUMBER;

  return ret;
}
