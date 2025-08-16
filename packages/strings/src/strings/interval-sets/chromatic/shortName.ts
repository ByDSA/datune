import { IntervalSet } from "@datune/core/intervalSets/chromatic";
import { IntervalSets as IS } from "@datune/core/intervalSets/relative/chromatic";
import { getLangFromOptions } from "lang/Options";
import { Options } from "parsing";
import { stringifyIntervalArray } from "strings/intervals/chromatic/array";

export function stringifyShortName(intervalSet: IntervalSet, options?: Options): string {
  return stringifyShortNameLang(intervalSet, options) ?? stringifyIntervalArray(intervalSet.rootIntervals);
}

export function stringifyShortNameLang(intervalSet: IntervalSet, options?: Options): string | null {
  const lang = getLangFromOptions(options);

  switch (intervalSet) {
    // Interval
    case IS.m2: return lang.shortIntervalSets.m2;
    case IS.M2: return lang.shortIntervalSets.M2;
    case IS.m3: return lang.shortIntervalSets.m3;
    case IS.M3: return lang.shortIntervalSets.M3;
    case IS.TRITONE: return lang.shortIntervalSets.TRITONE;
    case IS.POWER_CHORD: return lang.shortIntervalSets.POWER_CHORD;
      // Triads
    case IS.TRIAD_MAJOR: return lang.shortIntervalSets.TRIAD_MAJOR;
    case IS.TRIAD_MINOR: return lang.shortIntervalSets.TRIAD_MINOR;
    case IS.TRIAD_AUGMENTED: return lang.shortIntervalSets.TRIAD_AUGMENTED;
    case IS.TRIAD_DIMINISHED: return lang.shortIntervalSets.TRIAD_DIMINISHED;
    case IS.TRIAD_SUS4: return lang.shortIntervalSets.TRIAD_SUS4;
    case IS.TRIAD_SUS2: return lang.shortIntervalSets.TRIAD_SUS2;
    case IS.TRIAD_QUARTAL: return lang.shortIntervalSets.TRIAD_QUARTAL;
    case IS.fromRootIntervals(0, 1, 6): return "loc∆";// TODO: mover a lang estos nombres
    case IS.fromRootIntervals(0, 1, 7): return "phryg∆";
    case IS.fromRootIntervals(0, 2, 5): return "sus2/4";
    case IS.fromRootIntervals(0, 2, 6): return "sus2♭5";
    case IS.fromRootIntervals(0, 2, 8): return "sus2♯5";
    case IS.fromRootIntervals(0, 3, 5): return "m∆sus4";
    case IS.fromRootIntervals(0, 4, 5): return "∆sus4";
    case IS.fromRootIntervals(0, 4, 6): return "♭5";
    case IS.fromRootIntervals(0, 5, 6): return "sus4♭5";
    case IS.fromRootIntervals(0, 5, 8): return "sus4♯5";
    case IS.fromRootIntervals(0, 6, 7): return "lyd∆";
      // 7ª
    case IS.SEVENTH: return lang.shortIntervalSets.SEVENTH;
    case IS.SEVENTH_b5: return lang.shortIntervalSets.SEVENTH_b5;
    case IS.SEVENTH_a5: return lang.shortIntervalSets.SEVENTH_a5;
    case IS.SEVENTH_MINOR: return lang.shortIntervalSets.SEVENTH_MINOR;
    case IS.SEVENTH_MINOR_b5: return lang.shortIntervalSets.SEVENTH_MINOR_b5;
    case IS.SEVENTH_MINOR_a5: return lang.shortIntervalSets.SEVENTH_MINOR_a5;
    case IS.SEVENTH_MINOR_MAJ7: return lang.shortIntervalSets.SEVENTH_MINOR_MAJ7;
    case IS.SEVENTH_MAJ7: return lang.shortIntervalSets.SEVENTH_MAJ7;
    case IS.SEVENTH_MAJ7_b5: return lang.shortIntervalSets.SEVENTH_MAJ7_b5;
    case IS.SEVENTH_SUS4: return lang.shortIntervalSets.SEVENTH_SUS4;
      // 6ª
    case IS.SIXTH: return lang.shortIntervalSets.SIXTH;
    case IS.SIXTH_ADD9: return lang.shortIntervalSets.SIXTH_ADD9;
    case IS.SIXTH_MINOR: return lang.shortIntervalSets.SIXTH_MINOR;
    case IS.SIXTH_MINOR_ADD9: return lang.shortIntervalSets.SIXTH_MINOR_ADD9;
    case IS.SIXTH_SUS4: return lang.shortIntervalSets.SIXTH_SUS4;
      // 9ª
    case IS.NINTH: return lang.shortIntervalSets.NINTH;
    case IS.NINTH_MAJ9: return lang.shortIntervalSets.NINTH_MAJ9;
    case IS.NINTH_MAJ9_a11: return lang.shortIntervalSets.NINTH_MAJ9_a11;
    case IS.NINTH_MINOR: return lang.shortIntervalSets.NINTH_MINOR;
    case IS.NINTH_MINOR_MAJ9: return lang.shortIntervalSets.NINTH_MINOR_MAJ9;
    case IS.NINTH_SUS4: return lang.shortIntervalSets.NINTH_SUS4;
    case IS.NINTH_a5: return lang.shortIntervalSets.NINTH_a5;
    case IS.NINTH_b5: return lang.shortIntervalSets.NINTH_b5;
    case IS.NINTH_ADD6: return lang.shortIntervalSets.NINTH_ADD6;
    case IS.SEVENTH_SUS4_b9: return lang.shortIntervalSets.SEVENTH_SUS4_b9;
    case IS.SEVENTH_ADD11: return lang.shortIntervalSets.SEVENTH_ADD11;
    case IS.SEVENTH_MINOR_b9: return lang.shortIntervalSets.SEVENTH_MINOR_b9;
    case IS.SEVENTH_a9: return lang.shortIntervalSets.SEVENTH_a9;
    case IS.SEVENTH_b9: return lang.shortIntervalSets.SEVENTH_b9;
      // 11ª
    case IS.ELEVENTH: return lang.shortIntervalSets.ELEVENTH;
    case IS.ELEVENTH_MINOR: return lang.shortIntervalSets.ELEVENTH_MINOR;
    case IS.ELEVENTH_b9: return lang.shortIntervalSets.ELEVENTH_b9;
    case IS.ELEVENTH_a9: return lang.shortIntervalSets.ELEVENTH_a9;
    case IS.ELEVENTH_MAJ11: return lang.shortIntervalSets.ELEVENTH_MAJ11;
    case IS.ELEVENTH_MINOR_MAJ11: return lang.shortIntervalSets.ELEVENTH_MINOR_MAJ11;
    case IS.NINTH_a11: return lang.shortIntervalSets.NINTH_a11;
      // 13ª
    case IS.SEVENTH_ADD13: return lang.shortIntervalSets.SEVENTH_ADD13;
    case IS.THIRTEENTH_MINOR: return lang.shortIntervalSets.THIRTEENTH_MINOR;
    case IS.THIRTEENTH_SUS4: return lang.shortIntervalSets.THIRTEENTH_SUS4;
    case IS.THIRTEENTH_b5: return lang.shortIntervalSets.THIRTEENTH_b5;
    case IS.THIRTEENTH_a5: return lang.shortIntervalSets.THIRTEENTH_a5;
    case IS.THIRTEENTH_b9: return lang.shortIntervalSets.THIRTEENTH_b9;
    case IS.THIRTEENTH_a9: return lang.shortIntervalSets.THIRTEENTH_a9;
    case IS.THIRTEENTH_b5b9: return lang.shortIntervalSets.THIRTEENTH_b5b9;
    case IS.THIRTEENTH_b5a9: return lang.shortIntervalSets.THIRTEENTH_b5a9;
    case IS.THIRTEENTH_a5b9: return lang.shortIntervalSets.THIRTEENTH_a5b9;
    case IS.THIRTEENTH_a5a9: return lang.shortIntervalSets.THIRTEENTH_a5a9;
    case IS.THIRTEENTH_MAJ13: return lang.shortIntervalSets.THIRTEENTH_MAJ13;
    case IS.THIRTEENTH_MINOR_MAJ13: return lang.shortIntervalSets.THIRTEENTH_MINOR_MAJ13;
    case IS.THIRTEENTH_MAJ13_b5: return lang.shortIntervalSets.THIRTEENTH_MAJ13_b5;
    case IS.THIRTEENTH_MAJ13_a5: return lang.shortIntervalSets.THIRTEENTH_MAJ13_a5;
    case IS.THIRTEENTH_MAJ13_b9: return lang.shortIntervalSets.THIRTEENTH_MAJ13_b9;
    case IS.THIRTEENTH_MAJ13_a9: return lang.shortIntervalSets.THIRTEENTH_MAJ13_a9;
    case IS.THIRTEENTH_MAJ13_b5b9: return lang.shortIntervalSets.THIRTEENTH_MAJ13_b5b9;
    case IS.THIRTEENTH_MAJ13_b5a9: return lang.shortIntervalSets.THIRTEENTH_MAJ13_b5a9;
    case IS.THIRTEENTH_MAJ13_a5b9: return lang.shortIntervalSets.THIRTEENTH_MAJ13_a5b9;
    case IS.THIRTEENTH_MAJ13_a5a9: return lang.shortIntervalSets.THIRTEENTH_MAJ13_a5a9;
    default: return null;
  }
}
