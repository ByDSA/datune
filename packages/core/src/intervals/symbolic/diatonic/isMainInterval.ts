import type { Interval } from "./Interval";
import { abs } from "./modifiers/abs";
import { simple } from "./modifiers/simple";
import { UNISON, FOURTH, FIFTH } from "./constants";

export function isMainInterval(input: Interval): boolean {
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
