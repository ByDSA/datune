import { initialize as initAltChords } from "@datune/core/chords/octave/alt/constants/constants";
import { initialize as initCChords } from "@datune/core/chords/octave/chromatic/constants";
import { initialize as initCConcerPitches } from "@datune/core/concert-pitches/chromatic/constants";
import { initialize as initAltDegrees } from "@datune/core/degrees/alt/constants";
import { initialize as initAltFuncs } from "@datune/core/functions/alt/constants";
import { initialize as initRIntervals } from "@datune/core/intervals/real/constants";
import { initialize as diatonicAltIntervalInitialize } from "@datune/core/intervals/symbolic/alt/constants";
import { initialize as initDIntervals } from "@datune/core/intervals/symbolic/diatonic/constants";
import { initialize as initAltPitches } from "@datune/core/pitches/alt/constants";
import { initialize as initRScales } from "@datune/core/scales/real/constants";
import { initialize as initAltScales } from "@datune/core/scales/symbolic/alt/constants";
import { initialize as initCScales } from "@datune/core/scales/symbolic/chromatic/constants";
import { initialize as initAltKeys } from "@datune/core/keys/alt/constants";
import { initialize as initCKeys } from "@datune/core/keys/chromatic/constants";
import { initialize as initCPitchSets } from "@datune/core/sets/pitch-set/chromatic/constants";
import { initialize as initAltSPNs } from "@datune/core/spns/symbolic/alt/constants";
import { initialize as initCSPNs } from "@datune/core/spns/symbolic/chromatic/constants";
import { initialize as initCTemperaments } from "@datune/core/temperaments/chromatic/constants";
import { initialize as initBPMs } from "@datune/core/rhythm/tempo/bpm/constants";
import { initialize as initMusicalDurations } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { initialize as initPatterns } from "@datune/core/rhythm/pattern/constants";
import { initialize as initCTunings } from "@datune/core/tunings/chromatic/constants";
import { initialize as initAltVoicings } from "@datune/core/voicings/relative/alt/constants";
import { initialize as initCVoicings } from "@datune/core/voicings/relative/chromatic/constants";
import { initialize as initDVoicings } from "@datune/core/voicings/relative/diatonic/constants";
import { initCFuncs } from "@datune/core/initialization/initializeCommon";

export class TestInit {
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

  static chromaticFunc() {
    this.chromaticVoicing();
    try {
      initCFuncs();
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

  static diatonicAltFunc() {
    this.diatonicAlt();
    this.diatonicAltVoicing();
    this.diatonicAltDegree();
    try {
      initAltFuncs();
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
