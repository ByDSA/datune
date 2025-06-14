/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import { IntervalSets } from "..";
import { fromRootIntervals } from "../building/rootIntervals";
import { map } from "./inversionMap";

export function initializeN4() {
  SEVENTH = fromRootIntervals(0, 4, 7, 10);

  SEVENTH_b5 = fromRootIntervals(0, 4, 6, 10);

  SEVENTH_a5 = fromRootIntervals(0, 4, 8, 10);

  SEVENTH_MINOR = fromRootIntervals(0, 3, 7, 10);

  SIXTH = fromRootIntervals(0, 4, 7, 9);

  SEVENTH_MINOR_b5 = fromRootIntervals(0, 3, 6, 10);

  SIXTH_MINOR = fromRootIntervals(0, 3, 7, 9);

  SEVENTH_MINOR_a5 = fromRootIntervals(0, 3, 8, 10);

  SIXTH_SUS4 = fromRootIntervals(0, 5, 7, 9);

  SEVENTH_MINOR_MAJ7 = fromRootIntervals(0, 3, 7, 11);

  SEVENTH_MAJ7 = fromRootIntervals(0, 4, 7, 11);

  SEVENTH_MAJ7_b5 = fromRootIntervals(0, 4, 6, 11);

  SEVENTH_SUS4 = fromRootIntervals(0, 5, 7, 10);

  MAJOR_OVER_P4 = fromRootIntervals(0, 7, 11, 14);

  MAJOR_OVER_m2 = fromRootIntervals(0, 11, 15, 18);

  MAJOR_OVER_M2 = fromRootIntervals(0, 10, 14, 17);

  MAJOR_OVER_m3 = fromRootIntervals(0, 9, 13, 16);

  MAJOR_OVER_d5 = fromRootIntervals(0, 6, 10, 13);

  MAJOR_OVER_a5 = fromRootIntervals(0, 4, 8, 11);

  MINOR_OVER_m2 = fromRootIntervals(0, 11, 14, 18);

  MINOR_OVER_M2 = fromRootIntervals(0, 10, 13, 17);

  MINOR_OVER_M3 = fromRootIntervals(0, 8, 11, 15);

  MINOR_OVER_P4 = fromRootIntervals(0, 7, 10, 14);

  MINOR_OVER_d5 = fromRootIntervals(0, 6, 9, 13);

  MINOR_OVER_m7 = fromRootIntervals(0, 2, 5, 9);

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 4; i++) {
    map.set(IntervalSets.inv(SEVENTH, i), i);
    map.set(IntervalSets.inv(SEVENTH_MAJ7, i), i);
    map.set(IntervalSets.inv(SEVENTH_MINOR_MAJ7, i), i);
  }
}

export let SEVENTH: IntervalSet;

export let SEVENTH_b5: IntervalSet;

export let SEVENTH_a5: IntervalSet;

export let SEVENTH_MINOR: IntervalSet;

export let SEVENTH_MAJ7_b5: IntervalSet;

export let SIXTH: IntervalSet;

export let SEVENTH_MINOR_b5: IntervalSet;

export let SIXTH_MINOR: IntervalSet;

export let SEVENTH_MINOR_a5: IntervalSet;

export let SIXTH_SUS4: IntervalSet;

export let SEVENTH_MINOR_MAJ7: IntervalSet;

export let SEVENTH_MAJ7: IntervalSet;

export let SEVENTH_SUS4: IntervalSet;

export let MAJOR_OVER_m2: IntervalSet;

export let MAJOR_OVER_M2: IntervalSet;

export let MAJOR_OVER_m3: IntervalSet;

export let MAJOR_OVER_P4: IntervalSet;

export let MAJOR_OVER_d5: IntervalSet;

export let MAJOR_OVER_a5: IntervalSet;

export let MINOR_OVER_m2: IntervalSet;

export let MINOR_OVER_M2: IntervalSet;

export let MINOR_OVER_M3: IntervalSet;

export let MINOR_OVER_P4: IntervalSet;

export let MINOR_OVER_d5: IntervalSet;

export let MINOR_OVER_m7: IntervalSet;
