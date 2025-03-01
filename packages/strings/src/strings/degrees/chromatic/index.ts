import { bII, bIII, bV, bVI, bVII, I, II, III, IV, V, VI, VII } from "@datune/core/degrees/chromatic/constants";
import { Degree } from "@datune/core/degrees/chromatic";

export function stringifyDegree(obj: Degree): string {
  switch (obj) {
    case I: return "I";
    case bII: return "bII";
    case II: return "II";
    case bIII: return "bIII";
    case III: return "III";
    case IV: return "IV";
    case bV: return "bV";
    case V: return "V";
    case bVI: return "bVI";
    case VI: return "VI";
    case bVII: return "bVII";
    case VII: return "VII";
    default: return "[Chromatic Degree]";
  }
}
