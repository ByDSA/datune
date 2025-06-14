import type { IntervalSet } from "../IntervalSet";
import { IntervalSets } from "..";
import { fromRootIntervals } from "../building/rootIntervals";
import { map } from "./inversionMap";

export function initializeN3() {
  TRIAD_MAJOR = fromRootIntervals(0, 4, 7);

  TRIAD_MINOR = fromRootIntervals(0, 3, 7);

  TRIAD_DIMINISHED = fromRootIntervals(0, 3, 6);

  TRIAD_AUGMENTED = fromRootIntervals(0, 4, 8);

  TRIAD_SUS4 = fromRootIntervals(0, 5, 7);

  TRIAD_SUS2 = fromRootIntervals(0, 2, 7);

  TRIAD_QUARTAL = fromRootIntervals(0, 5, 10);

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 3; i++) {
    map.set(IntervalSets.inv(TRIAD_MAJOR, i), i);
    map.set(IntervalSets.inv(TRIAD_MINOR, i), i);
    map.set(IntervalSets.inv(TRIAD_DIMINISHED, i), i);
  }
}

export let TRIAD_MAJOR: IntervalSet;

export let TRIAD_MINOR: IntervalSet;

export let TRIAD_DIMINISHED: IntervalSet;

export let TRIAD_AUGMENTED: IntervalSet;

export let TRIAD_SUS4: IntervalSet;

export let TRIAD_SUS2: IntervalSet;

export let TRIAD_QUARTAL: IntervalSet;
