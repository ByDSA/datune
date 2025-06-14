import type { IntervalSet } from "./IntervalSet";
import { Intervals as I, type Interval, type IntervalArray } from "intervals/symbolic/diatonic";
import { abs } from "intervals/symbolic/diatonic/modifiers/abs";
import { OCTAVE, UNISON } from "intervals/symbolic/diatonic/constants";
import { simplify } from "intervals/symbolic/diatonic/modifiers/simplify";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { fromRootIntervals } from "./building";

export function inv(obj: IntervalSet, n: number = 1): IntervalSet {
  let rootIntervals = [...obj.rootIntervals] as IntervalArray;

  for (let i = 0; i < n; i++) {
    const firstValueBeforeShift = rootIntervals.shift();
    const [firstValueAfterShift] = rootIntervals;

    rootIntervals.push(firstValueBeforeShift!.withShifted(OCTAVE));
    rootIntervals = rootIntervals.map(
      (value: Interval) => value.withShiftedDown(firstValueAfterShift),
    ) as IntervalArray;
  }

  return fromRootIntervals(...rootIntervals);
}

export function shift(obj: IntervalSet, rootInterval: Interval): IntervalSet {
  const rootIntervals = obj.rootIntervals.map(i=>i.withShifted(rootInterval)) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}

export function shiftDown(obj: IntervalSet, rootInterval: Interval): IntervalSet {
  const rootIntervals = obj.rootIntervals.map(i=>i.withShiftedDown(rootInterval)) as IntervalArray;

  return fromRootIntervals(...rootIntervals);
}

export function remove(obj: IntervalSet, ...rootIntervals: Interval[]): IntervalSet {
  let newIntervals = obj.rootIntervals.filter(i=>!rootIntervals.includes(i));

  return fromRootIntervals(...newIntervals as IntervalArray);
}

export function add(obj: IntervalSet, ...rootIntervals: Interval[]): IntervalSet {
  let newIntervals: IntervalArray = [...obj.rootIntervals,
    ...rootIntervals].sort((a, b)=>+a - +b) as IntervalArray;

  return fromRootIntervals(...newIntervals);
}

export function bass(obj: IntervalSet, int: Interval): IntervalSet {
  if (obj.rootIntervals[0] === int)
    return obj;

  if (int.direction === Direction.DESCENDENT)
    return bass(obj, abs(int));

  const octaveMagnitude = OCTAVE.magnitude;

  if (int.magnitude >= octaveMagnitude)
    return bass(obj, simplify(int));

  return fromRootIntervals(
    UNISON,
    ...shift(obj, I.fromInt(OCTAVE.magnitude - int.magnitude)).rootIntervals,
  );
}
