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
import { initialize as CPitchSetsInitialize } from "sets/pitch-sets/chromatic/constants";
import { initialize as SpnsAltInitialize } from "spns/symbolic/alt/constants";
import { initialize as CSpnInitialize } from "spns/symbolic/chromatic/constants";
import { initialize as CTemperamentsInitialize } from "temperaments/chromatic/constants";
import { initialize as CTuningsInitialize } from "tunings/chromatic/constants";
import { initialize as IntervalSetsAltInitialize } from "sets/interval-sets/alt/constants";
import { initialize as CIntervalSetsInitialize } from "sets/interval-sets/chromatic/constants";
import { initialize as DIntervalSetsInitialize } from "sets/interval-sets/diatonic/constants";
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
  CIntervalSetsInitialize();
  CChordsInitialize();

  CSpnInitialize();
  CPitchSetsInitialize();

  CScalesInitialize();
  initCFuncs();
  CKeysInitialize();

  CConcertPitchesInitialize();
  CTemperamentsInitialize();
  CTuningsInitialize();

  // Diatonic
  initDIntervals();
  DIntervalSetsInitialize();

  // Alt
  PitchesAltInitialize();

  SpnsAltInitialize();

  IntervalsAltInitialize();
  IntervalSetsAltInitialize();
  AltChordsInitialize();

  AltDegreesInitialize();
  ScalesAltInitialize();
  initAltFuncs();
  KeysAltInitialize();

  // Time
  initMusicalDurations();
  initBPMs();
}
