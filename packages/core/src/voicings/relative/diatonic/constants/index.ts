import { fromRootIntervalInts } from "../building";
import type { Voicing } from "../Voicing";
import { bass } from "../modifiers";
import { FIFTH, FOURTH, SECOND, THIRD, SIXTH as ISIXTH, SEVENTH as ISEVENTH } from "intervals/symbolic/diatonic/constants";

export function initialize() {
  SECOND_INTERVAL = fromRootIntervalInts(0, 1);
  THIRD_INTERVAL = fromRootIntervalInts(0, 2);
  FOURTH_INTERVAL = fromRootIntervalInts(0, 3);
  FIFTH_INTERVAL = fromRootIntervalInts(0, 4);
  SIXTH_INTERVAL = fromRootIntervalInts(0, 5);
  SEVENTH_INTERVAL = fromRootIntervalInts(0, 6);

  TRIAD = fromRootIntervalInts(0, 2, 4);

  QUARTAL = fromRootIntervalInts(0, 3, 6);

  SIXTH = fromRootIntervalInts(0, 2, 4, 5);

  SIXTH_ADD9 = fromRootIntervalInts(0, 2, 4, 5, 8);

  SEVENTH = fromRootIntervalInts(0, 2, 4, 6);

  SEVENTH_ADD11 = fromRootIntervalInts(0, 2, 4, 6, 10);

  SEVENTH_ADD13 = fromRootIntervalInts(0, 2, 4, 6, 12);

  NINTH = fromRootIntervalInts(0, 2, 4, 6, 8);

  NINTH_SUS4 = fromRootIntervalInts(0, 3, 4, 6, 8);

  NINTH_ADD6 = fromRootIntervalInts(0, 2, 4, 5, 6, 8);

  ELEVENTH = fromRootIntervalInts(0, 2, 4, 6, 8, 10);

  THIRTEENTH = fromRootIntervalInts(0, 2, 4, 6, 8, 10, 12);

  THIRTEENTH_SUS4 = fromRootIntervalInts(0, 3, 4, 6, 8, 10, 12);

  SUS4 = fromRootIntervalInts(0, 3, 4);

  SEVENTH_SUS4 = fromRootIntervalInts(0, 3, 4, 6);

  TRIAD_OVER_SECOND = bass(TRIAD, SECOND);
  TRIAD_OVER_THIRD = bass(TRIAD, THIRD);
  TRIAD_OVER_FOURTH = bass(TRIAD, FOURTH);
  TRIAD_OVER_FIFTH = bass(TRIAD, FIFTH);
  TRIAD_OVER_SIXTH = bass(TRIAD, ISIXTH);
  TRIAD_OVER_SEVENTH = bass(TRIAD, ISEVENTH);
}

export let SECOND_INTERVAL: Voicing;

export let THIRD_INTERVAL: Voicing;

export let FOURTH_INTERVAL: Voicing;

export let FIFTH_INTERVAL: Voicing;

export let SIXTH_INTERVAL: Voicing;

export let SEVENTH_INTERVAL: Voicing;

export let TRIAD: Voicing;

export let QUARTAL: Voicing;

export let SIXTH: Voicing;

export let SIXTH_ADD9: Voicing;

export let SEVENTH: Voicing;

export let SEVENTH_ADD11: Voicing;

export let SEVENTH_ADD13: Voicing;

export let NINTH: Voicing;

export let NINTH_SUS4: Voicing;

export let NINTH_ADD6: Voicing;

export let ELEVENTH: Voicing;

export let THIRTEENTH: Voicing;

export let THIRTEENTH_SUS4: Voicing;

export let SUS4: Voicing;

export let SEVENTH_SUS4: Voicing;

export let TRIAD_OVER_SECOND: Voicing;

export let TRIAD_OVER_THIRD: Voicing;

export let TRIAD_OVER_FOURTH: Voicing;

export let TRIAD_OVER_FIFTH: Voicing;

export let TRIAD_OVER_SIXTH: Voicing;

export let TRIAD_OVER_SEVENTH: Voicing;
