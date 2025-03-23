import { Intervals as I } from "@datune/core/alt";
import { Voicing } from "@datune/core/voicings/alt";
import { Voicings as V } from "@datune/core/voicings/relative/alt";
import { getLangFromOptions } from "lang";
import { Options } from "parsing";
import { stringifyArray } from "strings/intervals/alt/array";

export function stringifyShortName(voicing: Voicing, options?: Options): string {
  return stringifyShortNameLang(voicing, options) ?? stringifyArray(voicing.rootIntervals);
}

export function stringifyShortNameLang(voicing: Voicing, options?: Options): string | null {
  const lang = getLangFromOptions(options);

  switch (voicing) {
    case V.TRIAD_MAJOR: return lang.shortVoicings.TRIAD_MAJOR;
    case V.TRIAD_MINOR: return lang.shortVoicings.TRIAD_MINOR;
    case V.TRIAD_AUGMENTED: return lang.shortVoicings.TRIAD_AUGMENTED;
    case V.TRIAD_DIMINISHED: return lang.shortVoicings.TRIAD_DIMINISHED;
    case V.TRIAD_SUS4: return lang.shortVoicings.TRIAD_SUS4;
    case V.TRIAD_SUS2: return lang.shortVoicings.TRIAD_SUS2;
    case V.TRIAD_QUARTAL: return lang.shortVoicings.TRIAD_QUARTAL;
    case V.ELEVENTH: return lang.shortVoicings.ELEVENTH;
    case V.ELEVENTH_MAJ11: return lang.shortVoicings.ELEVENTH_MAJ11;
    case V.ELEVENTH_MINOR_MAJ11: return lang.shortVoicings.ELEVENTH_MINOR_MAJ11;
    case V.ELEVENTH_MINOR: return lang.shortVoicings.ELEVENTH_MINOR;
    case V.ELEVENTH_a9: return lang.shortVoicings.ELEVENTH_a9;
    case V.ELEVENTH_b9: return lang.shortVoicings.ELEVENTH_b9;
    case V.NINTH: return lang.shortVoicings.NINTH;
    case V.NINTH_ADD6: return lang.shortVoicings.NINTH_ADD6;
    case V.NINTH_MAJ9: return lang.shortVoicings.NINTH_MAJ9;
    case V.NINTH_MAJ9_a11: return lang.shortVoicings.NINTH_MAJ9_a11;
    case V.NINTH_MINOR: return lang.shortVoicings.NINTH_MINOR;
    case V.NINTH_MINOR_MAJ9: return lang.shortVoicings.NINTH_MINOR_MAJ9;
    case V.NINTH_SUS4: return lang.shortVoicings.NINTH_SUS4;
    case V.NINTH_a11: return lang.shortVoicings.NINTH_a11;
    case V.NINTH_a5: return lang.shortVoicings.NINTH_a5;
    case V.NINTH_b5: return lang.shortVoicings.NINTH_b5;
    case V.POWER_CHORD: return lang.shortVoicings.POWER_CHORD;
    case V.SEVENTH: return lang.shortVoicings.SEVENTH;
    case V.SEVENTH_ADD11: return lang.shortVoicings.SEVENTH_ADD11;
    case V.SEVENTH_ADD13: return lang.shortVoicings.SEVENTH_ADD13;
    case V.SEVENTH_MAJ7: return lang.shortVoicings.SEVENTH_MAJ7;
    case V.SEVENTH_MINOR: return lang.shortVoicings.SEVENTH_MINOR;
    case V.SEVENTH_MINOR_MAJ7: return lang.shortVoicings.SEVENTH_MINOR_MAJ7;
    case V.SEVENTH_MINOR_a5: return lang.shortVoicings.SEVENTH_MINOR_a5;
    case V.SEVENTH_MINOR_b5: return lang.shortVoicings.SEVENTH_MINOR_b5;
    case V.SEVENTH_MINOR_b9: return lang.shortVoicings.SEVENTH_MINOR_b9;
    case V.SEVENTH_SUS4: return lang.shortVoicings.SEVENTH_SUS4;
    case V.SEVENTH_SUS4_b9: return lang.shortVoicings.SEVENTH_SUS4_b9;
    case V.SEVENTH_a5: return lang.shortVoicings.SEVENTH_a5;
    case V.SEVENTH_a9: return lang.shortVoicings.SEVENTH_a9;
    case V.SEVENTH_b5: return lang.shortVoicings.SEVENTH_b5;
    case V.SEVENTH_MAJ7_b5: return lang.shortVoicings.SEVENTH_MAJ7_b5;
    case V.SEVENTH_b9: return lang.shortVoicings.SEVENTH_b9;
    case V.SIXTH: return lang.shortVoicings.SIXTH;
    case V.SIXTH_ADD9: return lang.shortVoicings.SIXTH_ADD9;
    case V.SIXTH_MINOR: return lang.shortVoicings.SIXTH_MINOR;
    case V.SIXTH_MINOR_ADD9: return lang.shortVoicings.SIXTH_MINOR_ADD9;
    case V.SIXTH_SUS4: return lang.shortVoicings.SIXTH_SUS4;
    case V.THIRTEENTH_MAJ13: return lang.shortVoicings.THIRTEENTH_MAJ13;
    case V.THIRTEENTH_MAJ13_a5: return lang.shortVoicings.THIRTEENTH_MAJ13_a5;
    case V.THIRTEENTH_MAJ13_a5a9: return lang.shortVoicings.THIRTEENTH_MAJ13_a5a9;
    case V.THIRTEENTH_b5a9: return lang.shortVoicings.THIRTEENTH_b5a9;
    case V.THIRTEENTH_MINOR: return lang.shortVoicings.THIRTEENTH_MINOR;
    case V.THIRTEENTH_SUS4: return lang.shortVoicings.THIRTEENTH_SUS4;
    case V.THIRTEENTH_b5: return lang.shortVoicings.THIRTEENTH_b5;
    case V.THIRTEENTH_a5: return lang.shortVoicings.THIRTEENTH_a5;
    case V.THIRTEENTH_b9: return lang.shortVoicings.THIRTEENTH_b9;
    case V.THIRTEENTH_a9: return lang.shortVoicings.THIRTEENTH_a9;
    case V.THIRTEENTH_b5b9: return lang.shortVoicings.THIRTEENTH_b5b9;
    case V.THIRTEENTH_a5b9: return lang.shortVoicings.THIRTEENTH_a5b9;
    case V.THIRTEENTH_a5a9: return lang.shortVoicings.THIRTEENTH_a5a9;
    case V.THIRTEENTH_MINOR_MAJ13: return lang.shortVoicings.THIRTEENTH_MINOR_MAJ13;
    case V.THIRTEENTH_MAJ13_b5: return lang.shortVoicings.THIRTEENTH_MAJ13_b5;
    case V.THIRTEENTH_MAJ13_b9: return lang.shortVoicings.THIRTEENTH_MAJ13_b9;
    case V.THIRTEENTH_MAJ13_a9: return lang.shortVoicings.THIRTEENTH_MAJ13_a9;
    case V.THIRTEENTH_MAJ13_b5b9: return lang.shortVoicings.THIRTEENTH_MAJ13_b5b9;
    case V.THIRTEENTH_MAJ13_b5a9: return lang.shortVoicings.THIRTEENTH_MAJ13_b5a9;
    case V.THIRTEENTH_MAJ13_a5b9: return lang.shortVoicings.THIRTEENTH_MAJ13_a5b9;
    case V.fromRootIntervals(I.P1, I.m2, I.d5): return "loc∆";// TODO: mover a lang estos nombres
    case V.fromRootIntervals(I.P1, I.m2, I.P5): return "phryg∆";
    case V.fromRootIntervals(I.P1, I.M2, I.P4): return "sus2/4";
    case V.fromRootIntervals(I.P1, I.M2, I.d5): return "sus2♭5";
    case V.fromRootIntervals(I.P1, I.M2, I.a5): return "sus2♯5";
    case V.fromRootIntervals(I.P1, I.m3, I.P4): return "m∆sus4";
    case V.fromRootIntervals(I.P1, I.M3, I.P4): return "∆sus4";
    case V.fromRootIntervals(I.P1, I.M3, I.d5): return "♭5";
    case V.fromRootIntervals(I.P1, I.P4, I.d5): return "sus4♭5";
    case V.fromRootIntervals(I.P1, I.P4, I.a5): return "sus4♯5";
    case V.fromRootIntervals(I.P1, I.a4, I.P5): return "lyd∆";
    default: return null;
  }
}
