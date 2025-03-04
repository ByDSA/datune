import type { Voicing } from "../Voicing";
import { Voicings as DV } from "voicings/relative/diatonic";
import { Voicings as CV } from "voicings/chromatic";
import { fromVoicings } from "../building/voicings";
import { inv } from "../modifiers/inv";
import { map } from "./inversionMap";

export function initializeN3() {
  const { SUS4, TRIAD } = DV;

  TRIAD_MAJOR = fromVoicings(CV.TRIAD_MAJOR, TRIAD) as Voicing;

  TRIAD_MINOR = fromVoicings(CV.TRIAD_MINOR, TRIAD) as Voicing;

  TRIAD_DIMINISHED = fromVoicings(CV.TRIAD_DIMINISHED, TRIAD) as Voicing;

  TRIAD_AUGMENTED = fromVoicings(CV.TRIAD_AUGMENTED, TRIAD) as Voicing;

  TRIAD_SUS4 = fromVoicings(CV.TRIAD_SUS4, SUS4) as Voicing;

  TRIAD_SUS2 = inv(TRIAD_SUS4) as Voicing;

  TRIAD_QUARTAL = inv(TRIAD_SUS2) as Voicing;

  initializeInversions();
}

function initializeInversions() {
  for (let i = 1; i < 3; i++) {
    map.set(inv(TRIAD_MAJOR, i), i);
    map.set(inv(TRIAD_MINOR, i), i);
    map.set(inv(TRIAD_DIMINISHED, i), i);
    map.set(inv(TRIAD_AUGMENTED, i), i);
  }
}

export let TRIAD_MAJOR: Voicing;

export let TRIAD_MINOR: Voicing;

export let TRIAD_DIMINISHED: Voicing;

export let TRIAD_AUGMENTED: Voicing;

export let TRIAD_SUS4: Voicing;

export let TRIAD_SUS2: Voicing;

export let TRIAD_QUARTAL: Voicing;
