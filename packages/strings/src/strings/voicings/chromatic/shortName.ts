/* eslint-disable camelcase */
import { Voicing } from "@datune/core/voicings/chromatic";
import { ELEVENTH, ELEVENTH_a9, ELEVENTH_b9, ELEVENTH_MAJ11, ELEVENTH_MINOR, ELEVENTH_MINOR_MAJ11, MAJOR_SECOND, MAJOR_THIRD, MINOR_SECOND, MINOR_THIRD, NINTH, NINTH_a11, NINTH_a5, NINTH_ADD6, NINTH_b5, NINTH_MAJ9, NINTH_MAJ9_a11, NINTH_MINOR, NINTH_MINOR_MAJ9, NINTH_SUS4, POWER_CHORD, SEVENTH, SEVENTH_a5, SEVENTH_a9, SEVENTH_ADD11, SEVENTH_ADD13, SEVENTH_b5, SEVENTH_b9, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_MINOR_a5, SEVENTH_MINOR_b5, SEVENTH_MINOR_b9, SEVENTH_MINOR_MAJ7, SEVENTH_SUS4, SEVENTH_SUS4_b9, SIXTH, SIXTH_ADD9, SIXTH_MINOR, SIXTH_MINOR_ADD9, SIXTH_SUS4, THIRTEENTH_a5, THIRTEENTH_a5a9, THIRTEENTH_a5b9, THIRTEENTH_a9, THIRTEENTH_b5, THIRTEENTH_b5a9, THIRTEENTH_b5b9, THIRTEENTH_b9, THIRTEENTH_MAJ13, THIRTEENTH_MAJ13_a5, THIRTEENTH_MAJ13_a5a9, THIRTEENTH_MAJ13_a5b9, THIRTEENTH_MAJ13_a9, THIRTEENTH_MAJ13_b5, THIRTEENTH_MAJ13_b5a9, THIRTEENTH_MAJ13_b5b9, THIRTEENTH_MAJ13_b9, THIRTEENTH_MINOR, THIRTEENTH_MINOR_MAJ13, THIRTEENTH_SUS4, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_QUARTAL, TRIAD_SUS2, TRIAD_SUS4, TRITONE } from "@datune/core/voicings/relative/chromatic/constants";
import { getLangFromOptions } from "lang/Options";
import { Options } from "parsing";
import { stringifyIntervalArray } from "strings/intervals/chromatic/array";

