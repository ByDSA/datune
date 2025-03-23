import { Voicing } from "@datune/core/voicings/chromatic";
import { Voicings as V } from "@datune/core/voicings/relative/chromatic";
import { getLangFromOptions, Options } from "lang";

export function stringifyLongName(voicing: Voicing, options?: Options): string | null {
  const lang = getLangFromOptions(options);

  switch (voicing) {
    // intervals
    case V.m2: return lang.voicings.m2;
    case V.M2: return lang.voicings.M2;
    case V.m3: return lang.voicings.m3;
    case V.M3: return lang.voicings.M3;
    case V.TRITONE: return lang.voicings.TRITONE;
    case V.POWER_CHORD: return lang.voicings.POWER_CHORD;
      // triads
    case V.TRIAD_MAJOR: return lang.voicings.TRIAD_MAJOR;
    case V.TRIAD_MINOR: return lang.voicings.TRIAD_MINOR;
    case V.TRIAD_AUGMENTED: return lang.voicings.TRIAD_AUGMENTED;
    case V.TRIAD_DIMINISHED: return lang.voicings.TRIAD_DIMINISHED;
    case V.TRIAD_SUS4: return lang.voicings.TRIAD_SUS4;
    case V.TRIAD_SUS2: return lang.voicings.TRIAD_SUS2;
    case V.TRIAD_QUARTAL: return lang.voicings.TRIAD_QUARTAL;
      // 7ª
    case V.SEVENTH: return lang.voicings.SEVENTH;
    case V.SEVENTH_MAJ7: return lang.voicings.SEVENTH_MAJ7;
    case V.SEVENTH_MAJ7_b5: return lang.voicings.SEVENTH_MAJ7_b5;
    case V.SEVENTH_MINOR: return lang.voicings.SEVENTH_MINOR;
    case V.SEVENTH_MINOR_MAJ7: return lang.voicings.SEVENTH_MINOR_MAJ7;
    case V.SEVENTH_MINOR_a5: return lang.voicings.SEVENTH_MINOR_a5;
    case V.SEVENTH_MINOR_b5: return lang.voicings.SEVENTH_MINOR_b5;
    case V.SEVENTH_MINOR_b9: return lang.voicings.SEVENTH_MINOR_b9;
    case V.SEVENTH_SUS4: return lang.voicings.SEVENTH_SUS4;
      // 6ª
    case V.SIXTH: return lang.voicings.SIXTH;
    case V.SIXTH_ADD9: return lang.voicings.SIXTH_ADD9;
    case V.SIXTH_MINOR: return lang.voicings.SIXTH_MINOR;
    case V.SIXTH_MINOR_ADD9: return lang.voicings.SIXTH_MINOR_ADD9;
    case V.SIXTH_SUS4: return lang.voicings.SIXTH_SUS4;
      // 9ª
    case V.NINTH: return lang.voicings.NINTH;
    case V.NINTH_ADD6: return lang.voicings.NINTH_ADD6;
    case V.NINTH_MAJ9: return lang.voicings.NINTH_MAJ9;
    case V.NINTH_MAJ9_a11: return lang.voicings.NINTH_MAJ9_a11;
    case V.NINTH_MINOR: return lang.voicings.NINTH_MINOR;
    case V.NINTH_MINOR_MAJ9: return lang.voicings.NINTH_MINOR_MAJ9;
    case V.NINTH_SUS4: return lang.voicings.NINTH_SUS4;
    case V.NINTH_a11: return lang.voicings.NINTH_a11;
    case V.NINTH_a5: return lang.voicings.NINTH_a5;
    case V.NINTH_b5: return lang.voicings.NINTH_b5;
    case V.SEVENTH_a5: return lang.voicings.SEVENTH_a5;
    case V.SEVENTH_a9: return lang.voicings.SEVENTH_a9;
    case V.SEVENTH_b5: return lang.voicings.SEVENTH_b5;
    case V.SEVENTH_b9: return lang.voicings.SEVENTH_b9;
    case V.SEVENTH_SUS4_b9: return lang.voicings.SEVENTH_SUS4_b9;
      // 11ª
    case V.ELEVENTH: return lang.voicings.ELEVENTH;
    case V.ELEVENTH_MAJ11: return lang.voicings.ELEVENTH_MAJ11;
    case V.ELEVENTH_MINOR_MAJ11: return lang.voicings.ELEVENTH_MINOR_MAJ11;
    case V.ELEVENTH_MINOR: return lang.voicings.ELEVENTH_MINOR;
    case V.ELEVENTH_a9: return lang.voicings.ELEVENTH_a9;
    case V.ELEVENTH_b9: return lang.voicings.ELEVENTH_b9;
    case V.SEVENTH_ADD11: return lang.voicings.SEVENTH_ADD11;
      // 13ª
    case V.SEVENTH_ADD13: return lang.voicings.SEVENTH_ADD13;
    case V.THIRTEENTH_MINOR: return lang.voicings.THIRTEENTH_MINOR;
    case V.THIRTEENTH_SUS4: return lang.voicings.THIRTEENTH_SUS4;
    case V.THIRTEENTH_b5: return lang.voicings.THIRTEENTH_b5;
    case V.THIRTEENTH_a5: return lang.voicings.THIRTEENTH_a5;
    case V.THIRTEENTH_b9: return lang.voicings.THIRTEENTH_b9;
    case V.THIRTEENTH_a9: return lang.voicings.THIRTEENTH_a9;
    case V.THIRTEENTH_b5b9: return lang.voicings.THIRTEENTH_b5b9;
    case V.THIRTEENTH_b5a9: return lang.voicings.THIRTEENTH_b5a9;
    case V.THIRTEENTH_a5b9: return lang.voicings.THIRTEENTH_a5b9;
    case V.THIRTEENTH_a5a9: return lang.voicings.THIRTEENTH_a5a9;
    case V.THIRTEENTH_MAJ13: return lang.voicings.THIRTEENTH_MAJ13;
    case V.THIRTEENTH_MINOR_MAJ13: return lang.voicings.THIRTEENTH_MINOR_MAJ13;
    case V.THIRTEENTH_MAJ13_a5: return lang.voicings.THIRTEENTH_MAJ13_a5;
    case V.THIRTEENTH_MAJ13_b5: return lang.voicings.THIRTEENTH_MAJ13_b5;
    case V.THIRTEENTH_MAJ13_b9: return lang.voicings.THIRTEENTH_MAJ13_b9;
    case V.THIRTEENTH_MAJ13_a9: return lang.voicings.THIRTEENTH_MAJ13_a9;
    case V.THIRTEENTH_MAJ13_b5b9: return lang.voicings.THIRTEENTH_MAJ13_b5b9;
    case V.THIRTEENTH_MAJ13_b5a9: return lang.voicings.THIRTEENTH_MAJ13_b5a9;
    case V.THIRTEENTH_MAJ13_a5b9: return lang.voicings.THIRTEENTH_MAJ13_a5b9;
    case V.THIRTEENTH_MAJ13_a5a9: return lang.voicings.THIRTEENTH_MAJ13_a5a9;
    default: return null;
  }
}
