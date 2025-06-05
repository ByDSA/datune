import type { IntervalArray } from "diatonic";
import { NonEmptyNumberArray } from "datils";
import { Voicing } from "../Voicing";

export type Key = NonEmptyNumberArray;

export function fromRootIntervalInts(...ints: NonEmptyNumberArray): Voicing {
  const key: Key = ints;

  return new (Voicing as any)(key);
}

export function fromRootIntervals(...intervals: IntervalArray): Voicing {
  return fromRootIntervalInts(...intervals.map(i=>+i) as NonEmptyNumberArray);
}
