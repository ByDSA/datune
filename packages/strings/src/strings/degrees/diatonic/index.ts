import { Degree, I, II, III, IV, V, VI, VII } from "@datune/core/degrees/diatonic";

export default function stringify(obj: Degree): string {
  switch (obj) {
    case I: return "I";
    case II: return "II";
    case III: return "III";
    case IV: return "IV";
    case V: return "V";
    case VI: return "VI";
    case VII: return "VII";
    default: return "[Diatonic Degree]";
  }
}
