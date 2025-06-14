import type { IntervalSet } from "../IntervalSet";
import type { NonEmptyNumberArray } from "datils";
import type { IntervalSet as DIS } from "../../diatonic";
import { fromRootIntervalsMagnitude } from "../../diatonic/building";

export function toDiatonicIntervalSet(obj: IntervalSet): DIS {
  const arrayDiatonicChordIntervalSet = new Array(obj.size) as NonEmptyNumberArray;

  for (const value of obj)
    arrayDiatonicChordIntervalSet.push(+value.diatonicInterval);

  return fromRootIntervalsMagnitude(...arrayDiatonicChordIntervalSet);
}
