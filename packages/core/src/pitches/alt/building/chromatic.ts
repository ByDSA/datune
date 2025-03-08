import type { Pitch } from "../Pitch";
import type { Pitch as CPitch } from "pitches/chromatic";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as P } from "..";

export function fromChromatic(cPitch: CPitch): Pitch {
  const ret = map.get(cPitch);

  if (ret === undefined)
    throw new Error("");

  return ret;
}

const map: Map<CPitch, Pitch> = new Map([
  [CP.C, P.C],
  [CP.CC, P.CC],
  [CP.D, P.D],
  [CP.DD, P.DD],
  [CP.E, P.E],
  [CP.F, P.F],
  [CP.FF, P.FF],
  [CP.G, P.G],
  [CP.GG, P.GG],
  [CP.A, P.A],
  [CP.AA, P.AA],
  [CP.B, P.B],
]);
