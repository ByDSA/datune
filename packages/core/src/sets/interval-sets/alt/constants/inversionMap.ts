import type { IntervalSet } from "../IntervalSet";

// ??
export function getNumInversionOf(intervalSet: IntervalSet): number {
  return map.get(intervalSet) ?? 0;
}

export const map = new Map<IntervalSet, number>();
