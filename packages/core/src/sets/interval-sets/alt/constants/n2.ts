/* eslint-disable max-len */
import type { IntervalSet } from "../IntervalSet";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { fromIntervalSets } from "../building/intervalSets";

export function initializeN2() {
  const { INTERVAL_FIFTH, INTERVAL_FOURTH, INTERVAL_SECOND, INTERVAL_SEVENTH, INTERVAL_SIXTH, INTERVAL_THIRD } = DIS;

  POWER_CHORD = fromIntervalSets(CIS.POWER_CHORD, INTERVAL_FIFTH) as IntervalSet;
  m2 = fromIntervalSets(CIS.m2, INTERVAL_SECOND) as IntervalSet;
  M2 = fromIntervalSets(CIS.M2, INTERVAL_SECOND) as IntervalSet;
  m3 = fromIntervalSets(CIS.m3, INTERVAL_THIRD) as IntervalSet;
  M3 = fromIntervalSets(CIS.M3, INTERVAL_THIRD) as IntervalSet;
  P4 = fromIntervalSets(CIS.P4, INTERVAL_FOURTH) as IntervalSet;
  d5 = fromIntervalSets(CIS.TRITONE, INTERVAL_FIFTH) as IntervalSet;
  m6 = fromIntervalSets(CIS.m6, INTERVAL_SIXTH) as IntervalSet;
  M6 = fromIntervalSets(CIS.M6, INTERVAL_SIXTH) as IntervalSet;
  m7 = fromIntervalSets(CIS.m7, INTERVAL_SEVENTH) as IntervalSet;
  M7 = fromIntervalSets(CIS.M7, INTERVAL_SEVENTH) as IntervalSet;
}

export let m2: IntervalSet;

export let M2: IntervalSet;

export let m3: IntervalSet;

export let M3: IntervalSet;

export let d5: IntervalSet;

export let POWER_CHORD: IntervalSet;

export let P4: IntervalSet;

export let m6: IntervalSet;

export let M6: IntervalSet;

export let m7: IntervalSet;

export let M7: IntervalSet;
