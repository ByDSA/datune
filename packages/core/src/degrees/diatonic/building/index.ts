import type { Degree } from "../Degree";
import { cyclicMod } from "@datune/utils";
import { Pitches as P } from "pitches/diatonic";
import { I, II, III, IV, V, VI, VII } from "../constants";

export function fromInt(n: number): Degree {
  const fixedInt = cyclicMod(n, P.NUMBER);

  switch (fixedInt) {
    case 0: return I;
    case 1: return II;
    case 2: return III;
    case 3: return IV;
    case 4: return V;
    case 5: return VI;
    case 6: return VII;
    default: throw new Error(`Cannot get DiatonicDegree from int: ${n}`);
  }
}
