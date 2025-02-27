/* eslint-disable camelcase */

import { lockr } from "@datune/utils/immutables";
import { getAllInversions } from "../utils";
import Voicing from "../Voicing";
import { DIMINISHED_FIFTH, MAJOR_SECOND, MAJOR_THIRD, MINOR_SECOND, MINOR_THIRD, POWER_CHORD } from "./n2";
import { TRIAD_AUGMENTED, TRIAD_DIMINISHED, TRIAD_MAJOR, TRIAD_MINOR, TRIAD_QUARTAL, TRIAD_SUS2, TRIAD_SUS4 } from "./n3";
import { SEVENTH, SEVENTH_a5, SEVENTH_b5, SEVENTH_MAJ7, SEVENTH_MAJ7_b5, SEVENTH_MINOR, SEVENTH_MINOR_a5, SEVENTH_MINOR_b5, SEVENTH_MINOR_MAJ7, SEVENTH_SUS4, SEVENTH_SUS4_b9, SIXTH, SIXTH_MINOR, SIXTH_SUS4 } from "./n4";
import { NINTH, NINTH_a5, NINTH_b5, NINTH_MAJ9, NINTH_MINOR, NINTH_MINOR_MAJ9, NINTH_SUS4, SEVENTH_a9, SEVENTH_ADD13, SEVENTH_b9, SEVENTH_MINOR_b9, SIXTH_ADD9, SIXTH_MINOR_ADD9 } from "./n5";
import { ELEVENTH, ELEVENTH_a9, ELEVENTH_b9, ELEVENTH_MAJ11, ELEVENTH_MINOR, ELEVENTH_MINOR_MAJ11, NINTH_a11, NINTH_ADD6, NINTH_MAJ9_a11, SEVENTH_ADD11 } from "./n6";
import { THIRTEENTH_a5, THIRTEENTH_a5a9, THIRTEENTH_a5b9, THIRTEENTH_a9, THIRTEENTH_b5, THIRTEENTH_b5a9, THIRTEENTH_b5b9, THIRTEENTH_b9, THIRTEENTH_MAJ13, THIRTEENTH_MAJ13_a5, THIRTEENTH_MAJ13_a5a9, THIRTEENTH_MAJ13_a5b9, THIRTEENTH_MAJ13_a9, THIRTEENTH_MAJ13_b5, THIRTEENTH_MAJ13_b5a9, THIRTEENTH_MAJ13_b5b9, THIRTEENTH_MAJ13_b9, THIRTEENTH_MINOR, THIRTEENTH_MINOR_MAJ13, THIRTEENTH_SUS4 } from "./n7";

