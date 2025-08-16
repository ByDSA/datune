import { IntervalSet } from "@datune/core/intervalSets/diatonic";

export function stringifyIntervalSetShortName(obj: IntervalSet): string {
  return stringifyIntervalSet(obj);
}

export function stringifyIntervalSet(obj: IntervalSet): string {
  return obj.rootIntervalInts.toString();
}
