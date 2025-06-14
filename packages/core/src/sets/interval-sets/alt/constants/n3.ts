import type { IntervalSet } from "../IntervalSet";
import { IntervalSets as DIS } from "sets/interval-sets/diatonic";
import { IntervalSets as CIS } from "sets/interval-sets/chromatic";
import { P8, initialize as initializeIntervals } from "intervals/symbolic/alt/constants";
import { fromIntervalSets } from "../building/intervalSets";
import { inv } from "../modifiers/inv";
import { map } from "./inversionMap";

export function initializeN3() {
  const { SUS4, TRIAD } = DIS;

  TRIAD_MAJOR = fromIntervalSets(CIS.TRIAD_MAJOR, TRIAD) as IntervalSet;

  TRIAD_MINOR = fromIntervalSets(CIS.TRIAD_MINOR, TRIAD) as IntervalSet;

  TRIAD_DIMINISHED = fromIntervalSets(CIS.TRIAD_DIMINISHED, TRIAD) as IntervalSet;

  TRIAD_AUGMENTED = fromIntervalSets(CIS.TRIAD_AUGMENTED, TRIAD) as IntervalSet;

  TRIAD_SUS4 = fromIntervalSets(CIS.TRIAD_SUS4, SUS4) as IntervalSet;

  if (!P8)
    initializeIntervals();

  TRIAD_SUS2 = inv(TRIAD_SUS4) as IntervalSet;

  TRIAD_QUARTAL = inv(TRIAD_SUS2) as IntervalSet;

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 3; i++) {
    map.set(inv(TRIAD_MAJOR, i), i);
    map.set(inv(TRIAD_MINOR, i), i);
    map.set(inv(TRIAD_DIMINISHED, i), i);
    map.set(inv(TRIAD_AUGMENTED, i), i);
  }
}

export let TRIAD_MAJOR: IntervalSet;

export let TRIAD_MINOR: IntervalSet;

export let TRIAD_DIMINISHED: IntervalSet;

export let TRIAD_AUGMENTED: IntervalSet;

export let TRIAD_SUS4: IntervalSet;

export let TRIAD_SUS2: IntervalSet;

export let TRIAD_QUARTAL: IntervalSet;
