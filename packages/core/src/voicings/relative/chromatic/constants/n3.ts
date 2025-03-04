import type { Voicing } from "../Voicing";
import { Voicings } from "..";
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
    map.set(Voicings.inv(TRIAD_MAJOR, i), i);
    map.set(Voicings.inv(TRIAD_MINOR, i), i);
    map.set(Voicings.inv(TRIAD_DIMINISHED, i), i);
  }
}

export let TRIAD_MAJOR: Voicing;

export let TRIAD_MINOR: Voicing;

export let TRIAD_DIMINISHED: Voicing;

export let TRIAD_AUGMENTED: Voicing;

export let TRIAD_SUS4: Voicing;

export let TRIAD_SUS2: Voicing;

export let TRIAD_QUARTAL: Voicing;
