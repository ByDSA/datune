import type { Voicing } from "../Voicing";

export function getInversionOf(voicing: Voicing) {
  return map.get(voicing) ?? 0;
}

export const map = new Map<Voicing, number>();
