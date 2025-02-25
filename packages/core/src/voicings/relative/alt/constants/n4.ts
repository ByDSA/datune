/* eslint-disable camelcase */
/* eslint-disable import/no-mutable-exports */
import { CV_SEVENTH, CV_SEVENTH_a5, CV_SEVENTH_b5, CV_SEVENTH_MAJ7, CV_SEVENTH_MAJ7_b5, CV_SEVENTH_MINOR, CV_SEVENTH_MINOR_a5, CV_SEVENTH_MINOR_b5, CV_SEVENTH_MINOR_MAJ7, CV_SEVENTH_SUS4, CV_SEVENTH_SUS4_b9, CV_SIXTH, CV_SIXTH_MINOR, CV_SIXTH_SUS4, DV_NINTH_SUS4, DV_SEVENTH, DV_SEVENTH_SUS4, DV_SIXTH } from "voicings";
import { fromVoicings } from "../building";
import { inv } from "../modifiers";
import Voicing from "../Voicing";
import { map } from "./inversionMap";

export function initializeN4() {
  SEVENTH = fromVoicings(CV_SEVENTH, DV_SEVENTH) as Voicing;

  SEVENTH_b5 = fromVoicings(CV_SEVENTH_b5, DV_SEVENTH) as Voicing;

  SEVENTH_MAJ7_b5 = fromVoicings(CV_SEVENTH_MAJ7_b5, DV_SEVENTH) as Voicing;

  SEVENTH_a5 = fromVoicings(CV_SEVENTH_a5, DV_SEVENTH) as Voicing;

  SEVENTH_SUS4 = fromVoicings(CV_SEVENTH_SUS4, DV_SEVENTH_SUS4) as Voicing;

  SEVENTH_SUS4_b9 = fromVoicings(CV_SEVENTH_SUS4_b9, DV_NINTH_SUS4) as Voicing;

  SEVENTH_MINOR = fromVoicings(CV_SEVENTH_MINOR, DV_SEVENTH) as Voicing;

  SIXTH = fromVoicings(CV_SIXTH, DV_SIXTH) as Voicing;

  SEVENTH_MINOR_b5 = fromVoicings(CV_SEVENTH_MINOR_b5, DV_SEVENTH) as Voicing;

  SIXTH_MINOR = fromVoicings(CV_SIXTH_MINOR, DV_SIXTH) as Voicing;

  SEVENTH_MINOR_a5 = fromVoicings(CV_SEVENTH_MINOR_a5, DV_SEVENTH) as Voicing;

  SIXTH_SUS4 = fromVoicings(CV_SIXTH_SUS4, DV_SIXTH) as Voicing;

  SEVENTH_MAJ7 = fromVoicings(CV_SEVENTH_MAJ7, DV_SEVENTH) as Voicing;

  SEVENTH_MINOR_MAJ7 = fromVoicings(CV_SEVENTH_MINOR_MAJ7, DV_SEVENTH) as Voicing;

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 4; i++) {
    map.set(inv(SEVENTH, i), i);
    map.set(inv(SEVENTH_MAJ7, i), i);
    map.set(inv(SEVENTH_MINOR_MAJ7, i), i);
  }
}

export let SEVENTH: Voicing;

export let SEVENTH_b5: Voicing;

export let SEVENTH_MAJ7_b5: Voicing;

export let SEVENTH_a5: Voicing;

export let SEVENTH_SUS4: Voicing;

export let SEVENTH_SUS4_b9: Voicing;

export let SEVENTH_MINOR: Voicing;

export let SEVENTH_MINOR_b5: Voicing;

export let SEVENTH_MINOR_a5: Voicing;

export let SIXTH: Voicing;

export let SIXTH_MINOR: Voicing;

export let SIXTH_SUS4: Voicing;

export let SEVENTH_MAJ7: Voicing;

export let SEVENTH_MINOR_MAJ7: Voicing;
