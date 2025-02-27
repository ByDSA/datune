/* eslint-disable camelcase */

import { fromVoicings } from "../building/voicings";
import Voicing from "../Voicing";
import { Voicings as CV } from "voicings/chromatic";
import { Voicings as DV } from "voicings/diatonic";

export function initializeN5() {
  SIXTH_ADD9 = fromVoicings(CV.SIXTH_ADD9, DV.SIXTH_ADD9) as Voicing;

  SIXTH_MINOR_ADD9 = fromVoicings(CV.SIXTH_MINOR_ADD9, DV.SIXTH_ADD9) as Voicing;

  SEVENTH_b9 = fromVoicings(CV.SEVENTH_b9, DV.NINTH) as Voicing;

  SEVENTH_a9 = fromVoicings(CV.SEVENTH_a9, DV.NINTH) as Voicing;

  SEVENTH_MINOR_b9 = fromVoicings(CV.SEVENTH_MINOR_b9, DV.NINTH) as Voicing;

  SEVENTH_ADD13 = fromVoicings(CV.SEVENTH_ADD13, DV.SEVENTH_ADD13) as Voicing;

  NINTH = fromVoicings(CV.NINTH, DV.NINTH) as Voicing;

  NINTH_MINOR = fromVoicings(CV.NINTH_MINOR, DV.NINTH) as Voicing;

  NINTH_b5 = fromVoicings(CV.NINTH_b5, DV.NINTH) as Voicing;

  NINTH_a5 = fromVoicings(CV.NINTH_a5, DV.NINTH) as Voicing;

  NINTH_SUS4 = fromVoicings(CV.NINTH_SUS4, DV.NINTH_SUS4) as Voicing;

  NINTH_MAJ9 = fromVoicings(CV.NINTH_MAJ9, DV.NINTH) as Voicing;

  NINTH_MINOR_MAJ9 = fromVoicings(CV.NINTH_MINOR_MAJ9, DV.NINTH) as Voicing;
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
