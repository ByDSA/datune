import Array from "./Array";
import { inv } from "./modifiers/inv";
import Voicing from "./Voicing";

export function getAllInversions(obj: Voicing): Array {
  const ret: Array = [obj];
  let last: Voicing = obj;

  for (let i = 1; i < obj.length; i++) {
    last = inv(last);
    ret.push(last);
  }

  return ret;
}
