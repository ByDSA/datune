import type { Voicing } from "../Voicing";

export function toDto(obj: Voicing) {
  return obj.rootIntervals;
}
