/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { fromIntervalSets } from "../building/intervalSets";
import { inv } from "../modifiers/inv";
import { map } from "./inversionMap";

export function initializeN7() {
  THIRTEENTH_MAJ13 = fromIntervalSets(CIS.THIRTEENTH_MAJ13, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_MINOR = fromIntervalSets(CIS.THIRTEENTH_MINOR, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_SUS4 = fromIntervalSets(CIS.THIRTEENTH_SUS4, DIS.THIRTEENTH_SUS4) as IntervalSet;

  THIRTEENTH_b5 = fromIntervalSets(CIS.THIRTEENTH_b5, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_a5 = fromIntervalSets(CIS.THIRTEENTH_a5, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_MAJ13_b9 = fromIntervalSets(CIS.THIRTEENTH_MAJ13_b9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_MAJ13_a9 = fromIntervalSets(CIS.THIRTEENTH_MAJ13_a9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_b9 = fromIntervalSets(CIS.THIRTEENTH_b9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_a9 = fromIntervalSets(CIS.THIRTEENTH_a9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_MAJ13_a5a9 = fromIntervalSets(
    CIS.THIRTEENTH_MAJ13_a5a9,
    DIS.THIRTEENTH,
  ) as IntervalSet;

  THIRTEENTH_b5b9 = fromIntervalSets(CIS.THIRTEENTH_b5b9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_b5a9 = fromIntervalSets(CIS.THIRTEENTH_b5a9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_a5b9 = fromIntervalSets(CIS.THIRTEENTH_a5b9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_a5a9 = fromIntervalSets(CIS.THIRTEENTH_a5a9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_MINOR_MAJ13 = fromIntervalSets(
    CIS.THIRTEENTH_MINOR_MAJ13,
    DIS.THIRTEENTH,
  ) as IntervalSet;

  THIRTEENTH_MAJ13_b5 = fromIntervalSets(CIS.THIRTEENTH_MAJ13_b5, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_MAJ13_a5 = fromIntervalSets(CIS.THIRTEENTH_MAJ13_a5, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_MAJ13_b9 = fromIntervalSets(CIS.THIRTEENTH_MAJ13_b9, DIS.THIRTEENTH) as IntervalSet;

  THIRTEENTH_MAJ13_b5b9 = fromIntervalSets(
    CIS.THIRTEENTH_MAJ13_b5b9,
    DIS.THIRTEENTH,
  ) as IntervalSet;

  THIRTEENTH_MAJ13_b5a9 = fromIntervalSets(
    CIS.THIRTEENTH_MAJ13_b5a9,
    DIS.THIRTEENTH,
  ) as IntervalSet;

  THIRTEENTH_MAJ13_a5b9 = fromIntervalSets(
    CIS.THIRTEENTH_MAJ13_a5b9,
    DIS.THIRTEENTH,
  ) as IntervalSet;

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 7; i++) {
    map.set(inv(THIRTEENTH_MAJ13, i), i);
    map.set(inv(THIRTEENTH_MINOR, i), i);
    map.set(inv(THIRTEENTH_b5a9, i), i);
  }
}

export let THIRTEENTH_MINOR: IntervalSet;

export let THIRTEENTH_SUS4: IntervalSet;

export let THIRTEENTH_b5: IntervalSet;

export let THIRTEENTH_a5: IntervalSet;

export let THIRTEENTH_b9: IntervalSet;

export let THIRTEENTH_a9: IntervalSet;

export let THIRTEENTH_b5b9: IntervalSet;

export let THIRTEENTH_b5a9: IntervalSet;

export let THIRTEENTH_a5b9: IntervalSet;

export let THIRTEENTH_a5a9: IntervalSet;

export let THIRTEENTH_MAJ13: IntervalSet;

export let THIRTEENTH_MINOR_MAJ13: IntervalSet;

export let THIRTEENTH_MAJ13_b5: IntervalSet;

export let THIRTEENTH_MAJ13_a5: IntervalSet;

export let THIRTEENTH_MAJ13_b9: IntervalSet;

export let THIRTEENTH_MAJ13_a9: IntervalSet;

export let THIRTEENTH_MAJ13_b5b9: IntervalSet;

export let THIRTEENTH_MAJ13_b5a9: IntervalSet;

export let THIRTEENTH_MAJ13_a5b9: IntervalSet;

export let THIRTEENTH_MAJ13_a5a9: IntervalSet;
