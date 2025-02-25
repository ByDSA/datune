/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable import/no-mutable-exports */
import { inv } from "..";
import fromRootIntervals from "../building/rootIntervals";
import Voicing from "../Voicing";
import { map } from "./inversionMap";

export function initializeN7() {
  THIRTEENTH_MAJ13 = fromRootIntervals(0, 4, 7, 11, 14, 17, 21);

  THIRTEENTH_MINOR = fromRootIntervals(0, 3, 7, 10, 14, 17, 21);

  THIRTEENTH_SUS4 = fromRootIntervals(0, 5, 7, 10, 14, 17, 21);

  THIRTEENTH_b5 = fromRootIntervals(0, 4, 6, 10, 14, 17, 21);

  THIRTEENTH_MAJ13_b9 = fromRootIntervals(0, 4, 7, 11, 13, 17, 21);

  THIRTEENTH_a5 = fromRootIntervals(0, 4, 8, 10, 14, 17, 21);

  THIRTEENTH_MAJ13_a9 = fromRootIntervals(0, 4, 7, 11, 15, 17, 21);

  THIRTEENTH_b9 = fromRootIntervals(0, 4, 7, 10, 13, 17, 21);

  THIRTEENTH_a9 = fromRootIntervals(0, 4, 7, 10, 15, 17, 21);

  THIRTEENTH_b5a9 = fromRootIntervals(0, 4, 6, 10, 15, 17, 21);

  THIRTEENTH_a5b9 = fromRootIntervals(0, 4, 8, 10, 13, 17, 21);

  THIRTEENTH_a5a9 = fromRootIntervals(0, 4, 8, 10, 15, 17, 21);

  THIRTEENTH_MINOR_MAJ13 = fromRootIntervals(0, 3, 7, 11, 14, 17, 21);

  THIRTEENTH_MAJ13_b5 = fromRootIntervals(0, 4, 6, 11, 14, 17, 21);

  THIRTEENTH_MAJ13_a5 = fromRootIntervals(0, 4, 8, 11, 14, 17, 21);

  THIRTEENTH_MAJ13_b5b9 = fromRootIntervals(0, 4, 6, 11, 13, 17, 21);

  THIRTEENTH_MAJ13_b5a9 = fromRootIntervals(0, 4, 6, 11, 15, 17, 21);

  THIRTEENTH_MAJ13_a5b9 = fromRootIntervals(0, 4, 8, 11, 13, 17, 21);

  THIRTEENTH_MAJ13_a5a9 = fromRootIntervals(0, 4, 8, 11, 15, 17, 21);

  THIRTEENTH_b5b9 = fromRootIntervals(0, 4, 6, 10, 13, 17, 21);

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 7; i++) {
    map.set(inv(THIRTEENTH_MAJ13, i), i);
    map.set(inv(THIRTEENTH_MINOR, i), i);
    map.set(inv(THIRTEENTH_b5a9, i), i);
  }
}

export let THIRTEENTH_b5: Voicing;

export let THIRTEENTH_a5: Voicing;

export let THIRTEENTH_b9: Voicing;

export let THIRTEENTH_a9: Voicing;

export let THIRTEENTH_b5a9: Voicing;

export let THIRTEENTH_a5b9: Voicing;

export let THIRTEENTH_b5b9: Voicing;

export let THIRTEENTH_a5a9: Voicing;

export let THIRTEENTH_MINOR_MAJ13: Voicing;

export let THIRTEENTH_MAJ13_b5: Voicing;

export let THIRTEENTH_MAJ13_a5: Voicing;

export let THIRTEENTH_MAJ13_b5b9: Voicing;

export let THIRTEENTH_MAJ13_b5a9: Voicing;

export let THIRTEENTH_MAJ13_a5b9: Voicing;

export let THIRTEENTH_MAJ13_a5a9: Voicing;

export let THIRTEENTH_MAJ13_a9: Voicing;

export let THIRTEENTH_MAJ13_b9: Voicing;

export let THIRTEENTH_MAJ13: Voicing;

export let THIRTEENTH: Voicing;

export let THIRTEENTH_MINOR: Voicing;

export let THIRTEENTH_SUS4: Voicing;
