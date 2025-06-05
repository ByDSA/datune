import type { Voicing } from "./Voicing";
import { NonEmptyNumberArray } from "datils";
import { Intervals as I, type Interval, type IntervalArray } from "intervals/symbolic/diatonic";
import { Pitches as P } from "pitches/diatonic";
import { abs } from "intervals/symbolic/diatonic/modifiers/abs";
import { OCTAVE } from "intervals/symbolic/diatonic/constants";
import { simplify } from "intervals/symbolic/diatonic/modifiers/simplify";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { fromRootIntervals, fromRootIntervalInts } from "./building";

export function inv(obj: Voicing, n: number = 1): Voicing {
  let { rootIntervalInts } = obj;

  for (let i = 0; i < n; i++) {
    const firstValueBeforeShift = <number>rootIntervalInts.shift();
    const [firstValueAfterShift] = rootIntervalInts;

    rootIntervalInts.push(firstValueBeforeShift + P.NUMBER);
    rootIntervalInts = <NonEmptyNumberArray>rootIntervalInts.map(
      (value: number) => value - firstValueAfterShift,
    );
  }

  return fromRootIntervalInts(...rootIntervalInts);
}

export function shift(obj: Voicing, interval: Interval): Voicing {
  const rootIntervalInts = obj.rootIntervalInts.map(i=>i + +interval) as NonEmptyNumberArray;

  return fromRootIntervalInts(...rootIntervalInts);
}

export function shiftDown(obj: Voicing, interval: Interval): Voicing {
  const rootIntervalInts = obj.rootIntervalInts.map(i=>i - +interval) as NonEmptyNumberArray;

  return fromRootIntervalInts(...rootIntervalInts);
}

export function remove(voicing: Voicing, ...intervals: Interval[]): Voicing | null {
  let newIntervals = voicing.rootIntervals.filter(i=>!intervals.includes(i));

  if (newIntervals.length <= 1)
    return null;

  return fromRootIntervals(...newIntervals as IntervalArray);
}

export function add(voicing: Voicing, ...intervals: Interval[]): Voicing {
  let newIntervals: IntervalArray = [...voicing.rootIntervals,
    ...intervals].sort((a, b)=>+a - +b) as IntervalArray;

  return fromRootIntervals(...newIntervals);
}

export function bass(obj: Voicing, int: Interval): Voicing {
  if (obj.rootIntervals[0] === int)
    return obj;

  if (int.direction === Direction.DESCENDENT)
    return bass(obj, abs(int));

  const octaveMagnitude = OCTAVE.magnitude;

  if (int.magnitude >= octaveMagnitude)
    return bass(obj, simplify(int));

  return fromRootIntervalInts(
    0,
    ...shift(obj, I.fromInt(OCTAVE.magnitude - int.magnitude)).rootIntervalInts,
  );
}
