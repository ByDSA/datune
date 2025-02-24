/* eslint-disable camelcase */
/* eslint-disable import/no-mutable-exports */
import { CV_ELEVENTH, CV_ELEVENTH_a9, CV_ELEVENTH_b9, CV_ELEVENTH_MAJ11, CV_ELEVENTH_MINOR, CV_ELEVENTH_MINOR_MAJ11, CV_NINTH_a11, CV_NINTH_ADD6, CV_NINTH_MAJ9_a11, CV_SEVENTH_ADD11, DV_ELEVENTH, DV_NINTH_ADD6, DV_SEVENTH_ADD11 } from "voicings";
import { fromVoicings } from "../building";
import Voicing from "../Voicing";

export function initializeN6() {
  NINTH_ADD6 = fromVoicings(CV_NINTH_ADD6, DV_NINTH_ADD6) as Voicing;

  SEVENTH_ADD11 = fromVoicings(CV_SEVENTH_ADD11, DV_SEVENTH_ADD11) as Voicing;

  NINTH_a11 = fromVoicings(CV_NINTH_a11, DV_ELEVENTH) as Voicing;

  NINTH_MAJ9_a11 = fromVoicings(CV_NINTH_MAJ9_a11, DV_ELEVENTH) as Voicing;

  ELEVENTH = fromVoicings(CV_ELEVENTH, DV_ELEVENTH) as Voicing;

  ELEVENTH_MINOR = fromVoicings(CV_ELEVENTH_MINOR, DV_ELEVENTH) as Voicing;

  ELEVENTH_b9 = fromVoicings(CV_ELEVENTH_b9, DV_ELEVENTH) as Voicing;

  ELEVENTH_a9 = fromVoicings(CV_ELEVENTH_a9, DV_ELEVENTH) as Voicing;

  ELEVENTH_MAJ11 = fromVoicings(CV_ELEVENTH_MAJ11, DV_ELEVENTH) as Voicing;

  ELEVENTH_MINOR_MAJ11 = fromVoicings(CV_ELEVENTH_MINOR_MAJ11, DV_ELEVENTH) as Voicing;
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
