/* eslint-disable camelcase */
import { fromVoicings } from "../building/voicings";
import { inv } from "../modifiers/inv";
import type { Voicing } from "../Voicing";
import { map } from "./inversionMap";
import { Voicings as DV } from "voicings/diatonic";
import { Voicings as CV } from "voicings/chromatic";

export function initializeN7() {
  THIRTEENTH_MAJ13 = fromVoicings(CV.THIRTEENTH_MAJ13, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MINOR = fromVoicings(CV.THIRTEENTH_MINOR, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_SUS4 = fromVoicings(CV.THIRTEENTH_SUS4, DV.THIRTEENTH_SUS4) as Voicing;

  THIRTEENTH_b5 = fromVoicings(CV.THIRTEENTH_b5, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_a5 = fromVoicings(CV.THIRTEENTH_a5, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b9 = fromVoicings(CV.THIRTEENTH_MAJ13_b9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a9 = fromVoicings(CV.THIRTEENTH_MAJ13_a9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_b9 = fromVoicings(CV.THIRTEENTH_b9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_a9 = fromVoicings(CV.THIRTEENTH_a9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a5a9 = fromVoicings(CV.THIRTEENTH_MAJ13_a5a9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_b5b9 = fromVoicings(CV.THIRTEENTH_b5b9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_b5a9 = fromVoicings(CV.THIRTEENTH_b5a9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_a5b9 = fromVoicings(CV.THIRTEENTH_a5b9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_a5a9 = fromVoicings(CV.THIRTEENTH_a5a9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MINOR_MAJ13 = fromVoicings(CV.THIRTEENTH_MINOR_MAJ13, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b5 = fromVoicings(CV.THIRTEENTH_MAJ13_b5, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a5 = fromVoicings(CV.THIRTEENTH_MAJ13_a5, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b9 = fromVoicings(CV.THIRTEENTH_MAJ13_b9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b5b9 = fromVoicings(CV.THIRTEENTH_MAJ13_b5b9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_b5a9 = fromVoicings(CV.THIRTEENTH_MAJ13_b5a9, DV.THIRTEENTH) as Voicing;

  THIRTEENTH_MAJ13_a5b9 = fromVoicings(CV.THIRTEENTH_MAJ13_a5b9, DV.THIRTEENTH) as Voicing;

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
