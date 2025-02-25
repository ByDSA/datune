/* eslint-disable import/no-mutable-exports */

import { fromRootIntervalInts } from "../building";
import DiatonicVoicing from "../DiatonicVoicing";

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
}

export let SECOND_INTERVAL: DiatonicVoicing;

export let THIRD_INTERVAL: DiatonicVoicing;

export let FOURTH_INTERVAL: DiatonicVoicing;

export let FIFTH_INTERVAL: DiatonicVoicing;

export let SIXTH_INTERVAL: DiatonicVoicing;

export let SEVENTH_INTERVAL: DiatonicVoicing;

export let TRIAD: DiatonicVoicing;

export let QUARTAL: DiatonicVoicing;

export let SIXTH: DiatonicVoicing;

export let SIXTH_ADD9: DiatonicVoicing;

export let SEVENTH: DiatonicVoicing;

export let SEVENTH_ADD11: DiatonicVoicing;

export let SEVENTH_ADD13: DiatonicVoicing;

export let NINTH: DiatonicVoicing;

export let NINTH_SUS4: DiatonicVoicing;

export let NINTH_ADD6: DiatonicVoicing;

export let ELEVENTH: DiatonicVoicing;

export let THIRTEENTH: DiatonicVoicing;

export let THIRTEENTH_SUS4: DiatonicVoicing;

export let SUS4: DiatonicVoicing;

export let SEVENTH_SUS4: DiatonicVoicing;
