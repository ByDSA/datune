import type { VoicingArray } from "./Array";
import { inv } from "./modifiers";
import type { Voicing } from "./Voicing";

export function getAllInversions(obj: Voicing): VoicingArray {
  const ret: VoicingArray = [obj];
  let last: Voicing = obj;

  for (let i = 1; i < obj.length; i++) {
    last = inv(last);
    ret.push(last);
  }

  return ret;
}
