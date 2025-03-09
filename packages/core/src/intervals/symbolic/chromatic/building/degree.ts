import type { Degree } from "degrees/chromatic";
import type { Interval } from "intervals/chromatic";
import * as I from "intervals/symbolic/chromatic/constants";
import * as D from "degrees/chromatic/constants";

export function fromDegree(obj: Degree): Interval {
  const { M2, M7, M6, M3, m2, m7, m6, m3, P5, P4, P1, TRITONE } = I;

  switch (obj) {
    case D.I: return P1;
    case D.bII: return m2;
    case D.II: return M2;
    case D.bIII: return m3;
    case D.III: return M3;
    case D.IV: return P4;
    case D.bV: return TRITONE;
    case D.V: return P5;
    case D.bVI: return m6;
    case D.VI: return M6;
    case D.bVII: return m7;
    case D.VII: return M7;
    default: throw new Error();
  }
}
