/* eslint-disable camelcase */

import { Voicings } from "..";
import { fromRootIntervals } from "../building/rootIntervals";
import Voicing from "../Voicing";
import { map } from "./inversionMap";

export function initializeN4() {
  SEVENTH = fromRootIntervals(0, 4, 7, 10);

  SEVENTH_b5 = fromRootIntervals(0, 4, 6, 10);

  SEVENTH_a5 = fromRootIntervals(0, 4, 8, 10);

  SEVENTH_MINOR = fromRootIntervals(0, 3, 7, 10);

  SIXTH = fromRootIntervals(0, 4, 7, 9);

  SEVENTH_MINOR_b5 = fromRootIntervals(0, 3, 6, 10);

  SIXTH_MINOR = fromRootIntervals(0, 3, 7, 9);

  SEVENTH_MINOR_a5 = fromRootIntervals(0, 3, 8, 10);

  SIXTH_SUS4 = fromRootIntervals(0, 5, 7, 9);

  SEVENTH_MINOR_MAJ7 = fromRootIntervals(0, 3, 7, 11);

  SEVENTH_MAJ7 = fromRootIntervals(0, 4, 7, 11);

  SEVENTH_MAJ7_b5 = fromRootIntervals(0, 4, 6, 11);

  SEVENTH_MAJ7b5 = fromRootIntervals(0, 4, 6, 11);

  SEVENTH_SUS4 = fromRootIntervals(0, 5, 7, 10);

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 4; i++) {
    map.set(Voicings.inv(SEVENTH, i), i);
    map.set(Voicings.inv(SEVENTH_MAJ7, i), i);
    map.set(Voicings.inv(SEVENTH_MINOR_MAJ7, i), i);
  }
}

export let SEVENTH: Voicing;

export let SEVENTH_b5: Voicing;

export let SEVENTH_a5: Voicing;

export let SEVENTH_MINOR: Voicing;

export let SEVENTH_MAJ7_b5: Voicing;

export let SIXTH: Voicing;

export let SEVENTH_MINOR_b5: Voicing;

export let SIXTH_MINOR: Voicing;

export let SEVENTH_MINOR_a5: Voicing;

export let SIXTH_SUS4: Voicing;

export let SEVENTH_MINOR_MAJ7: Voicing;

export let SEVENTH_MAJ7: Voicing;

export let SEVENTH_MAJ7b5: Voicing;

export let SEVENTH_SUS4: Voicing;
