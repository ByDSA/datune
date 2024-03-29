import { initialize as chromaticSetInitialize } from "@datune/core/sets/pitch-set/chromatic";
import { initialize as bpmInitialize } from "@datune/core/time/symbolic/bpm";
import { initialize as musicalDurationInitialize } from "@datune/core/time/symbolic/musical-duration";
import { initialize as rhythmPatternInitialize } from "@datune/core/time/symbolic/rhythm/pattern";
import { initialize as diatonicAltChordInitialize } from "chords/alt";
import { initialize as chromaticChordInitialize } from "chords/chromatic";
import { initialize as chromaticConcertPitchInitialize } from "concert-pitches/chromatic";
import { initialize as diatonicAltDegreeInitialize } from "degrees/alt";
import { initialize as chromaticDegreeInitialize } from "degrees/chromatic";
import { initialize as diatonicAltFunctionInitialize } from "functions/alt";
import { initialize as chromaticFunctionInitialize } from "functions/chromatic";
import { initialize as intervalPitchInitialize } from "intervals/real";
import { initialize as diatonicAltIntervalInitialize } from "intervals/symbolic/alt/constants";
import { initialize as diatonicIntervalInitialize } from "intervals/symbolic/diatonic";
import { initialize as diatonicAltKeyInitialize } from "keys/alt";
import { initialize as chromaticKeyInitialize } from "keys/chromatic";
import { initialize as diatonicAltInitialize } from "pitches/alt";
import { initialize as realScaleInitialize } from "scales/real";
import { initialize as diatonicAltScaleInitialize } from "scales/symbolic/alt";
import { initialize as chromaticScaleInitialize } from "scales/symbolic/chromatic";
import { initialize as diatonicAltSPNInitialize } from "spns/symbolic/alt";
import { initialize as chromaticSPNInitialize } from "spns/symbolic/chromatic";
import { initialize as temperamentChromaticInitialize } from "temperaments/chromatic";
import { initialize as tuningInitialize } from "tunings/chromatic";
import { initialize as diatonicAltVoicingInitialize } from "voicings/alt";
import { initialize as chromaticVoicingInitialize } from "voicings/chromatic";
import { initialize as diatonicVoicingInitialize } from "voicings/diatonic";

export default class TestInit {
  static realScale() {
    this.realInterval();
    try {
      realScaleInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticSet() {
    try {
      chromaticSetInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticFunction() {
    this.chromaticVoicing();
    this.chromaticDegree();
    try {
      chromaticFunctionInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAlt() {
    try {
      diatonicAltInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicInterval() {
    try {
      diatonicIntervalInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAltFunction() {
    this.diatonicAlt();
    this.diatonicAltVoicing();
    this.diatonicAltDegree();
    try {
      diatonicAltFunctionInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAltKey() {
    this.diatonicAlt();
    this.diatonicAltScale();
    diatonicAltKeyInitialize();
    try {
      diatonicAltKeyInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticKey() {
    this.chromaticScale();
    try {
      chromaticKeyInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticScale() {
    try {
      chromaticScaleInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAltInterval() {
    this.diatonicInterval();
    try {
      diatonicAltIntervalInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAltScale() {
    this.diatonicAltDegree(); // fromDegrees
    this.diatonicAltInterval();
    this.chromaticScale(); // por .toAlt
    try {
      diatonicAltScaleInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAltDegree() {
    try {
      diatonicAltDegreeInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticDegree() {
    try {
      chromaticDegreeInitialize();
    } catch (e) {
      // ignore
    }
  }

  static bpm() {
    this.musicalDuration();
    try {
      bpmInitialize();
    } catch (e) {
      // ignore
    }
  }

  static musicalDuration() {
    try {
      musicalDurationInitialize();
    } catch (e) {
      // ignore
    }
  }

  static rhythmPattern() {
    try {
      rhythmPatternInitialize();
    } catch (e) {
      // ignore
    }
  }

  static realInterval() {
    try {
      intervalPitchInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticChord() {
    this.chromaticVoicing();
    chromaticChordInitialize();
    try {
      chromaticChordInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticVoicing() {
    try {
      chromaticVoicingInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicVoicing() {
    try {
      diatonicVoicingInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAltVoicing() {
    this.diatonicAltInterval();
    this.chromaticVoicing();
    this.diatonicVoicing();
    this.diatonicAlt();
    try {
      diatonicAltVoicingInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticSPN() {
    try {
      chromaticSPNInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAltSPN() {
    this.diatonicAlt();
    try {
      diatonicAltSPNInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticTuning() {
    this.chromaticTemperament();
    this.chromaticSPN();
    this.chromaticConcertPitch();
    try {
      tuningInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticTemperament() {
    this.realInterval();
    try {
      temperamentChromaticInitialize();
    } catch (e) {
      // ignore
    }
  }

  static chromaticConcertPitch() {
    this.chromaticSPN();
    try {
      chromaticConcertPitchInitialize();
    } catch (e) {
      // ignore
    }
  }

  static diatonicAltChord() {
    this.diatonicAltVoicing();
    try {
      diatonicAltChordInitialize();
    } catch (e) {
      // ignore
    }
  }
}
