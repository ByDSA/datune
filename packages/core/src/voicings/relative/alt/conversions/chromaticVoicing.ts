import type { Voicing } from "../Voicing";
import type { Voicing as CVoicing } from "../../chromatic";
import { NonEmptyNumberArray } from "datils";
import { Intervals as CI } from "intervals/chromatic";
import { fromRootIntervals } from "../../chromatic/building/rootIntervals";

export function toChromaticVoicing(obj: Voicing): CVoicing {
  const arrayVoicing: NonEmptyNumberArray = new Array(obj.length) as NonEmptyNumberArray;

  for (let i = 0; i < obj.length; i++)
    arrayVoicing[i] = CI.fromAltInterval(obj.rootIntervals[i]);

  return fromRootIntervals(...arrayVoicing);
}
