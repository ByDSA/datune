import { FIFTH, FOURTH, UNISON } from "intervals/diatonic";
import Interval from "./Interval";
import { abs, simple } from "./modifiers";

export default function isMainInterval(input: Interval): boolean {
  const intervalSimple = abs(simple(input));

  switch (intervalSimple) {
    case UNISON:
    case FOURTH:
    case FIFTH:
      return true;
    default:
      return false;
  }
}
