import type { IntervalSet } from "./IntervalSet";
import { assertNotInitialized } from "@datune/utils/errors/not-initialized";
import { FIFTH, FOURTH, SECOND, THIRD, SIXTH as ISIXTH, SEVENTH as ISEVENTH, initialize as initializeIntervals } from "intervals/symbolic/diatonic/constants";
import { fromRootIntervalsMagnitude } from "./building";
import { bass } from "./modifiers";

export function initialize() {
  assertNotInitialized(TRIAD);

  if (!SECOND)
    initializeIntervals();

  EMPTY = fromRootIntervalsMagnitude();
  INTERVAL_SECOND = fromRootIntervalsMagnitude(0, 1);
  INTERVAL_THIRD = fromRootIntervalsMagnitude(0, 2);
  INTERVAL_FOURTH = fromRootIntervalsMagnitude(0, 3);
  INTERVAL_FIFTH = fromRootIntervalsMagnitude(0, 4);
  INTERVAL_SIXTH = fromRootIntervalsMagnitude(0, 5);
  INTERVAL_SEVENTH = fromRootIntervalsMagnitude(0, 6);

  TRIAD = fromRootIntervalsMagnitude(0, 2, 4);

  QUARTAL = fromRootIntervalsMagnitude(0, 3, 6);

  SIXTH = fromRootIntervalsMagnitude(0, 2, 4, 5);

  SIXTH_ADD9 = fromRootIntervalsMagnitude(0, 2, 4, 5, 8);

  SEVENTH = fromRootIntervalsMagnitude(0, 2, 4, 6);

  SEVENTH_ADD11 = fromRootIntervalsMagnitude(0, 2, 4, 6, 10);

  SEVENTH_ADD13 = fromRootIntervalsMagnitude(0, 2, 4, 6, 12);

  NINTH = fromRootIntervalsMagnitude(0, 2, 4, 6, 8);

  NINTH_SUS4 = fromRootIntervalsMagnitude(0, 3, 4, 6, 8);

  NINTH_ADD6 = fromRootIntervalsMagnitude(0, 2, 4, 5, 6, 8);

  ELEVENTH = fromRootIntervalsMagnitude(0, 2, 4, 6, 8, 10);

  THIRTEENTH = fromRootIntervalsMagnitude(0, 2, 4, 6, 8, 10, 12);

  THIRTEENTH_SUS4 = fromRootIntervalsMagnitude(0, 3, 4, 6, 8, 10, 12);

  SUS4 = fromRootIntervalsMagnitude(0, 3, 4);

  SEVENTH_SUS4 = fromRootIntervalsMagnitude(0, 3, 4, 6);

  TRIAD_OVER_SECOND = bass(TRIAD, SECOND);
  TRIAD_OVER_THIRD = bass(TRIAD, THIRD);
  TRIAD_OVER_FOURTH = bass(TRIAD, FOURTH);
  TRIAD_OVER_FIFTH = bass(TRIAD, FIFTH);
  TRIAD_OVER_SIXTH = bass(TRIAD, ISIXTH);
  TRIAD_OVER_SEVENTH = bass(TRIAD, ISEVENTH);
}

export let EMPTY: IntervalSet;

export let INTERVAL_SECOND: IntervalSet;

export let INTERVAL_THIRD: IntervalSet;

export let INTERVAL_FOURTH: IntervalSet;

export let INTERVAL_FIFTH: IntervalSet;

export let INTERVAL_SIXTH: IntervalSet;

export let INTERVAL_SEVENTH: IntervalSet;

export let TRIAD: IntervalSet;

export let QUARTAL: IntervalSet;

export let SIXTH: IntervalSet;

export let SIXTH_ADD9: IntervalSet;

export let SEVENTH: IntervalSet;

export let SEVENTH_ADD11: IntervalSet;

export let SEVENTH_ADD13: IntervalSet;

export let NINTH: IntervalSet;

export let NINTH_SUS4: IntervalSet;

export let NINTH_ADD6: IntervalSet;

export let ELEVENTH: IntervalSet;

export let THIRTEENTH: IntervalSet;

export let THIRTEENTH_SUS4: IntervalSet;

export let SUS4: IntervalSet;

export let SEVENTH_SUS4: IntervalSet;

export let TRIAD_OVER_SECOND: IntervalSet;

export let TRIAD_OVER_THIRD: IntervalSet;

export let TRIAD_OVER_FOURTH: IntervalSet;

export let TRIAD_OVER_FIFTH: IntervalSet;

export let TRIAD_OVER_SIXTH: IntervalSet;

export let TRIAD_OVER_SEVENTH: IntervalSet;
