/* eslint-disable import/no-mutable-exports */

import { CV_TRIAD_AUGMENTED, CV_TRIAD_DIMINISHED, CV_TRIAD_MAJOR, CV_TRIAD_MINOR, CV_TRIAD_SUS4 } from "voicings";
import { SUS4, TRIAD } from "voicings/relative/diatonic";
import { fromVoicings } from "../building";
import { inv } from "../modifiers";
import Voicing from "../Voicing";
import { map } from "./inversionMap";

export function initializeN3() {
  TRIAD_MAJOR = fromVoicings(CV_TRIAD_MAJOR, TRIAD) as Voicing;

  TRIAD_MINOR = fromVoicings(CV_TRIAD_MINOR, TRIAD) as Voicing;

  TRIAD_DIMINISHED = fromVoicings(CV_TRIAD_DIMINISHED, TRIAD) as Voicing;

  TRIAD_AUGMENTED = fromVoicings(CV_TRIAD_AUGMENTED, TRIAD) as Voicing;

  TRIAD_SUS4 = fromVoicings(CV_TRIAD_SUS4, SUS4) as Voicing;

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
