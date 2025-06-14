/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { fromIntervalSets } from "../building/intervalSets";

export function initializeN6() {
  NINTH_ADD6 = fromIntervalSets(CIS.NINTH_ADD6, DIS.NINTH_ADD6) as IntervalSet;

  SEVENTH_ADD11 = fromIntervalSets(
    CIS.SEVENTH_ADD11,
    DIS.SEVENTH_ADD11,
  ) as IntervalSet;

  NINTH_a11 = fromIntervalSets(CIS.NINTH_a11, DIS.ELEVENTH) as IntervalSet;

  NINTH_MAJ9_a11 = fromIntervalSets(
    CIS.NINTH_MAJ9_a11,
    DIS.ELEVENTH,
  ) as IntervalSet;

  ELEVENTH = fromIntervalSets(CIS.ELEVENTH, DIS.ELEVENTH) as IntervalSet;

  ELEVENTH_MINOR = fromIntervalSets(
    CIS.ELEVENTH_MINOR,
    DIS.ELEVENTH,
  ) as IntervalSet;

  ELEVENTH_b9 = fromIntervalSets(
    CIS.ELEVENTH_b9,
    DIS.ELEVENTH,
  ) as IntervalSet;

  ELEVENTH_a9 = fromIntervalSets(
    CIS.ELEVENTH_a9,
    DIS.ELEVENTH,
  ) as IntervalSet;

  ELEVENTH_MAJ11 = fromIntervalSets(
    CIS.ELEVENTH_MAJ11,
    DIS.ELEVENTH,
  ) as IntervalSet;

  ELEVENTH_MINOR_MAJ11 = fromIntervalSets(
    CIS.ELEVENTH_MINOR_MAJ11,
    DIS.ELEVENTH,
  ) as IntervalSet;
}

export let NINTH_ADD6: IntervalSet;

export let SEVENTH_ADD11: IntervalSet;

export let NINTH_a11: IntervalSet;

export let NINTH_MAJ9_a11: IntervalSet;

export let ELEVENTH: IntervalSet;

export let ELEVENTH_MINOR: IntervalSet;

export let ELEVENTH_b9: IntervalSet;

export let ELEVENTH_a9: IntervalSet;

export let ELEVENTH_MAJ11: IntervalSet;

export let ELEVENTH_MINOR_MAJ11: IntervalSet;
