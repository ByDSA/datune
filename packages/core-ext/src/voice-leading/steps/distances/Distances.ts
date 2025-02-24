import { betweenNext, betweenSPN } from "@datune/core/intervals/chromatic";
import { Pitch as Chromatic } from "@datune/core/pitches/chromatic";
import { SPN } from "@datune/core/spns/chromatic";

export function minDistanceBetweenArraysOfNotes(a1: Chromatic[], a2: Chromatic[]) {
  const minDistances = [];

  for (const n1 of a1) {
    let min = 9999;

    for (const n2 of a2) {
      const d1 = betweenNext(n1, n2);
      const d2 = betweenNext(n2, n1);
      const dMin = Math.min(d1, d2);

      if (dMin < min)
        min = dMin;
    }

    minDistances.push(min);
  }

  return minDistances.reduce((prev, current) => prev + current);
}

export function minDistanceBetweenArraysOfSPN(a1: SPN[], a2: SPN[]) {
  const minDistances = [];

  for (const n1 of a1) {
    let min = 9999;

    for (const n2 of a2) {
      const d1 = betweenSPN(n1, n2);
      const d2 = betweenSPN(n2, n1);
      const dMin = Math.min(d1, d2);

      if (dMin < min)
        min = dMin;
    }

    minDistances.push(min);
  }

  return minDistances.reduce((prev, current) => prev + current);
}
