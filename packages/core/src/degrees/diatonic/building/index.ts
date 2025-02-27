import { cyclicMod } from "@datune/utils";
import { I, II, III, IV, V, VI, VII } from "../constants";
import Degree from "../Degree";
import { Pitches } from "pitches/diatonic";

export function fromInt(n: number): Degree {
  const fixedInt = cyclicMod(n, Pitches.NUMBER);

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
