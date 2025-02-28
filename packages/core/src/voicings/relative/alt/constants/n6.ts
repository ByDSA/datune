/* eslint-disable camelcase */

import { fromVoicings } from "../building/voicings";
import type { Voicing } from "../Voicing";
import { Voicings as CV } from "voicings/chromatic";
import { Voicings as DV } from "voicings/diatonic";

export function initializeN6() {
  NINTH_ADD6 = fromVoicings(CV.NINTH_ADD6, DV.NINTH_ADD6) as Voicing;

  SEVENTH_ADD11 = fromVoicings(CV.SEVENTH_ADD11, DV.SEVENTH_ADD11) as Voicing;

  NINTH_a11 = fromVoicings(CV.NINTH_a11, DV.ELEVENTH) as Voicing;

  NINTH_MAJ9_a11 = fromVoicings(CV.NINTH_MAJ9_a11, DV.ELEVENTH) as Voicing;

  ELEVENTH = fromVoicings(CV.ELEVENTH, DV.ELEVENTH) as Voicing;

  ELEVENTH_MINOR = fromVoicings(CV.ELEVENTH_MINOR, DV.ELEVENTH) as Voicing;

  ELEVENTH_b9 = fromVoicings(CV.ELEVENTH_b9, DV.ELEVENTH) as Voicing;

  ELEVENTH_a9 = fromVoicings(CV.ELEVENTH_a9, DV.ELEVENTH) as Voicing;

  ELEVENTH_MAJ11 = fromVoicings(CV.ELEVENTH_MAJ11, DV.ELEVENTH) as Voicing;

  ELEVENTH_MINOR_MAJ11 = fromVoicings(CV.ELEVENTH_MINOR_MAJ11, DV.ELEVENTH) as Voicing;
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
