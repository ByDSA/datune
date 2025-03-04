import type { Interval } from "@datune/core/intervals/chromatic";
import { d12, M14, M9, M2, M7, M6, M10, M3, M13, m14, m9, m2, m7, m6, m3, m13, P11, P15, P5, P4, P8, P12, P1, TRITONE, m10 } from "@datune/core/intervals/symbolic/chromatic/constants";

export function stringifyInterval(obj: Interval): string {
  switch (obj) {
    case P1: return "P1";
    case m2: return "m2";
    case M2: return "M2";
    case m3: return "m3";
    case M3: return "M3";
    case P4: return "P4";
    case TRITONE: return "T";
    case P5: return "P5";
    case m6: return "m6";
    case M6: return "M6";
    case m7: return "m7";
    case M7: return "M7";
    case P8: return "P8";
    case m9: return "m9";
    case M9: return "M9";
    case m10: return "m10";
    case M10: return "M10";
    case P11: return "P11";
    case d12: return "d12";
    case P12: return "P12";
    case m13: return "m13";
    case M13: return "M13";
    case m14: return "m14";
    case M14: return "M14";
    case P15: return "P15";
    default: throw new Error();
  }
}
