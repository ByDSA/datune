import type { Voicing } from "../Voicing";

// ??
export function getNumInversionOf(voicing: Voicing): number {
  return map.get(voicing) ?? 0;
}

export const map = new Map<Voicing, number>();
