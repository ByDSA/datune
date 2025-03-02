/* eslint-disable camelcase */

import { fromVoicings } from "../building/voicings";
import { inv } from "../modifiers/inv";
import type { Voicing } from "../Voicing";
import { map } from "./inversionMap";
import { Voicings as DV } from "voicings/diatonic";
import { Voicings as CV } from "voicings/chromatic";

export function initializeN4() {
  SEVENTH = fromVoicings(CV.SEVENTH, DV.SEVENTH) as Voicing;

  SEVENTH_b5 = fromVoicings(CV.SEVENTH_b5, DV.SEVENTH) as Voicing;

  SEVENTH_MAJ7_b5 = fromVoicings(CV.SEVENTH_MAJ7_b5, DV.SEVENTH) as Voicing;

  SEVENTH_a5 = fromVoicings(CV.SEVENTH_a5, DV.SEVENTH) as Voicing;

  SEVENTH_SUS4 = fromVoicings(CV.SEVENTH_SUS4, DV.SEVENTH_SUS4) as Voicing;

  SEVENTH_SUS4_b9 = fromVoicings(CV.SEVENTH_SUS4_b9, DV.NINTH_SUS4) as Voicing;

  SEVENTH_MINOR = fromVoicings(CV.SEVENTH_MINOR, DV.SEVENTH) as Voicing;

  SIXTH = fromVoicings(CV.SIXTH, DV.SIXTH) as Voicing;

  SEVENTH_MINOR_b5 = fromVoicings(CV.SEVENTH_MINOR_b5, DV.SEVENTH) as Voicing;

  SIXTH_MINOR = fromVoicings(CV.SIXTH_MINOR, DV.SIXTH) as Voicing;

  SEVENTH_MINOR_a5 = fromVoicings(CV.SEVENTH_MINOR_a5, DV.SEVENTH) as Voicing;

  SIXTH_SUS4 = fromVoicings(CV.SIXTH_SUS4, DV.SIXTH) as Voicing;

  SEVENTH_MAJ7 = fromVoicings(CV.SEVENTH_MAJ7, DV.SEVENTH) as Voicing;

  SEVENTH_MINOR_MAJ7 = fromVoicings(CV.SEVENTH_MINOR_MAJ7, DV.SEVENTH) as Voicing;

  MAJOR_OVER_M2 = fromVoicings(CV.MAJOR_OVER_M2, DV.TRIAD_OVER_SECOND) as Voicing;

  MAJOR_OVER_m2 = fromVoicings(CV.MAJOR_OVER_m2, DV.TRIAD_OVER_SECOND) as Voicing;

  MAJOR_OVER_m3 = fromVoicings(CV.MAJOR_OVER_m3, DV.TRIAD_OVER_THIRD) as Voicing;

  MAJOR_OVER_P4 = fromVoicings(CV.MAJOR_OVER_P4, DV.TRIAD_OVER_FOURTH) as Voicing;

  MAJOR_OVER_a4 = fromVoicings(CV.MAJOR_OVER_d5, DV.TRIAD_OVER_FOURTH) as Voicing;

  MAJOR_OVER_d5 = fromVoicings(CV.MAJOR_OVER_d5, DV.TRIAD_OVER_FIFTH) as Voicing;

  MAJOR_OVER_a5 = fromVoicings(CV.MAJOR_OVER_a5, DV.TRIAD_OVER_FIFTH) as Voicing;

  MAJOR_OVER_m6 = fromVoicings(CV.MAJOR_OVER_a5, DV.TRIAD_OVER_SIXTH) as Voicing;

  MINOR_OVER_m2 = fromVoicings(CV.MINOR_OVER_m2, DV.TRIAD_OVER_SECOND) as Voicing;

  MINOR_OVER_M2 = fromVoicings(CV.MINOR_OVER_M2, DV.TRIAD_OVER_SECOND) as Voicing;

  MINOR_OVER_M3 = fromVoicings(CV.MINOR_OVER_M3, DV.TRIAD_OVER_THIRD) as Voicing;

  MINOR_OVER_P4 = fromVoicings(CV.MINOR_OVER_P4, DV.TRIAD_OVER_FOURTH) as Voicing;

  MINOR_OVER_a4 = fromVoicings(CV.MINOR_OVER_d5, DV.TRIAD_OVER_FOURTH) as Voicing;

  MINOR_OVER_d5 = fromVoicings(CV.MINOR_OVER_d5, DV.TRIAD_OVER_FIFTH) as Voicing;

  MINOR_OVER_m7 = fromVoicings(CV.MINOR_OVER_m7, DV.TRIAD_OVER_SEVENTH) as Voicing;

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

export let MAJOR_OVER_m2: Voicing;

export let MAJOR_OVER_M2: Voicing;

export let MAJOR_OVER_m3: Voicing;

export let MAJOR_OVER_P4: Voicing;

export let MAJOR_OVER_a4: Voicing;

export let MAJOR_OVER_d5: Voicing;

export let MAJOR_OVER_a5: Voicing;

export let MAJOR_OVER_m6: Voicing;

export let MINOR_OVER_m2: Voicing;

export let MINOR_OVER_M2: Voicing;

export let MINOR_OVER_M3: Voicing;

export let MINOR_OVER_P4: Voicing;

export let MINOR_OVER_a4: Voicing;

export let MINOR_OVER_d5: Voicing;

export let MINOR_OVER_m7: Voicing;
