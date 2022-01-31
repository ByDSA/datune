/* eslint-disable camelcase */
import { CV_THIRTEENTH_a5, CV_THIRTEENTH_a5a9, CV_THIRTEENTH_a5b9, CV_THIRTEENTH_a9, CV_THIRTEENTH_b5, CV_THIRTEENTH_b5a9, CV_THIRTEENTH_b5b9, CV_THIRTEENTH_b9, CV_THIRTEENTH_MAJ13, CV_THIRTEENTH_MAJ13_a5, CV_THIRTEENTH_MAJ13_a5a9, CV_THIRTEENTH_MAJ13_a5b9, CV_THIRTEENTH_MAJ13_a9, CV_THIRTEENTH_MAJ13_b5, CV_THIRTEENTH_MAJ13_b5a9, CV_THIRTEENTH_MAJ13_b5b9, CV_THIRTEENTH_MAJ13_b9, CV_THIRTEENTH_MINOR, CV_THIRTEENTH_MINOR_MAJ13, CV_THIRTEENTH_SUS4, DV_THIRTEENTH, DV_THIRTEENTH_SUS4 } from "voicings";
import { fromVoicings } from "../building";
import { inv } from "../modifiers";
import Voicing from "../Voicing";
import { map } from "./inversionMap";

/* eslint-disable import/no-mutable-exports */
export function initializeN7() {
  THIRTEENTH_MAJ13 = fromVoicings(CV_THIRTEENTH_MAJ13, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MINOR = fromVoicings(CV_THIRTEENTH_MINOR, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_SUS4 = fromVoicings(CV_THIRTEENTH_SUS4, DV_THIRTEENTH_SUS4) as Voicing;

  THIRTEENTH_b5 = fromVoicings(CV_THIRTEENTH_b5, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_a5 = fromVoicings(CV_THIRTEENTH_a5, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b9 = fromVoicings(CV_THIRTEENTH_MAJ13_b9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a9 = fromVoicings(CV_THIRTEENTH_MAJ13_a9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_b9 = fromVoicings(CV_THIRTEENTH_b9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_a9 = fromVoicings(CV_THIRTEENTH_a9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a5a9 = fromVoicings(CV_THIRTEENTH_MAJ13_a5a9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_b5b9 = fromVoicings(CV_THIRTEENTH_b5b9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_b5a9 = fromVoicings(CV_THIRTEENTH_b5a9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_a5b9 = fromVoicings(CV_THIRTEENTH_a5b9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_a5a9 = fromVoicings(CV_THIRTEENTH_a5a9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MINOR_MAJ13 = fromVoicings(CV_THIRTEENTH_MINOR_MAJ13, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b5 = fromVoicings(CV_THIRTEENTH_MAJ13_b5, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a5 = fromVoicings(CV_THIRTEENTH_MAJ13_a5, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a5 = fromVoicings(CV_THIRTEENTH_MAJ13_b9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b5b9 = fromVoicings(CV_THIRTEENTH_MAJ13_b5b9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b5a9 = fromVoicings(CV_THIRTEENTH_MAJ13_b5a9, DV_THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a5b9 = fromVoicings(CV_THIRTEENTH_MAJ13_a5b9, DV_THIRTEENTH) as Voicing;

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 7; i++) {
    map.set(inv(THIRTEENTH_MAJ13, i), i);
    map.set(inv(THIRTEENTH_MINOR, i), i);
    map.set(inv(THIRTEENTH_b5a9, i), i);
  }
}

export let THIRTEENTH_MINOR: Voicing;

export let THIRTEENTH_SUS4: Voicing;

export let THIRTEENTH_b5: Voicing;

export let THIRTEENTH_a5: Voicing;

export let THIRTEENTH_b9: Voicing;

export let THIRTEENTH_a9: Voicing;

export let THIRTEENTH_b5b9: Voicing;

export let THIRTEENTH_b5a9: Voicing;

export let THIRTEENTH_a5b9: Voicing;

export let THIRTEENTH_a5a9: Voicing;

export let THIRTEENTH_MAJ13: Voicing;

export let THIRTEENTH_MINOR_MAJ13: Voicing;

export let THIRTEENTH_MAJ13_b5: Voicing;

export let THIRTEENTH_MAJ13_a5: Voicing;

export let THIRTEENTH_MAJ13_b9: Voicing;

export let THIRTEENTH_MAJ13_a9: Voicing;

export let THIRTEENTH_MAJ13_b5b9: Voicing;

export let THIRTEENTH_MAJ13_b5a9: Voicing;

export let THIRTEENTH_MAJ13_a5b9: Voicing;

export let THIRTEENTH_MAJ13_a5a9: Voicing;

export let ALT: Voicing;
