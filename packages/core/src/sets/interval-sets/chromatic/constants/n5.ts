/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import { fromRootIntervals } from "../building/rootIntervals";

export function initializeN5() {
  SIXTH_ADD9 = fromRootIntervals(0, 4, 7, 9, 14);

  SIXTH_MINOR_ADD9 = fromRootIntervals(0, 3, 7, 9, 14);

  SEVENTH_b9 = fromRootIntervals(0, 4, 7, 10, 13);

  SEVENTH_a9 = fromRootIntervals(0, 4, 7, 10, 15);

  SEVENTH_SUS4_b9 = fromRootIntervals(0, 5, 7, 10, 15);

  SEVENTH_MINOR_b9 = fromRootIntervals(0, 3, 7, 10, 13);

  SEVENTH_ADD13 = fromRootIntervals(0, 4, 7, 10, 21);

  NINTH = fromRootIntervals(0, 4, 7, 10, 14);

  NINTH_MINOR = fromRootIntervals(0, 3, 7, 10, 14);

  NINTH_b5 = fromRootIntervals(0, 4, 6, 10, 14);

  NINTH_a5 = fromRootIntervals(0, 4, 8, 10, 14);

  NINTH_SUS4 = fromRootIntervals(0, 5, 7, 10, 14);

  NINTH_MAJ9 = fromRootIntervals(0, 4, 7, 11, 14);

  NINTH_MINOR_MAJ9 = fromRootIntervals(0, 3, 7, 11, 14);
}

export let SIXTH_ADD9: IntervalSet;

export let SIXTH_MINOR_ADD9: IntervalSet;

export let SEVENTH_b9: IntervalSet;

export let SEVENTH_a9: IntervalSet;

export let SEVENTH_SUS4_b9: IntervalSet;

export let SEVENTH_MINOR_b9: IntervalSet;

export let SEVENTH_ADD13: IntervalSet;

export let NINTH: IntervalSet;

export let NINTH_MINOR: IntervalSet;

export let NINTH_b5: IntervalSet;

export let NINTH_a5: IntervalSet;

export let NINTH_SUS4: IntervalSet;

export let NINTH_MAJ9: IntervalSet;

export let NINTH_MINOR_MAJ9: IntervalSet;
