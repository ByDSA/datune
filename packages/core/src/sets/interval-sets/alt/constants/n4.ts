/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { fromIntervalSets } from "../building/intervalSets";
import { inv } from "../modifiers/inv";
import { map } from "./inversionMap";

export function initializeN4() {
  SEVENTH = fromIntervalSets(CIS.SEVENTH, DIS.SEVENTH) as IntervalSet;

  SEVENTH_b5 = fromIntervalSets(CIS.SEVENTH_b5, DIS.SEVENTH) as IntervalSet;

  SEVENTH_MAJ7_b5 = fromIntervalSets(
    CIS.SEVENTH_MAJ7_b5,
    DIS.SEVENTH,
  ) as IntervalSet;

  SEVENTH_a5 = fromIntervalSets(CIS.SEVENTH_a5, DIS.SEVENTH) as IntervalSet;

  SEVENTH_SUS4 = fromIntervalSets(
    CIS.SEVENTH_SUS4,
    DIS.SEVENTH_SUS4,
  ) as IntervalSet;

  SEVENTH_SUS4_b9 = fromIntervalSets(
    CIS.SEVENTH_SUS4_b9,
    DIS.NINTH_SUS4,
  ) as IntervalSet;

  SEVENTH_MINOR = fromIntervalSets(CIS.SEVENTH_MINOR, DIS.SEVENTH) as IntervalSet;

  SIXTH = fromIntervalSets(CIS.SIXTH, DIS.SIXTH) as IntervalSet;

  SEVENTH_MINOR_b5 = fromIntervalSets(
    CIS.SEVENTH_MINOR_b5,
    DIS.SEVENTH,
  ) as IntervalSet;

  SIXTH_MINOR = fromIntervalSets(CIS.SIXTH_MINOR, DIS.SIXTH) as IntervalSet;

  SEVENTH_MINOR_a5 = fromIntervalSets(
    CIS.SEVENTH_MINOR_a5,
    DIS.SEVENTH,
  ) as IntervalSet;

  SIXTH_SUS4 = fromIntervalSets(CIS.SIXTH_SUS4, DIS.SIXTH) as IntervalSet;

  SEVENTH_MAJ7 = fromIntervalSets(CIS.SEVENTH_MAJ7, DIS.SEVENTH) as IntervalSet;

  SEVENTH_MINOR_MAJ7 = fromIntervalSets(
    CIS.SEVENTH_MINOR_MAJ7,
    DIS.SEVENTH,
  ) as IntervalSet;

  MAJOR_OVER_M2 = fromIntervalSets(
    CIS.MAJOR_OVER_M2,
    DIS.TRIAD_OVER_SECOND,
  ) as IntervalSet;

  MAJOR_OVER_m2 = fromIntervalSets(
    CIS.MAJOR_OVER_m2,
    DIS.TRIAD_OVER_SECOND,
  ) as IntervalSet;

  MAJOR_OVER_m3 = fromIntervalSets(
    CIS.MAJOR_OVER_m3,
    DIS.TRIAD_OVER_THIRD,
  ) as IntervalSet;

  MAJOR_OVER_P4 = fromIntervalSets(
    CIS.MAJOR_OVER_P4,
    DIS.TRIAD_OVER_FOURTH,
  ) as IntervalSet;

  MAJOR_OVER_a4 = fromIntervalSets(
    CIS.MAJOR_OVER_d5,
    DIS.TRIAD_OVER_FOURTH,
  ) as IntervalSet;

  MAJOR_OVER_d5 = fromIntervalSets(
    CIS.MAJOR_OVER_d5,
    DIS.TRIAD_OVER_FIFTH,
  ) as IntervalSet;

  MAJOR_OVER_a5 = fromIntervalSets(
    CIS.MAJOR_OVER_a5,
    DIS.TRIAD_OVER_FIFTH,
  ) as IntervalSet;

  MAJOR_OVER_m6 = fromIntervalSets(
    CIS.MAJOR_OVER_a5,
    DIS.TRIAD_OVER_SIXTH,
  ) as IntervalSet;

  MINOR_OVER_m2 = fromIntervalSets(
    CIS.MINOR_OVER_m2,
    DIS.TRIAD_OVER_SECOND,
  ) as IntervalSet;

  MINOR_OVER_M2 = fromIntervalSets(
    CIS.MINOR_OVER_M2,
    DIS.TRIAD_OVER_SECOND,
  ) as IntervalSet;

  MINOR_OVER_M3 = fromIntervalSets(
    CIS.MINOR_OVER_M3,
    DIS.TRIAD_OVER_THIRD,
  ) as IntervalSet;

  MINOR_OVER_P4 = fromIntervalSets(
    CIS.MINOR_OVER_P4,
    DIS.TRIAD_OVER_FOURTH,
  ) as IntervalSet;

  MINOR_OVER_a4 = fromIntervalSets(
    CIS.MINOR_OVER_d5,
    DIS.TRIAD_OVER_FOURTH,
  ) as IntervalSet;

  MINOR_OVER_d5 = fromIntervalSets(
    CIS.MINOR_OVER_d5,
    DIS.TRIAD_OVER_FIFTH,
  ) as IntervalSet;

  MINOR_OVER_m7 = fromIntervalSets(
    CIS.MINOR_OVER_m7,
    DIS.TRIAD_OVER_SEVENTH,
  ) as IntervalSet;

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 4; i++) {
    map.set(inv(SEVENTH, i), i);
    map.set(inv(SEVENTH_MAJ7, i), i);
    map.set(inv(SEVENTH_MINOR_MAJ7, i), i);
  }
}

export let SEVENTH: IntervalSet;

export let SEVENTH_b5: IntervalSet;

export let SEVENTH_MAJ7_b5: IntervalSet;

export let SEVENTH_a5: IntervalSet;

export let SEVENTH_SUS4: IntervalSet;

export let SEVENTH_SUS4_b9: IntervalSet;

export let SEVENTH_MINOR: IntervalSet;

export let SEVENTH_MINOR_b5: IntervalSet;

export let SEVENTH_MINOR_a5: IntervalSet;

export let SIXTH: IntervalSet;

export let SIXTH_MINOR: IntervalSet;

export let SIXTH_SUS4: IntervalSet;

export let SEVENTH_MAJ7: IntervalSet;

export let SEVENTH_MINOR_MAJ7: IntervalSet;

export let MAJOR_OVER_m2: IntervalSet;

export let MAJOR_OVER_M2: IntervalSet;

export let MAJOR_OVER_m3: IntervalSet;

export let MAJOR_OVER_P4: IntervalSet;

export let MAJOR_OVER_a4: IntervalSet;

export let MAJOR_OVER_d5: IntervalSet;

export let MAJOR_OVER_a5: IntervalSet;

export let MAJOR_OVER_m6: IntervalSet;

export let MINOR_OVER_m2: IntervalSet;

export let MINOR_OVER_M2: IntervalSet;

export let MINOR_OVER_M3: IntervalSet;

export let MINOR_OVER_P4: IntervalSet;

export let MINOR_OVER_a4: IntervalSet;

export let MINOR_OVER_d5: IntervalSet;

export let MINOR_OVER_m7: IntervalSet;
