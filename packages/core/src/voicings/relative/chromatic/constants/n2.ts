import type { Voicing } from "../Voicing";
import { fromRootIntervals } from "../building/rootIntervals";

export function initializeN2() {
  m2 = fromRootIntervals(0, 1);
  M2 = fromRootIntervals(0, 2);
  m3 = fromRootIntervals(0, 3);
  M3 = fromRootIntervals(0, 4);
  P4 = fromRootIntervals(0, 5);
  TRITONE = fromRootIntervals(0, 6);
  POWER_CHORD = fromRootIntervals(0, 7);
  m6 = fromRootIntervals(0, 8);
  M6 = fromRootIntervals(0, 9);
  m7 = fromRootIntervals(0, 10);
  M7 = fromRootIntervals(0, 11);
}

export let m2: Voicing;

export let M2: Voicing;

export let m3: Voicing;

export let M3: Voicing;

export let TRITONE: Voicing;

export let POWER_CHORD: Voicing;

export let P4: Voicing;

export let m6: Voicing;

export let M6: Voicing;

export let m7: Voicing;

export let M7: Voicing;
