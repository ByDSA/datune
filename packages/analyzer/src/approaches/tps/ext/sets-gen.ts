import { Degree, Degrees, IntervalSet, IntervalSets as IS, Scale } from "@datune/core/alt";

export type SetsGen = (scale: Scale, degree: Degree)=> IntervalSet[];

export const mainTriadSevenths: SetsGen = (_scale, degree) => {
  const r = [
    IS.TRIAD_MAJOR,
    IS.TRIAD_MINOR,
    IS.TRIAD_DIMINISHED,
    IS.TRIAD_AUGMENTED,

    IS.SEVENTH_MAJ7,
    IS.SEVENTH_MAJ7_b5,
    IS.SEVENTH,
    IS.SEVENTH_MINOR,
    IS.SEVENTH_a5,
    IS.SEVENTH_b5,
    IS.SEVENTH_MINOR_a5,
    IS.SEVENTH_MINOR_b5,
  ];

  if (degree === Degrees.I) {
    r.push(
      IS.TRIAD_QUARTAL,
      IS.TRIAD_SUS2,
      IS.TRIAD_SUS4,

      IS.SEVENTH_SUS4,
      IS.SEVENTH_SUS4_b9,
    );
  }

  return r;
};

export const mainTriads: SetsGen = (_scale, degree) => {
  const r = [
    IS.TRIAD_MAJOR,
    IS.TRIAD_MINOR,
    IS.TRIAD_DIMINISHED,
    IS.TRIAD_AUGMENTED,
  ];

  if (degree === Degrees.I) {
    r.push(
      IS.TRIAD_SUS2,
      IS.TRIAD_SUS4,
    );
  }

  return r;
};
