import type { Pitch as CPitch } from "@datune/core/pitches/chromatic";
import type { SPN } from "@datune/core/spns/chromatic";
import { between } from "@datune/core/intervals/symbolic/chromatic/building";
import { Intervals as I } from "@datune/core";

export function minDistanceBetweenPitchArrays(a1: CPitch[], a2: CPitch[]) {
  const minDistances = [];

  for (const n1 of a1) {
    let min = Number.MAX_SAFE_INTEGER;

    for (const n2 of a2) {
      const dMin = I.abs(between(n1, n2));

      if (dMin < min)
        min = dMin;
    }

    minDistances.push(min);
  }

  return minDistances.reduce((prev, current) => prev + current);
}

export function minDistanceBetweenSpnArrays(a1: SPN[], a2: SPN[]) {
  const minDistances = [];

  for (const n1 of a1) {
    let min = 9999;

    for (const n2 of a2) {
      const dMin = Math.abs(+n1 - +n2);

      if (dMin < min)
        min = dMin;
    }

    minDistances.push(min);
  }

  return minDistances.reduce((prev, current) => prev + current);
}
