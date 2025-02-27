import { initialize as initAltChords } from "chords/octave/alt/constants/constants";
import { initialize as initCChords } from "chords/octave/chromatic/constants";
import { initialize as initCConcerPitches } from "concert-pitches/chromatic/constants";
import { initialize as initAltDegrees } from "degrees/alt/constants";
import { initialize as initAltFunctions } from "functions/alt/constants";
import { initialize as initRIntervals } from "intervals/real/constants";
import { initialize as diatonicAltIntervalInitialize } from "intervals/symbolic/alt/constants";
import { initialize as initDIntervals } from "intervals/symbolic/diatonic/constants";
import { initialize as initAltPitches } from "pitches/alt/constants";
import { initialize as initRScales } from "scales/real/constants";
import { initialize as initAltScales } from "scales/symbolic/alt/constants";
import { initialize as initCScales } from "scales/symbolic/chromatic/constants";
import { initialize as initAltKeys } from "keys/alt/constants";
import { initialize as initCKeys } from "keys/chromatic/constants";
import { initialize as initCPitchSets } from "sets/pitch-set/chromatic/constants";
import { initialize as initAltSPNs } from "spns/symbolic/alt/constants";
import { initialize as initCSPNs } from "spns/symbolic/chromatic/constants";
import { initialize as initCTemperaments } from "temperaments/chromatic/constants";
import { initialize as initBPMs } from "time/symbolic/bpm/constants";
import { initialize as initMusicalDurations } from "time/symbolic/musical-duration/constants";
import { initialize as initPatterns } from "time/symbolic/rhythm/pattern/constants";
import { initialize as initCTunings } from "tunings/chromatic/constants";
import { initialize as initAltVoicings } from "voicings/relative/alt/constants";
import { initialize as initCVoicings } from "voicings/relative/chromatic/constants";
import { initialize as initDVoicings } from "voicings/relative/diatonic/constants";
import { initCFunctions } from "initialization/initializeCommon";

export default class TestInit {
  static realScale() {
    this.realInterval();
    try {
      initRScales();
    } catch {
      // ignore
    }
  }

  static chromaticPitchSet() {
    try {
      initCPitchSets();
    } catch {
      // ignore
    }
  }

  static chromaticFunction() {
    this.chromaticVoicing();
    try {
      initCFunctions();
    } catch {
      // ignore
    }
  }

  static diatonicAlt() {
    try {
      initAltPitches();
    } catch {
      // ignore
    }
  }

  static diatonicInterval() {
    try {
      initDIntervals();
    } catch {
      // ignore
    }
  }

  static diatonicAltFunction() {
    this.diatonicAlt();
    this.diatonicAltVoicing();
    this.diatonicAltDegree();
    try {
      initAltFunctions();
    } catch {
      // ignore
    }
  }

  static diatonicAltKey() {
    this.diatonicAlt();
    this.diatonicAltScale();
    initAltKeys();
    try {
      initAltKeys();
    } catch {
      // ignore
    }
  }

  static chromaticKey() {
    this.chromaticScale();
    try {
      initCKeys();
    } catch {
      // ignore
    }
  }

  static chromaticScale() {
    try {
      initCScales();
    } catch {
      // ignore
    }
  }

  static diatonicAltInterval() {
    this.diatonicInterval();
    try {
      diatonicAltIntervalInitialize();
    } catch {
      // ignore
    }
  }

  static diatonicAltScale() {
    this.diatonicAltDegree(); // fromDegrees
    this.diatonicAltInterval();
    this.chromaticScale(); // por .toAlt
    try {
      initAltScales();
    } catch {
      // ignore
    }
  }

  static diatonicAltDegree() {
    try {
      initAltDegrees();
    } catch {
      // ignore
    }
  }

  static bpm() {
    this.musicalDuration();
    try {
      initBPMs();
    } catch {
      // ignore
    }
  }

  static musicalDuration() {
    try {
      initMusicalDurations();
    } catch {
      // ignore
    }
  }

  static rhythmPattern() {
    try {
      initPatterns();
    } catch {
      // ignore
    }
  }

  static realInterval() {
    try {
      initRIntervals();
    } catch {
      // ignore
    }
  }

  static chromaticChord() {
    this.chromaticVoicing();
    initCChords();
    try {
      initCChords();
    } catch {
      // ignore
    }
  }

  static chromaticVoicing() {
    try {
      initCVoicings();
    } catch {
      // ignore
    }
  }

  static diatonicVoicing() {
    try {
      initDVoicings();
    } catch {
      // ignore
    }
  }

  static diatonicAltVoicing() {
    this.diatonicAltInterval();
    this.chromaticVoicing();
    this.diatonicVoicing();
    this.diatonicAlt();
    try {
      initAltVoicings();
    } catch {
      // ignore
    }
  }

  static chromaticSPN() {
    try {
      initCSPNs();
    } catch {
      // ignore
    }
  }

  static diatonicAltSPN() {
    this.diatonicAlt();
    try {
      initAltSPNs();
    } catch {
      // ignore
    }
  }

  static chromaticTuning() {
    this.chromaticTemperament();
    this.chromaticSPN();
    this.chromaticConcertPitch();
    try {
      initCTunings();
    } catch {
      // ignore
    }
  }

  static chromaticTemperament() {
    this.realInterval();
    try {
      initCTemperaments();
    } catch {
      // ignore
    }
  }

  static chromaticConcertPitch() {
    this.chromaticSPN();
    try {
      initCConcerPitches();
    } catch {
      // ignore
    }
  }

  static diatonicAltChord() {
    this.diatonicAltVoicing();
    try {
      initAltChords();
    } catch {
      // ignore
    }
  }
}
