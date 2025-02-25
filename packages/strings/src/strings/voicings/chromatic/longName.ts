/* eslint-disable camelcase */
import { getLangFromOptions, Options } from "lang";
import { ELEVENTH, ELEVENTH_a9, ELEVENTH_b9, ELEVENTH_MAJ11, ELEVENTH_MINOR, ELEVENTH_MINOR_MAJ11, MAJOR_SECOND, MAJOR_THIRD, MINOR_SECOND, MINOR_THIRD, NINTH, NINTH_a11, NINTH_a5, NINTH_ADD6, NINTH_b5, NINTH_MAJ9, NINTH_MAJ9_a11, NINTH_MINOR, NINTH_MINOR_MAJ9, NINTH_SUS4, POWER_CHORD, SEVENTH, SEVENTH_a5, SEVENTH_a9, SEVENTH_ADD11, SEVENTH_ADD13, SEVENTH_b5, SEVENTH_b9, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_MINOR_a5, SEVENTH_MINOR_b5, SEVENTH_MINOR_b9, SEVENTH_MINOR_MAJ7, SEVENTH_SUS4, SEVENTH_SUS4_b9, SIXTH, SIXTH_ADD9, SIXTH_MINOR, SIXTH_MINOR_ADD9, SIXTH_SUS4, THIRTEENTH_a5, THIRTEENTH_a5a9, THIRTEENTH_a5b9, THIRTEENTH_a9, THIRTEENTH_b5, THIRTEENTH_b5a9, THIRTEENTH_b5b9, THIRTEENTH_b9, THIRTEENTH_MAJ13, THIRTEENTH_MAJ13_a5, THIRTEENTH_MAJ13_a5a9, THIRTEENTH_MAJ13_a5b9, THIRTEENTH_MAJ13_a9, THIRTEENTH_MAJ13_b5, THIRTEENTH_MAJ13_b5a9, THIRTEENTH_MAJ13_b5b9, THIRTEENTH_MAJ13_b9, THIRTEENTH_MINOR, THIRTEENTH_MINOR_MAJ13, THIRTEENTH_SUS4, TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_QUARTAL, TRIAD_SUS2, TRIAD_SUS4, TRITONE, Voicing } from "@datune/core/voicings/chromatic";

