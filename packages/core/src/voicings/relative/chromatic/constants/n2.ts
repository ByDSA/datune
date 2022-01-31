/* eslint-disable import/no-mutable-exports */
import fromRootIntervals from "../building/rootIntervals";
import Voicing from "../Voicing";

/* eslint-disable import/prefer-default-export */
export function initializeN2() {
  MINOR_SECOND = fromRootIntervals(0, 1);
  MAJOR_SECOND = fromRootIntervals(0, 2);
  MINOR_THIRD = fromRootIntervals(0, 3);
  MAJOR_THIRD = fromRootIntervals(0, 4);
  PERFECT_FOURTH = fromRootIntervals(0, 5);
  TRITONE = fromRootIntervals(0, 6);
  POWER_CHORD = fromRootIntervals(0, 7);
  MINOR_SIXTH = fromRootIntervals(0, 8);
  MAJOR_SIXTH = fromRootIntervals(0, 9);
  MINOR_SEVENTH = fromRootIntervals(0, 10);
  MAJOR_SEVENTH = fromRootIntervals(0, 11);
}

export let MINOR_SECOND: Voicing;

export let MAJOR_SECOND: Voicing;

export let MINOR_THIRD: Voicing;

export let MAJOR_THIRD: Voicing;

export let TRITONE: Voicing;

export let POWER_CHORD: Voicing;

export let PERFECT_FOURTH: Voicing;

export let MINOR_SIXTH: Voicing;

export let MAJOR_SIXTH: Voicing;

export let MINOR_SEVENTH: Voicing;

export let MAJOR_SEVENTH: Voicing;
