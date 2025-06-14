/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { fromIntervalSets } from "../building/intervalSets";

export function initializeN5() {
  SIXTH_ADD9 = fromIntervalSets(CIS.SIXTH_ADD9, DIS.SIXTH_ADD9) as IntervalSet;

  SIXTH_MINOR_ADD9 = fromIntervalSets(
    CIS.SIXTH_MINOR_ADD9,
    DIS.SIXTH_ADD9,
  ) as IntervalSet;

  SEVENTH_b9 = fromIntervalSets(CIS.SEVENTH_b9, DIS.NINTH) as IntervalSet;

  SEVENTH_a9 = fromIntervalSets(CIS.SEVENTH_a9, DIS.NINTH) as IntervalSet;

  SEVENTH_MINOR_b9 = fromIntervalSets(
    CIS.SEVENTH_MINOR_b9,
    DIS.NINTH,
  ) as IntervalSet;

  SEVENTH_ADD13 = fromIntervalSets(
    CIS.SEVENTH_ADD13,
    DIS.SEVENTH_ADD13,
  ) as IntervalSet;

  NINTH = fromIntervalSets(CIS.NINTH, DIS.NINTH) as IntervalSet;

  NINTH_MINOR = fromIntervalSets(CIS.NINTH_MINOR, DIS.NINTH) as IntervalSet;

  NINTH_b5 = fromIntervalSets(CIS.NINTH_b5, DIS.NINTH) as IntervalSet;

  NINTH_a5 = fromIntervalSets(CIS.NINTH_a5, DIS.NINTH) as IntervalSet;

  NINTH_SUS4 = fromIntervalSets(CIS.NINTH_SUS4, DIS.NINTH_SUS4) as IntervalSet;

  NINTH_MAJ9 = fromIntervalSets(CIS.NINTH_MAJ9, DIS.NINTH) as IntervalSet;

  NINTH_MINOR_MAJ9 = fromIntervalSets(
    CIS.NINTH_MINOR_MAJ9,
    DIS.NINTH,
  ) as IntervalSet;
}

export let SIXTH_ADD9: IntervalSet;

export let SIXTH_MINOR_ADD9: IntervalSet;

export let SEVENTH_b9: IntervalSet;

export let SEVENTH_a9: IntervalSet;

export let SEVENTH_MINOR_b9: IntervalSet;

export let SEVENTH_ADD13: IntervalSet;

export let NINTH: IntervalSet;

export let NINTH_MINOR: IntervalSet;

export let NINTH_b5: IntervalSet;

export let NINTH_a5: IntervalSet;

export let NINTH_SUS4: IntervalSet;

export let NINTH_MAJ9: IntervalSet;

export let NINTH_MINOR_MAJ9: IntervalSet;
