import { initialize as initBPMs } from "rhythm/tempo/bpm/constants";
import { initialize as initMusicalDurations } from "rhythm/tempo/musical-duration/constants";
import { initialize as AltChordsInitialize } from "chords/octave/alt/constants";
import { initialize as CChordsInitialize } from "chords/octave/chromatic/constants";
import { initialize as CConcertPitchesInitialize } from "concert-pitches/chromatic/constants";
import { initialize as AltDegreesInitialize } from "degrees/alt/constants";
import { initialize as initAltFuncs } from "functions/alt/constants";
import { initialize as initDIntervals } from "intervals/symbolic/diatonic/constants";
import { initialize as IntervalsAltInitialize } from "intervals/symbolic/alt/constants";
import { initialize as RIntervalsInitialize } from "intervals/real/constants";
import { initialize as KeysAltInitialize } from "keys/alt/constants";
import { initialize as CKeysInitialize } from "keys/chromatic/constants";
import { initialize as PitchesAltInitialize } from "pitches/alt/constants";
import { initialize as ScalesAltInitialize } from "scales/symbolic/alt/constants";
import { initialize as CScalesInitialize } from "scales/symbolic/chromatic/constants";
import { initialize as CPitchSetsInitialize } from "sets/pitch-set/chromatic/constants";
import { initialize as SPNsAltInitialize } from "spns/symbolic/alt/constants";
import { initialize as CSPNInitialize } from "spns/symbolic/chromatic/constants";
import { initialize as CTemperamentsInitialize } from "temperaments/chromatic/constants";
import { initialize as CTuningsInitialize } from "tunings/chromatic/constants";
import { initialize as VoicingsAltInitialize } from "voicings/relative/alt/constants";
import { initialize as CVoicingsInitialize } from "voicings/relative/chromatic/constants";
import { initialize as DVoicingsInitialize } from "voicings/relative/diatonic/constants";
import { initCFuncs } from "./initializeCommon";
import { Data } from "./types";
import { initialize as chromaticScaleInitialize } from "./scales/chromatic";
import { initialize as chromaticKeyInitialize } from "./keys/chromatic";
import { initialize as chromaticChordInitialize } from "./chords/chromatic";

export function initialize(data?: Data): void {
  if (data) {
    chromaticChordInitialize(data.chords.chromatic);
    chromaticScaleInitialize(data.scales.chromatic);
    chromaticKeyInitialize(data.keys.chromatic);
  }

  initializeConstants();
}

function initializeConstants() {
  // Real
  RIntervalsInitialize();

  // Chromatic
  CVoicingsInitialize();
  CChordsInitialize();

  CSPNInitialize();
  CPitchSetsInitialize();

  CScalesInitialize();
  initCFuncs();
  CKeysInitialize();

  CConcertPitchesInitialize();
  CTemperamentsInitialize();
  CTuningsInitialize();

  // Diatonic
  initDIntervals();
  DVoicingsInitialize();

  // Alt
  PitchesAltInitialize();

  SPNsAltInitialize();

  IntervalsAltInitialize();
  VoicingsAltInitialize();
  AltChordsInitialize();

  AltDegreesInitialize();
  ScalesAltInitialize();
  initAltFuncs();
  KeysAltInitialize();

  // Time
  initMusicalDurations();
  initBPMs();
}
