/* eslint-disable camelcase */

import { CV_NINTH, CV_NINTH_a5, CV_NINTH_b5, CV_NINTH_MAJ9, CV_NINTH_MINOR, CV_NINTH_MINOR_MAJ9, CV_NINTH_SUS4, CV_SEVENTH_a9, CV_SEVENTH_ADD13, CV_SEVENTH_b9, CV_SEVENTH_MINOR_b9, CV_SIXTH_ADD9, CV_SIXTH_MINOR_ADD9, DV_NINTH, DV_NINTH_SUS4, DV_SEVENTH_ADD13, DV_SIXTH_ADD9 } from "voicings";
import { fromVoicings } from "../building";
import Voicing from "../Voicing";

/* eslint-disable import/no-mutable-exports */
export function initializeN5() {
  SIXTH_ADD9 = fromVoicings(CV_SIXTH_ADD9, DV_SIXTH_ADD9) as Voicing;

  SIXTH_MINOR_ADD9 = fromVoicings(CV_SIXTH_MINOR_ADD9, DV_SIXTH_ADD9) as Voicing;

  SEVENTH_b9 = fromVoicings(CV_SEVENTH_b9, DV_NINTH) as Voicing;

  SEVENTH_a9 = fromVoicings(CV_SEVENTH_a9, DV_NINTH) as Voicing;

  SEVENTH_MINOR_b9 = fromVoicings(CV_SEVENTH_MINOR_b9, DV_NINTH) as Voicing;

  SEVENTH_ADD13 = fromVoicings(CV_SEVENTH_ADD13, DV_SEVENTH_ADD13) as Voicing;

  NINTH = fromVoicings(CV_NINTH, DV_NINTH) as Voicing;

  NINTH_MINOR = fromVoicings(CV_NINTH_MINOR, DV_NINTH) as Voicing;

  NINTH_b5 = fromVoicings(CV_NINTH_b5, DV_NINTH) as Voicing;

  NINTH_a5 = fromVoicings(CV_NINTH_a5, DV_NINTH) as Voicing;

  NINTH_SUS4 = fromVoicings(CV_NINTH_SUS4, DV_NINTH_SUS4) as Voicing;

  NINTH_MAJ9 = fromVoicings(CV_NINTH_MAJ9, DV_NINTH) as Voicing;

  NINTH_MINOR_MAJ9 = fromVoicings(CV_NINTH_MINOR_MAJ9, DV_NINTH) as Voicing;
}

export let SIXTH_ADD9: Voicing;

export let SIXTH_MINOR_ADD9: Voicing;

export let SEVENTH_b9: Voicing;

export let SEVENTH_a9: Voicing;

export let SEVENTH_MINOR_b9: Voicing;

export let SEVENTH_ADD13: Voicing;

export let NINTH: Voicing;

export let NINTH_MINOR: Voicing;

export let NINTH_b5: Voicing;

export let NINTH_a5: Voicing;

export let NINTH_SUS4: Voicing;

export let NINTH_MAJ9: Voicing;

export let NINTH_MINOR_MAJ9: Voicing;