export function initializeSets() {
  COMMON = new Set([
    MINOR_SECOND,
    MAJOR_SECOND,
    MINOR_THIRD,
    MAJOR_THIRD,
    DIMINISHED_FIFTH,
    POWER_CHORD,
    TRIAD_MAJOR,
    TRIAD_MINOR,
    TRIAD_DIMINISHED,
    TRIAD_AUGMENTED,
    TRIAD_SUS4,
    TRIAD_SUS2,
    TRIAD_QUARTAL,
    SEVENTH,
    SEVENTH_b5,
    SEVENTH_a5,
    SEVENTH_SUS4,
    SEVENTH_SUS4_b9,
    SEVENTH_MINOR,
    SEVENTH_MINOR_b5,
    SEVENTH_MINOR_a5,
    SIXTH,
    SIXTH_MINOR,
    SIXTH_SUS4,
    SEVENTH_MAJ7,
    SEVENTH_MAJ7_b5,
    SEVENTH_MINOR_MAJ7,
    SIXTH_ADD9,
    SIXTH_MINOR_ADD9,
    SEVENTH_b9,
    SEVENTH_a9,
    SEVENTH_MINOR_b9,
    SEVENTH_ADD11,
    SEVENTH_ADD13,
    NINTH,
    NINTH_MINOR,
    NINTH_b5,
    NINTH_a5,
    NINTH_SUS4,
    NINTH_MAJ9,
    NINTH_MINOR_MAJ9,
    NINTH_ADD6,
    NINTH_a11,
    NINTH_MAJ9_a11,
    ELEVENTH,
    ELEVENTH_MINOR,
    ELEVENTH_b9,
    ELEVENTH_a9,
    ELEVENTH_MAJ11,
    ELEVENTH_MINOR_MAJ11,
    THIRTEENTH_MINOR,
    THIRTEENTH_SUS4,
    THIRTEENTH_b5,
    THIRTEENTH_a5,
    THIRTEENTH_b9,
    THIRTEENTH_a9,
    THIRTEENTH_b5b9,
    THIRTEENTH_b5a9,
    THIRTEENTH_a5b9,
    THIRTEENTH_a5a9,
    THIRTEENTH_MAJ13,
    THIRTEENTH_MINOR_MAJ13,
    THIRTEENTH_MAJ13_b5,
    THIRTEENTH_MAJ13_a5,
    THIRTEENTH_MAJ13_b9,
    THIRTEENTH_MAJ13_a9,
    THIRTEENTH_MAJ13_b5b9,
    THIRTEENTH_MAJ13_b5a9,
    THIRTEENTH_MAJ13_a5b9,
    THIRTEENTH_MAJ13_a5a9,
  ]);

  TRIADS_MAJOR_MINOR = new Set([
    ...getAllInversions(TRIAD_MAJOR),
    ...getAllInversions(TRIAD_MINOR),
  ]);

  COMMON_TRIADS = new Set([
    ...TRIADS_MAJOR_MINOR,
    ...getAllInversions(TRIAD_DIMINISHED),
    ...getAllInversions(TRIAD_AUGMENTED),
    ...getAllInversions(TRIAD_SUS4),
  ]);

  COMMON_NON_INVERSIONS = new Set([
    POWER_CHORD,
    TRIAD_MAJOR,
    TRIAD_MINOR,
    TRIAD_DIMINISHED,
    TRIAD_AUGMENTED,
    TRIAD_SUS4,
    SEVENTH,
    SEVENTH_b5,
    SEVENTH_a5,
    SEVENTH_SUS4,
    SEVENTH_SUS4_b9,
    SEVENTH_MINOR,
    SEVENTH_MINOR_b5,
    SEVENTH_MINOR_a5,
    SEVENTH_MAJ7,
    SEVENTH_MAJ7_b5,
    SEVENTH_MINOR_MAJ7,
    SIXTH_ADD9,
    SIXTH_MINOR_ADD9,
    SEVENTH_b9,
    SEVENTH_a9,
    SEVENTH_MINOR_b9,
    SEVENTH_ADD11,
    NINTH,
    NINTH_MINOR,
    NINTH_b5,
    NINTH_a5,
    NINTH_SUS4,
    NINTH_MAJ9,
    NINTH_MINOR_MAJ9,
    NINTH_ADD6,
    NINTH_a11,
    NINTH_MAJ9_a11,
    ELEVENTH,
    ELEVENTH_MINOR,
    ELEVENTH_b9,
    ELEVENTH_a9,
    ELEVENTH_MAJ11,
    ELEVENTH_MINOR_MAJ11,
    THIRTEENTH_SUS4,
    THIRTEENTH_b5, // ! "P1-M3-d5-m7-M9-P11-M13"
    THIRTEENTH_a5,
    THIRTEENTH_b9,
    THIRTEENTH_a9,
    THIRTEENTH_b5a9,
    THIRTEENTH_a5b9,
    THIRTEENTH_a5a9,
    THIRTEENTH_MAJ13,
    THIRTEENTH_MINOR_MAJ13,
    THIRTEENTH_MAJ13_b5,
    THIRTEENTH_MAJ13_a5, // "P1-M3-P5-M7-m9-P11-M13"
    THIRTEENTH_MAJ13_b5a9,
    THIRTEENTH_MAJ13_b5b9,
    THIRTEENTH_MAJ13_a5b9,
    THIRTEENTH_MAJ13_a5a9,
  ]);

  lockr(COMMON);
}

export let COMMON: Set<Voicing>;

export let TRIADS_MAJOR_MINOR: Set<Voicing>;

export let COMMON_TRIADS: Set<Voicing>;

export let COMMON_NON_INVERSIONS: Set<Voicing>;
