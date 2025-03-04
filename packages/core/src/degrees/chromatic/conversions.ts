import type { Degree } from "./Degree";
import { Interval, Intervals } from "intervals/chromatic";
import { bII, bIII, bV, bVI, bVII, I, II, III, IV, V, VI, VII } from "./constants";

export function toInterval(obj: Degree): Interval {
  const { M2, M7, M6, M3, m2, m7, m6, m3, P5, P4, P1, TRITONE } = Intervals;

  switch (obj) {
    case I: return P1;
    case bII: return m2;
    case II: return M2;
    case bIII: return m3;
    case III: return M3;
    case IV: return P4;
    case bV: return TRITONE;
    case V: return P5;
    case bVI: return m6;
    case VI: return M6;
    case bVII: return m7;
    case VII: return M7;
    default: throw new Error();
  }
}
