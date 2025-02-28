/* eslint-disable max-len */
import { fromVoicings } from "../building/voicings";
import type { Voicing } from "../Voicing";
import { Voicings as CV } from "voicings/chromatic";
import { Voicings as DV } from "voicings/diatonic";

export function initializeN2() {
  const { MAJOR_SECOND: CV_MAJOR_SECOND, MAJOR_SEVENTH: CV_MAJOR_SEVENTH, MAJOR_SIXTH: CV_MAJOR_SIXTH, MAJOR_THIRD: CV_MAJOR_THIRD, MINOR_SECOND: CV_MINOR_SECOND, MINOR_SEVENTH: CV_MINOR_SEVENTH, MINOR_SIXTH: CV_MINOR_SIXTH, POWER_CHORD: CV_POWER_CHORD } = CV;
  const { FIFTH_INTERVAL, FOURTH_INTERVAL, SECOND_INTERVAL, SEVENTH_INTERVAL, SIXTH_INTERVAL, THIRD_INTERVAL } = DV;

  POWER_CHORD = fromVoicings(CV_POWER_CHORD, FIFTH_INTERVAL) as Voicing;
  MINOR_SECOND = fromVoicings(CV_MINOR_SECOND, SECOND_INTERVAL) as Voicing;
  MAJOR_SECOND = fromVoicings(CV_MAJOR_SECOND, SECOND_INTERVAL) as Voicing;
  MINOR_THIRD = fromVoicings(CV.MINOR_THIRD, THIRD_INTERVAL) as Voicing;
  MAJOR_THIRD = fromVoicings(CV_MAJOR_THIRD, THIRD_INTERVAL) as Voicing;
  PERFECT_FOURTH = fromVoicings(CV.PERFECT_FOURTH, FOURTH_INTERVAL) as Voicing;
  DIMINISHED_FIFTH = fromVoicings(CV.TRITONE, FIFTH_INTERVAL) as Voicing;
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
