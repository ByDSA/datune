import { initialize as altChordInit } from "chords/alt";
import { initialize as cChordInit } from "chords/chromatic";
import { initialize as cConcertPitchInit } from "concert-pitches/chromatic";
import { initialize as altDegreeInit } from "degrees/alt";
import { initialize as altFunctionInit } from "functions/alt";
import { initialize as cFunctionInit } from "functions/chromatic";
import { initialize as altIntervalInit } from "intervals/alt";
import { initialize as dIntervalInit } from "intervals/diatonic";
import { initialize as rIntervalInit } from "intervals/real";
import { initialize as altKeyInit } from "keys/alt";
import { initialize as cKeyInit } from "keys/chromatic";
import { initialize as altPitchInit } from "pitches/alt";
import { initialize as altScaleInit } from "scales/alt";
import { initialize as cScaleInit } from "scales/chromatic";
import { initialize as cPitchSetInit } from "sets/pitch-set/chromatic";
import { initialize as altSPNInit } from "spns/alt";
import { initialize as cSPNInit } from "spns/chromatic";
import { initialize as cTemperamentInit } from "temperaments/chromatic";
import { initialize as bpmInit } from "time/symbolic/bpm";
import { initialize as musicalDurationInit } from "time/symbolic/musical-duration";
import { initialize as patternInit } from "time/symbolic/rhythm/pattern";
import { initialize as signatureInit } from "time/symbolic/rhythm/signature";
import { initialize as cTuningInit } from "tunings/chromatic";
import { initialize as altVoicingInit } from "voicings/alt";
import { initialize as cVoicingInit } from "voicings/chromatic";
import { initialize as dVoicingInit } from "voicings/diatonic";
import { initialize as chromaticChordInitialize } from "./chords/chromatic";
import { initialize as chromaticKeyInitialize } from "./keys/chromatic";
import { initialize as chromaticScaleInitialize } from "./scales/chromatic";
import { Data } from "./types";

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
  rIntervalInit();

  // Chromatic
  cVoicingInit();
  cChordInit();

  cSPNInit();
  cPitchSetInit();

  cScaleInit();
  cFunctionInit();
  cKeyInit();

  cConcertPitchInit();
  cTemperamentInit();
  cTuningInit();

  // Diatonic
  dIntervalInit();
  dVoicingInit();

  // Alt
  altPitchInit();

  altSPNInit();

  altIntervalInit();
  altVoicingInit();
  altChordInit();

  altDegreeInit();
  altScaleInit();
  altFunctionInit();
  altKeyInit();

  // Time
  musicalDurationInit();
  bpmInit();
  patternInit();
  signatureInit();
}
