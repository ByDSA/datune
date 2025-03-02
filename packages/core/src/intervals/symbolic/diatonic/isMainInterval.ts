import type { Interval } from "./Interval";
import { abs } from "./modifiers/abs";
import { simplify } from "./modifiers/simplify";
import { UNISON, FOURTH, FIFTH } from "./constants";

export function isMainInterval(input: Interval): boolean {
  const intervalSimple = abs(simplify(input));

  switch (intervalSimple) {
    case UNISON:
    case FOURTH:
    case FIFTH:
      return true;
    default:
      return false;
  }
}
