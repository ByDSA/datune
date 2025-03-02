import { initialize as chromaticChordInitialize } from "./chords/chromatic";
import { initialize as chromaticKeyInitialize } from "./keys/chromatic";
import { initialize as chromaticScaleInitialize } from "./scales/chromatic";
import { Data } from "./types";
import { initCFunctions } from "./initializeCommon";
import { Chords as ALtChords } from "chords/alt";
import { Chords as CChords } from "chords/chromatic";
import { ConcertPitches as CConcertPitches } from "concert-pitches/chromatic";
import { Degrees as DegreesAlt } from "degrees/alt";
import { initialize as initAltFunctions } from "functions/alt/constants";
import { initialize as initDIntervals } from "intervals/symbolic/diatonic/constants";
import { Intervals as IntervalsAlt } from "intervals/alt";
import { Intervals as RIntervals } from "intervals/real";
import { Keys as KeysAlt } from "keys/alt";
import { Keys as CKeys } from "keys/chromatic";
import { Pitches as PitchesAlt } from "pitches/alt";
import { Scales as ScalesAlt } from "scales/alt";
import { Scales as CScales } from "scales/chromatic";
import { PitchSets as CPitchSets } from "sets/pitch-set/chromatic";
import { SPNs as SPNsAlt } from "spns/alt";
import { SPNs as CSPNs } from "spns/chromatic";
import { Temperaments as CTemperaments } from "temperaments/chromatic";
import { initialize as initBPMs } from "time/symbolic/bpm/constants";
import { initialize as initMusicalDurations } from "time/symbolic/musical-duration/constants";
import { Patterns } from "time/symbolic/rhythm/pattern";
import { TimeSignatures } from "time/symbolic/rhythm/signature";
import { Tunings as CTunings } from "tunings/chromatic";
import { Voicings as VoicingsAlt } from "voicings/alt";
import { Voicings as CVoicings } from "voicings/chromatic";
import { Voicings as DVoicings } from "voicings/diatonic";

export default function initialize(data?: Data): void {
  if (data) {
    chromaticChordInitialize(data.chords.chromatic);
    chromaticScaleInitialize(data.scales.chromatic);
    chromaticKeyInitialize(data.keys.chromatic);
  }

  initializeConstants();
}

function initializeConstants() {
  // Real
  RIntervals.initialize();

  // Chromatic
  CVoicings.initialize();
  CChords.initialize();

  CSPNs.initialize();
  CPitchSets.initialize();

  CScales.initialize();
  initCFunctions();
  CKeys.initialize();

  CConcertPitches.initialize();
  CTemperaments.initialize();
  CTunings.initialize();

  // Diatonic
  initDIntervals();
  DVoicings.initialize();

  // Alt
  PitchesAlt.initialize();

  SPNsAlt.initialize();

  IntervalsAlt.initialize();
  VoicingsAlt.initialize();
  ALtChords.initialize();

  DegreesAlt.initialize();
  ScalesAlt.initialize();
  initAltFunctions();
  KeysAlt.initialize();

  // Time
  initMusicalDurations();
  initBPMs();
  Patterns.initialize();
  TimeSignatures.initialize();
}
