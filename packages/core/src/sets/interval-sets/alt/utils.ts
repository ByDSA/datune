import type { IntervalSetArray } from "./Array";
import type { IntervalSet } from "./IntervalSet";
import { inv } from "./modifiers/inv";

export function getAllInversions(obj: IntervalSet): IntervalSetArray {
  const ret: IntervalSetArray = [obj];
  let last: IntervalSet = obj;

  for (let i = 1; i < obj.size; i++) {
    last = inv(last);
    ret.push(last);
  }

  return ret;
}
