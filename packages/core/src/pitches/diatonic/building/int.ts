import { cyclicMod } from "@datune/utils";
import { A, B, C, D, E, F, G, NUMBER } from "../constants";
import Diatonic from "../Diatonic";

export default function fromInt(intValue: number): Diatonic {
  const fixedIntValue = cyclicMod(intValue, NUMBER);

  switch (fixedIntValue) {
    case 0: return C;
    case 1: return D;
    case 2: return E;
    case 3: return F;
    case 4: return G;
    case 5: return A;
    case 6: return B;
    default: throw new Error(`Input:${intValue} Fixed:${fixedIntValue}`);
  }
}