export function stringifyShortName(voicing: Voicing, options?: Options): string {
  const lang = getLangFromOptions(options);

  switch (voicing) {
    // Interval
    case MINOR_SECOND: return lang.shortVoicings.MINOR_SECOND;
    case MAJOR_SECOND: return lang.shortVoicings.MAJOR_SECOND;
    case MINOR_THIRD: return lang.shortVoicings.MINOR_THIRD;
    case MAJOR_THIRD: return lang.shortVoicings.MAJOR_THIRD;
    case TRITONE: return lang.shortVoicings.TRITONE;
    case POWER_CHORD: return lang.shortVoicings.POWER_CHORD;
      // Triads
    case TRIAD_MAJOR: return lang.shortVoicings.TRIAD_MAJOR;
    case TRIAD_MINOR: return lang.shortVoicings.TRIAD_MINOR;
    case TRIAD_AUGMENTED: return lang.shortVoicings.TRIAD_AUGMENTED;
    case TRIAD_DIMINISHED: return lang.shortVoicings.TRIAD_DIMINISHED;
    case TRIAD_SUS4: return lang.shortVoicings.TRIAD_SUS4;
    case TRIAD_SUS2: return lang.shortVoicings.TRIAD_SUS2;
    case TRIAD_QUARTAL: return lang.shortVoicings.TRIAD_QUARTAL;
      // 7ª
    case SEVENTH: return lang.shortVoicings.SEVENTH;
    case SEVENTH_b5: return lang.shortVoicings.SEVENTH_b5;
    case SEVENTH_a5: return lang.shortVoicings.SEVENTH_a5;
    case SEVENTH_MINOR: return lang.shortVoicings.SEVENTH_MINOR;
    case SEVENTH_MINOR_b5: return lang.shortVoicings.SEVENTH_MINOR_b5;
    case SEVENTH_MINOR_a5: return lang.shortVoicings.SEVENTH_MINOR_a5;
    case SEVENTH_MINOR_MAJ7: return lang.shortVoicings.SEVENTH_MINOR_MAJ7;
    case SEVENTH_MAJ7: return lang.shortVoicings.SEVENTH_MAJ7;
    case SEVENTH_MAJ7_b5: return lang.shortVoicings.SEVENTH_MAJ7_b5;
    case SEVENTH_SUS4: return lang.shortVoicings.SEVENTH_SUS4;
      // 6ª
    case SIXTH: return lang.shortVoicings.SIXTH;
    case SIXTH_ADD9: return lang.shortVoicings.SIXTH_ADD9;
    case SIXTH_MINOR: return lang.shortVoicings.SIXTH_MINOR;
    case SIXTH_MINOR_ADD9: return lang.shortVoicings.SIXTH_MINOR_ADD9;
    case SIXTH_SUS4: return lang.shortVoicings.SIXTH_SUS4;
      // 9ª
    case NINTH: return lang.shortVoicings.NINTH;
    case NINTH_MAJ9: return lang.shortVoicings.NINTH_MAJ9;
    case NINTH_MAJ9_a11: return lang.shortVoicings.NINTH_MAJ9_a11;
    case NINTH_MINOR: return lang.shortVoicings.NINTH_MINOR;
    case NINTH_MINOR_MAJ9: return lang.shortVoicings.NINTH_MINOR_MAJ9;
    case NINTH_SUS4: return lang.shortVoicings.NINTH_SUS4;
    case NINTH_a5: return lang.shortVoicings.NINTH_a5;
    case NINTH_b5: return lang.shortVoicings.NINTH_b5;
    case NINTH_ADD6: return lang.shortVoicings.NINTH_ADD6;
    case SEVENTH_SUS4_b9: return lang.shortVoicings.SEVENTH_SUS4_b9;
    case SEVENTH_ADD11: return lang.shortVoicings.SEVENTH_ADD11;
    case SEVENTH_MINOR_b9: return lang.shortVoicings.SEVENTH_MINOR_b9;
    case SEVENTH_a9: return lang.shortVoicings.SEVENTH_a9;
    case SEVENTH_b9: return lang.shortVoicings.SEVENTH_b9;
      // 11ª
    case ELEVENTH: return lang.shortVoicings.ELEVENTH;
    case ELEVENTH_MINOR: return lang.shortVoicings.ELEVENTH_MINOR;
    case ELEVENTH_b9: return lang.shortVoicings.ELEVENTH_b9;
    case ELEVENTH_a9: return lang.shortVoicings.ELEVENTH_a9;
    case ELEVENTH_MAJ11: return lang.shortVoicings.ELEVENTH_MAJ11;
    case ELEVENTH_MINOR_MAJ11: return lang.shortVoicings.ELEVENTH_MINOR_MAJ11;
    case NINTH_a11: return lang.shortVoicings.NINTH_a11;
      // 13ª
    case SEVENTH_ADD13: return lang.shortVoicings.SEVENTH_ADD13;
    case THIRTEENTH_MINOR: return lang.shortVoicings.THIRTEENTH_MINOR;
    case THIRTEENTH_SUS4: return lang.shortVoicings.THIRTEENTH_SUS4;
    case THIRTEENTH_b5: return lang.shortVoicings.THIRTEENTH_b5;
    case THIRTEENTH_a5: return lang.shortVoicings.THIRTEENTH_a5;
    case THIRTEENTH_b9: return lang.shortVoicings.THIRTEENTH_b9;
    case THIRTEENTH_a9: return lang.shortVoicings.THIRTEENTH_a9;
    case THIRTEENTH_b5b9: return lang.shortVoicings.THIRTEENTH_b5b9;
    case THIRTEENTH_b5a9: return lang.shortVoicings.THIRTEENTH_b5a9;
    case THIRTEENTH_a5b9: return lang.shortVoicings.THIRTEENTH_a5b9;
    case THIRTEENTH_a5a9: return lang.shortVoicings.THIRTEENTH_a5a9;
    case THIRTEENTH_MAJ13: return lang.shortVoicings.THIRTEENTH_MAJ13;
    case THIRTEENTH_MINOR_MAJ13: return lang.shortVoicings.THIRTEENTH_MINOR_MAJ13;
    case THIRTEENTH_MAJ13_b5: return lang.shortVoicings.THIRTEENTH_MAJ13_b5;
    case THIRTEENTH_MAJ13_a5: return lang.shortVoicings.THIRTEENTH_MAJ13_a5;
    case THIRTEENTH_MAJ13_b9: return lang.shortVoicings.THIRTEENTH_MAJ13_b9;
    case THIRTEENTH_MAJ13_a9: return lang.shortVoicings.THIRTEENTH_MAJ13_a9;
    case THIRTEENTH_MAJ13_b5b9: return lang.shortVoicings.THIRTEENTH_MAJ13_b5b9;
    case THIRTEENTH_MAJ13_b5a9: return lang.shortVoicings.THIRTEENTH_MAJ13_b5a9;
    case THIRTEENTH_MAJ13_a5b9: return lang.shortVoicings.THIRTEENTH_MAJ13_a5b9;
    case THIRTEENTH_MAJ13_a5a9: return lang.shortVoicings.THIRTEENTH_MAJ13_a5a9;
    default: return stringifyIntervalArray(voicing.rootIntervals);
  }
}
