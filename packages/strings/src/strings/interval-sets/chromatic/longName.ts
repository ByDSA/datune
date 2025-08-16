import { IntervalSet } from "@datune/core/intervalSets/chromatic";
import { IntervalSets as IS } from "@datune/core/intervalSets/relative/chromatic";
import { getLangFromOptions, Options } from "lang";

export function stringifyLongName(intervalSet: IntervalSet, options?: Options): string | null {
  const lang = getLangFromOptions(options);

  switch (intervalSet) {
    // intervals
    case IS.m2: return lang.intervalSets.m2;
    case IS.M2: return lang.intervalSets.M2;
    case IS.m3: return lang.intervalSets.m3;
    case IS.M3: return lang.intervalSets.M3;
    case IS.TRITONE: return lang.intervalSets.TRITONE;
    case IS.POWER_CHORD: return lang.intervalSets.POWER_CHORD;
      // triads
    case IS.TRIAD_MAJOR: return lang.intervalSets.TRIAD_MAJOR;
    case IS.TRIAD_MINOR: return lang.intervalSets.TRIAD_MINOR;
    case IS.TRIAD_AUGMENTED: return lang.intervalSets.TRIAD_AUGMENTED;
    case IS.TRIAD_DIMINISHED: return lang.intervalSets.TRIAD_DIMINISHED;
    case IS.TRIAD_SUS4: return lang.intervalSets.TRIAD_SUS4;
    case IS.TRIAD_SUS2: return lang.intervalSets.TRIAD_SUS2;
    case IS.TRIAD_QUARTAL: return lang.intervalSets.TRIAD_QUARTAL;
      // 7ª
    case IS.SEVENTH: return lang.intervalSets.SEVENTH;
    case IS.SEVENTH_MAJ7: return lang.intervalSets.SEVENTH_MAJ7;
    case IS.SEVENTH_MAJ7_b5: return lang.intervalSets.SEVENTH_MAJ7_b5;
    case IS.SEVENTH_MINOR: return lang.intervalSets.SEVENTH_MINOR;
    case IS.SEVENTH_MINOR_MAJ7: return lang.intervalSets.SEVENTH_MINOR_MAJ7;
    case IS.SEVENTH_MINOR_a5: return lang.intervalSets.SEVENTH_MINOR_a5;
    case IS.SEVENTH_MINOR_b5: return lang.intervalSets.SEVENTH_MINOR_b5;
    case IS.SEVENTH_MINOR_b9: return lang.intervalSets.SEVENTH_MINOR_b9;
    case IS.SEVENTH_SUS4: return lang.intervalSets.SEVENTH_SUS4;
      // 6ª
    case IS.SIXTH: return lang.intervalSets.SIXTH;
    case IS.SIXTH_ADD9: return lang.intervalSets.SIXTH_ADD9;
    case IS.SIXTH_MINOR: return lang.intervalSets.SIXTH_MINOR;
    case IS.SIXTH_MINOR_ADD9: return lang.intervalSets.SIXTH_MINOR_ADD9;
    case IS.SIXTH_SUS4: return lang.intervalSets.SIXTH_SUS4;
      // 9ª
    case IS.NINTH: return lang.intervalSets.NINTH;
    case IS.NINTH_ADD6: return lang.intervalSets.NINTH_ADD6;
    case IS.NINTH_MAJ9: return lang.intervalSets.NINTH_MAJ9;
    case IS.NINTH_MAJ9_a11: return lang.intervalSets.NINTH_MAJ9_a11;
    case IS.NINTH_MINOR: return lang.intervalSets.NINTH_MINOR;
    case IS.NINTH_MINOR_MAJ9: return lang.intervalSets.NINTH_MINOR_MAJ9;
    case IS.NINTH_SUS4: return lang.intervalSets.NINTH_SUS4;
    case IS.NINTH_a11: return lang.intervalSets.NINTH_a11;
    case IS.NINTH_a5: return lang.intervalSets.NINTH_a5;
    case IS.NINTH_b5: return lang.intervalSets.NINTH_b5;
    case IS.SEVENTH_a5: return lang.intervalSets.SEVENTH_a5;
    case IS.SEVENTH_a9: return lang.intervalSets.SEVENTH_a9;
    case IS.SEVENTH_b5: return lang.intervalSets.SEVENTH_b5;
    case IS.SEVENTH_b9: return lang.intervalSets.SEVENTH_b9;
    case IS.SEVENTH_SUS4_b9: return lang.intervalSets.SEVENTH_SUS4_b9;
      // 11ª
    case IS.ELEVENTH: return lang.intervalSets.ELEVENTH;
    case IS.ELEVENTH_MAJ11: return lang.intervalSets.ELEVENTH_MAJ11;
    case IS.ELEVENTH_MINOR_MAJ11: return lang.intervalSets.ELEVENTH_MINOR_MAJ11;
    case IS.ELEVENTH_MINOR: return lang.intervalSets.ELEVENTH_MINOR;
    case IS.ELEVENTH_a9: return lang.intervalSets.ELEVENTH_a9;
    case IS.ELEVENTH_b9: return lang.intervalSets.ELEVENTH_b9;
    case IS.SEVENTH_ADD11: return lang.intervalSets.SEVENTH_ADD11;
      // 13ª
    case IS.SEVENTH_ADD13: return lang.intervalSets.SEVENTH_ADD13;
    case IS.THIRTEENTH_MINOR: return lang.intervalSets.THIRTEENTH_MINOR;
    case IS.THIRTEENTH_SUS4: return lang.intervalSets.THIRTEENTH_SUS4;
    case IS.THIRTEENTH_b5: return lang.intervalSets.THIRTEENTH_b5;
    case IS.THIRTEENTH_a5: return lang.intervalSets.THIRTEENTH_a5;
    case IS.THIRTEENTH_b9: return lang.intervalSets.THIRTEENTH_b9;
    case IS.THIRTEENTH_a9: return lang.intervalSets.THIRTEENTH_a9;
    case IS.THIRTEENTH_b5b9: return lang.intervalSets.THIRTEENTH_b5b9;
    case IS.THIRTEENTH_b5a9: return lang.intervalSets.THIRTEENTH_b5a9;
    case IS.THIRTEENTH_a5b9: return lang.intervalSets.THIRTEENTH_a5b9;
    case IS.THIRTEENTH_a5a9: return lang.intervalSets.THIRTEENTH_a5a9;
    case IS.THIRTEENTH_MAJ13: return lang.intervalSets.THIRTEENTH_MAJ13;
    case IS.THIRTEENTH_MINOR_MAJ13: return lang.intervalSets.THIRTEENTH_MINOR_MAJ13;
    case IS.THIRTEENTH_MAJ13_a5: return lang.intervalSets.THIRTEENTH_MAJ13_a5;
    case IS.THIRTEENTH_MAJ13_b5: return lang.intervalSets.THIRTEENTH_MAJ13_b5;
    case IS.THIRTEENTH_MAJ13_b9: return lang.intervalSets.THIRTEENTH_MAJ13_b9;
    case IS.THIRTEENTH_MAJ13_a9: return lang.intervalSets.THIRTEENTH_MAJ13_a9;
    case IS.THIRTEENTH_MAJ13_b5b9: return lang.intervalSets.THIRTEENTH_MAJ13_b5b9;
    case IS.THIRTEENTH_MAJ13_b5a9: return lang.intervalSets.THIRTEENTH_MAJ13_b5a9;
    case IS.THIRTEENTH_MAJ13_a5b9: return lang.intervalSets.THIRTEENTH_MAJ13_a5b9;
    case IS.THIRTEENTH_MAJ13_a5a9: return lang.intervalSets.THIRTEENTH_MAJ13_a5a9;
    default: return null;
  }
}
