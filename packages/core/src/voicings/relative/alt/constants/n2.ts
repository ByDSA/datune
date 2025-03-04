/* eslint-disable max-len */
import type { Voicing } from "../Voicing";
import { Voicings as CV } from "voicings/chromatic";
import { Voicings as DV } from "voicings/diatonic";
import { fromVoicings } from "../building/voicings";

export function initializeN2() {
  const { INTERVAL_FIFTH, INTERVAL_FOURTH, INTERVAL_SECOND, INTERVAL_SEVENTH, INTERVAL_SIXTH, INTERVAL_THIRD } = DV;

  POWER_CHORD = fromVoicings(CV.POWER_CHORD, INTERVAL_FIFTH) as Voicing;
  m2 = fromVoicings(CV.m2, INTERVAL_SECOND) as Voicing;
  M2 = fromVoicings(CV.M2, INTERVAL_SECOND) as Voicing;
  m3 = fromVoicings(CV.m3, INTERVAL_THIRD) as Voicing;
  M3 = fromVoicings(CV.M3, INTERVAL_THIRD) as Voicing;
  P4 = fromVoicings(CV.P4, INTERVAL_FOURTH) as Voicing;
  d5 = fromVoicings(CV.TRITONE, INTERVAL_FIFTH) as Voicing;
  m6 = fromVoicings(CV.m6, INTERVAL_SIXTH) as Voicing;
  M6 = fromVoicings(CV.M6, INTERVAL_SIXTH) as Voicing;
  m7 = fromVoicings(CV.m7, INTERVAL_SEVENTH) as Voicing;
  M7 = fromVoicings(CV.M7, INTERVAL_SEVENTH) as Voicing;
}

export let m2: Voicing;

export let M2: Voicing;

export let m3: Voicing;

export let M3: Voicing;

export let d5: Voicing;

export let POWER_CHORD: Voicing;

export let P4: Voicing;

export let m6: Voicing;

export let M6: Voicing;

export let m7: Voicing;

export let M7: Voicing;