export default function getName(voicing: Voicing, options?: Options): string | null {
  const lang = getLangFromOptions(options);

  switch (voicing) {
    // intervals
    case MINOR_SECOND: return lang.voicings.MINOR_SECOND;
    case MAJOR_SECOND: return lang.voicings.MAJOR_SECOND;
    case MINOR_THIRD: return lang.voicings.MINOR_THIRD;
    case MAJOR_THIRD: return lang.voicings.MAJOR_THIRD;
    case TRITONE: return lang.voicings.TRITONE;
    case POWER_CHORD: return lang.voicings.POWER_CHORD;
      // triads
    case TRIAD_MAJOR: return lang.voicings.TRIAD_MAJOR;
    case TRIAD_MINOR: return lang.voicings.TRIAD_MINOR;
    case TRIAD_AUGMENTED: return lang.voicings.TRIAD_AUGMENTED;
    case TRIAD_DIMINISHED: return lang.voicings.TRIAD_DIMINISHED;
    case TRIAD_SUS4: return lang.voicings.TRIAD_SUS4;
    case TRIAD_SUS2: return lang.voicings.TRIAD_SUS2;
    case TRIAD_QUARTAL: return lang.voicings.TRIAD_QUARTAL;
      // 7ª
    case SEVENTH: return lang.voicings.SEVENTH;
    case SEVENTH_MAJ7: return lang.voicings.SEVENTH_MAJ7;
    case SEVENTH_MAJ7_b5: return lang.voicings.SEVENTH_MAJ7_b5;
    case SEVENTH_MINOR: return lang.voicings.SEVENTH_MINOR;
    case SEVENTH_MINOR_MAJ7: return lang.voicings.SEVENTH_MINOR_MAJ7;
    case SEVENTH_MINOR_a5: return lang.voicings.SEVENTH_MINOR_a5;
    case SEVENTH_MINOR_b5: return lang.voicings.SEVENTH_MINOR_b5;
    case SEVENTH_MINOR_b9: return lang.voicings.SEVENTH_MINOR_b9;
    case SEVENTH_SUS4: return lang.voicings.SEVENTH_SUS4;
      // 6ª
    case SIXTH: return lang.voicings.SIXTH;
    case SIXTH_ADD9: return lang.voicings.SIXTH_ADD9;
    case SIXTH_MINOR: return lang.voicings.SIXTH_MINOR;
    case SIXTH_MINOR_ADD9: return lang.voicings.SIXTH_MINOR_ADD9;
    case SIXTH_SUS4: return lang.voicings.SIXTH_SUS4;
      // 9ª
    case NINTH: return lang.voicings.NINTH;
    case NINTH_ADD6: return lang.voicings.NINTH_ADD6;
    case NINTH_MAJ9: return lang.voicings.NINTH_MAJ9;
    case NINTH_MAJ9_a11: return lang.voicings.NINTH_MAJ9_a11;
    case NINTH_MINOR: return lang.voicings.NINTH_MINOR;
    case NINTH_MINOR_MAJ9: return lang.voicings.NINTH_MINOR_MAJ9;
    case NINTH_SUS4: return lang.voicings.NINTH_SUS4;
    case NINTH_a11: return lang.voicings.NINTH_a11;
    case NINTH_a5: return lang.voicings.NINTH_a5;
    case NINTH_b5: return lang.voicings.NINTH_b5;
    case SEVENTH_a5: return lang.voicings.SEVENTH_a5;
    case SEVENTH_a9: return lang.voicings.SEVENTH_a9;
    case SEVENTH_b5: return lang.voicings.SEVENTH_b5;
    case SEVENTH_b9: return lang.voicings.SEVENTH_b9;
    case SEVENTH_SUS4_b9: return lang.voicings.SEVENTH_SUS4_b9;
      // 11ª
    case ELEVENTH: return lang.voicings.ELEVENTH;
    case ELEVENTH_MAJ11: return lang.voicings.ELEVENTH_MAJ11;
    case ELEVENTH_MINOR_MAJ11: return lang.voicings.ELEVENTH_MINOR_MAJ11;
    case ELEVENTH_MINOR: return lang.voicings.ELEVENTH_MINOR;
    case ELEVENTH_a9: return lang.voicings.ELEVENTH_a9;
    case ELEVENTH_b9: return lang.voicings.ELEVENTH_b9;
    case SEVENTH_ADD11: return lang.voicings.SEVENTH_ADD11;
      // 13ª
    case SEVENTH_ADD13: return lang.voicings.SEVENTH_ADD13;
    case THIRTEENTH_MINOR: return lang.voicings.THIRTEENTH_MINOR;
    case THIRTEENTH_SUS4: return lang.voicings.THIRTEENTH_SUS4;
    case THIRTEENTH_b5: return lang.voicings.THIRTEENTH_b5;
    case THIRTEENTH_a5: return lang.voicings.THIRTEENTH_a5;
    case THIRTEENTH_b9: return lang.voicings.THIRTEENTH_b9;
    case THIRTEENTH_a9: return lang.voicings.THIRTEENTH_a9;
    case THIRTEENTH_b5b9: return lang.voicings.THIRTEENTH_b5b9;
    case THIRTEENTH_b5a9: return lang.voicings.THIRTEENTH_b5a9;
    case THIRTEENTH_a5b9: return lang.voicings.THIRTEENTH_a5b9;
    case THIRTEENTH_a5a9: return lang.voicings.THIRTEENTH_a5a9;
    case THIRTEENTH_MAJ13: return lang.voicings.THIRTEENTH_MAJ13;
    case THIRTEENTH_MINOR_MAJ13: return lang.voicings.THIRTEENTH_MINOR_MAJ13;
    case THIRTEENTH_MAJ13_a5: return lang.voicings.THIRTEENTH_MAJ13_a5;
    case THIRTEENTH_MAJ13_b5: return lang.voicings.THIRTEENTH_MAJ13_b5;
    case THIRTEENTH_MAJ13_b9: return lang.voicings.THIRTEENTH_MAJ13_b9;
    case THIRTEENTH_MAJ13_a9: return lang.voicings.THIRTEENTH_MAJ13_a9;
    case THIRTEENTH_MAJ13_b5b9: return lang.voicings.THIRTEENTH_MAJ13_b5b9;
    case THIRTEENTH_MAJ13_b5a9: return lang.voicings.THIRTEENTH_MAJ13_b5a9;
    case THIRTEENTH_MAJ13_a5b9: return lang.voicings.THIRTEENTH_MAJ13_a5b9;
    case THIRTEENTH_MAJ13_a5a9: return lang.voicings.THIRTEENTH_MAJ13_a5a9;
    default: return null;
  }
}
