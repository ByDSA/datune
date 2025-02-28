/* eslint-disable camelcase */

import { fromRootIntervals } from "../building/rootIntervals";
import type { Voicing } from "../Voicing";

export function initializeN5() {
  SIXTH_ADD9 = fromRootIntervals(0, 4, 7, 9, 14);

  SIXTH_MINOR_ADD9 = fromRootIntervals(0, 3, 7, 9, 14);

  SEVENTH_b9 = fromRootIntervals(0, 4, 7, 10, 13);

  SEVENTH_a9 = fromRootIntervals(0, 4, 7, 10, 15);

  SEVENTH_SUS4_b9 = fromRootIntervals(0, 5, 7, 10, 15);

  SEVENTH_MINOR_b9 = fromRootIntervals(0, 3, 7, 10, 13);

  SEVENTH_ADD13 = fromRootIntervals(0, 4, 7, 10, 21);

  NINTH = fromRootIntervals(0, 4, 7, 10, 14);

  NINTH_MINOR = fromRootIntervals(0, 3, 7, 10, 14);

  NINTH_b5 = fromRootIntervals(0, 4, 6, 10, 14);

  NINTH_a5 = fromRootIntervals(0, 4, 8, 10, 14);

  NINTH_SUS4 = fromRootIntervals(0, 5, 7, 10, 14);

  NINTH_MAJ9 = fromRootIntervals(0, 4, 7, 11, 14);

  NINTH_MINOR_MAJ9 = fromRootIntervals(0, 3, 7, 11, 14);
}

export let SIXTH_ADD9: Voicing;

export let SIXTH_MINOR_ADD9: Voicing;

export let SEVENTH_b9: Voicing;

export let SEVENTH_a9: Voicing;

export let SEVENTH_SUS4_b9: Voicing;

export let SEVENTH_MINOR_b9: Voicing;

export let SEVENTH_ADD13: Voicing;

export let NINTH: Voicing;

export let NINTH_MINOR: Voicing;

export let NINTH_b5: Voicing;

export let NINTH_a5: Voicing;

export let NINTH_SUS4: Voicing;

export let NINTH_MAJ9: Voicing;

export let NINTH_MINOR_MAJ9: Voicing;
