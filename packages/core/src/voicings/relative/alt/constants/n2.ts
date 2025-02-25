/* eslint-disable import/no-mutable-exports */

import { CV_MAJOR_SECOND, CV_MAJOR_SEVENTH, CV_MAJOR_SIXTH, CV_MAJOR_THIRD, CV_MINOR_SECOND, CV_MINOR_SEVENTH, CV_MINOR_SIXTH, CV_MINOR_THIRD, CV_PERFECT_FOURTH, CV_POWER_CHORD, CV_TRITONE } from "voicings";
import { FIFTH_INTERVAL, FOURTH_INTERVAL, SECOND_INTERVAL, SEVENTH_INTERVAL, SIXTH_INTERVAL, THIRD_INTERVAL } from "voicings/diatonic";
import { fromVoicings } from "../building";
import Voicing from "../Voicing";

export function initializeN2() {
  POWER_CHORD = fromVoicings(CV_POWER_CHORD, FIFTH_INTERVAL) as Voicing;
  MINOR_SECOND = fromVoicings(CV_MINOR_SECOND, SECOND_INTERVAL) as Voicing;
  MAJOR_SECOND = fromVoicings(CV_MAJOR_SECOND, SECOND_INTERVAL) as Voicing;
  MINOR_THIRD = fromVoicings(CV_MINOR_THIRD, THIRD_INTERVAL) as Voicing;
  MAJOR_THIRD = fromVoicings(CV_MAJOR_THIRD, THIRD_INTERVAL) as Voicing;
  PERFECT_FOURTH = fromVoicings(CV_PERFECT_FOURTH, FOURTH_INTERVAL) as Voicing;
  DIMINISHED_FIFTH = fromVoicings(CV_TRITONE, FIFTH_INTERVAL) as Voicing;
  MINOR_SIXTH = fromVoicings(CV_MINOR_SIXTH, SIXTH_INTERVAL) as Voicing;
  MAJOR_SIXTH = fromVoicings(CV_MAJOR_SIXTH, SIXTH_INTERVAL) as Voicing;
  MINOR_SEVENTH = fromVoicings(CV_MINOR_SEVENTH, SEVENTH_INTERVAL) as Voicing;
  MAJOR_SEVENTH = fromVoicings(CV_MAJOR_SEVENTH, SEVENTH_INTERVAL) as Voicing;
}

export let MINOR_SECOND: Voicing;

export let MAJOR_SECOND: Voicing;

export let MINOR_THIRD: Voicing;

export let MAJOR_THIRD: Voicing;

export let DIMINISHED_FIFTH: Voicing;

export let POWER_CHORD: Voicing;

export let PERFECT_FOURTH: Voicing;

export let MINOR_SIXTH: Voicing;

export let MAJOR_SIXTH: Voicing;

export let MINOR_SEVENTH: Voicing;

export let MAJOR_SEVENTH: Voicing;
