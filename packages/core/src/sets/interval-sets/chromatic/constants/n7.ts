/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import { fromRootIntervals as fromIntervals } from "../building/rootIntervals";
import { inv } from "../modifiers";
import { map } from "./inversionMap";

export function initializeN7() {
  THIRTEENTH_MAJ13 = fromIntervals(0, 4, 7, 11, 14, 17, 21);

  THIRTEENTH_MINOR = fromIntervals(0, 3, 7, 10, 14, 17, 21);

  THIRTEENTH_SUS4 = fromIntervals(0, 5, 7, 10, 14, 17, 21);

  THIRTEENTH_b5 = fromIntervals(0, 4, 6, 10, 14, 17, 21);

  THIRTEENTH_MAJ13_b9 = fromIntervals(0, 4, 7, 11, 13, 17, 21);

  THIRTEENTH_a5 = fromIntervals(0, 4, 8, 10, 14, 17, 21);

  THIRTEENTH_MAJ13_a9 = fromIntervals(0, 4, 7, 11, 15, 17, 21);

  THIRTEENTH_b9 = fromIntervals(0, 4, 7, 10, 13, 17, 21);

  THIRTEENTH_a9 = fromIntervals(0, 4, 7, 10, 15, 17, 21);

  THIRTEENTH_b5a9 = fromIntervals(0, 4, 6, 10, 15, 17, 21);

  THIRTEENTH_a5b9 = fromIntervals(0, 4, 8, 10, 13, 17, 21);

  THIRTEENTH_a5a9 = fromIntervals(0, 4, 8, 10, 15, 17, 21);

  THIRTEENTH_MINOR_MAJ13 = fromIntervals(0, 3, 7, 11, 14, 17, 21);

  THIRTEENTH_MAJ13_b5 = fromIntervals(0, 4, 6, 11, 14, 17, 21);

  THIRTEENTH_MAJ13_a5 = fromIntervals(0, 4, 8, 11, 14, 17, 21);

  THIRTEENTH_MAJ13_b5b9 = fromIntervals(0, 4, 6, 11, 13, 17, 21);

  THIRTEENTH_MAJ13_b5a9 = fromIntervals(0, 4, 6, 11, 15, 17, 21);

  THIRTEENTH_MAJ13_a5b9 = fromIntervals(0, 4, 8, 11, 13, 17, 21);

  THIRTEENTH_MAJ13_a5a9 = fromIntervals(0, 4, 8, 11, 15, 17, 21);

  THIRTEENTH_b5b9 = fromIntervals(0, 4, 6, 10, 13, 17, 21);

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 7; i++) {
    map.set(inv(THIRTEENTH_MAJ13, i), i);
    map.set(inv(THIRTEENTH_MINOR, i), i);
    map.set(inv(THIRTEENTH_b5a9, i), i);
  }
}

export let THIRTEENTH_b5: IntervalSet;

export let THIRTEENTH_a5: IntervalSet;

export let THIRTEENTH_b9: IntervalSet;

export let THIRTEENTH_a9: IntervalSet;

export let THIRTEENTH_b5a9: IntervalSet;

export let THIRTEENTH_a5b9: IntervalSet;

export let THIRTEENTH_b5b9: IntervalSet;

export let THIRTEENTH_a5a9: IntervalSet;

export let THIRTEENTH_MINOR_MAJ13: IntervalSet;

export let THIRTEENTH_MAJ13_b5: IntervalSet;

export let THIRTEENTH_MAJ13_a5: IntervalSet;

export let THIRTEENTH_MAJ13_b5b9: IntervalSet;

export let THIRTEENTH_MAJ13_b5a9: IntervalSet;

export let THIRTEENTH_MAJ13_a5b9: IntervalSet;

export let THIRTEENTH_MAJ13_a5a9: IntervalSet;

export let THIRTEENTH_MAJ13_a9: IntervalSet;

export let THIRTEENTH_MAJ13_b9: IntervalSet;

export let THIRTEENTH_MAJ13: IntervalSet;

export let THIRTEENTH_MINOR: IntervalSet;

export let THIRTEENTH_SUS4: IntervalSet;
