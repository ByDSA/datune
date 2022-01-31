import { cyclicMod } from "@datune/utils";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG, NUMBER } from "../constants";
import Chromatic from "../Pitch";

export default function f(intValue: number): Chromatic {
  const fixedIntValue = getValidInt(intValue);

  switch (fixedIntValue) {
    case 0: return C;
    case 1: return CC;
    case 2: return D;
    case 3: return DD;
    case 4: return E;
    case 5: return F;
    case 6: return FF;
    case 7: return G;
    case 8: return GG;
    case 9: return A;
    case 10: return AA;
    case 11: return B;
    default: throw new Error(String(intValue));
  }
}

function getValidInt(intValue: number): number {
  return cyclicMod(intValue, NUMBER);
}
