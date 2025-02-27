import { fromInt } from "../building";
import Chromatic from "../Pitch";
import { Interval } from "intervals/chromatic";

export default function add(obj: Chromatic, interval: Interval): Chromatic {
  const intValue = +obj + interval;

  return fromInt(intValue);
}
