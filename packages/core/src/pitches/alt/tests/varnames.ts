import { DIATONIC_PITCHES_VARNAMES } from "pitches/diatonic/tests/varnames";

export const ALT_PITCHES_4ALTS_VARNAMES = Object.freeze(DIATONIC_PITCHES_VARNAMES.map(v=> {
  return [
    v,
    ...[2, 3, 4].map(n=>v.repeat(n)),
    ...[1, 2, 3].map(n=>v + "b".repeat(n)),
  ];
} ).flat());
