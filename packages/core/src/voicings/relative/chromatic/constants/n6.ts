/* eslint-disable camelcase */

import { fromRootIntervals } from "../building/rootIntervals";
import Voicing from "../Voicing";

export function initializeN6() {
  NINTH_ADD6 = fromRootIntervals(0, 4, 7, 9, 10, 14);

  SEVENTH_ADD11 = fromRootIntervals(0, 4, 7, 10, 17);

  NINTH_a11 = fromRootIntervals(0, 4, 7, 10, 14, 18);

  NINTH_MAJ9_a11 = fromRootIntervals(0, 4, 7, 11, 14, 18);

  ELEVENTH = fromRootIntervals(0, 4, 7, 10, 14, 17);

  ELEVENTH_MINOR = fromRootIntervals(0, 3, 7, 10, 14, 17);

  ELEVENTH_b9 = fromRootIntervals(0, 4, 7, 10, 13, 17);

  ELEVENTH_a9 = fromRootIntervals(0, 4, 7, 10, 15, 17);

  ELEVENTH_MAJ11 = fromRootIntervals(0, 4, 7, 11, 14, 17);

  ELEVENTH_MINOR_MAJ11 = fromRootIntervals(0, 3, 7, 11, 14, 17);
}

export let NINTH_ADD6: Voicing;

export let SEVENTH_ADD11: Voicing;

export let NINTH_a11: Voicing;

export let NINTH_MAJ9_a11: Voicing;

export let ELEVENTH: Voicing;

export let ELEVENTH_MINOR: Voicing;

export let ELEVENTH_b9: Voicing;

export let ELEVENTH_a9: Voicing;

export let ELEVENTH_MAJ11: Voicing;

export let ELEVENTH_MINOR_MAJ11: Voicing;
