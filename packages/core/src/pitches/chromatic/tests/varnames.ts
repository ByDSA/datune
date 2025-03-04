import { DIATONIC_PITCHES_VARNAMES } from "pitches/diatonic/tests/varnames";

export const CHAROMATIC_PITCHES12_SHARPS_VARNAMES = Object.freeze(
  DIATONIC_PITCHES_VARNAMES.map(v=> {
    if (v !== "E" && v !== "B")
      return [v, v + v];

    return [v];
  } ).flat(),
);
