import { Interval } from "intervals/chromatic";
import { fromInt } from "../building";
import Chromatic from "../Pitch";

export default function add(obj: Chromatic, interval: Interval): Chromatic {
  const intValue = +obj + interval;

  return fromInt(intValue);
}
