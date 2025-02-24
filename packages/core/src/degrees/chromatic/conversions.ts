import { Interval, MAJOR_SECOND, MAJOR_SEVENTH, MAJOR_SIXTH, MAJOR_THIRD, MINOR_SECOND, MINOR_SEVENTH, MINOR_SIXTH, MINOR_THIRD, PERFECT_FIFTH, PERFECT_FOURTH, PERFECT_UNISON, TRITONE } from "intervals/chromatic";
import { bII, bIII, bV, bVI, bVII, I, II, III, IV, V, VI, VII } from "./constants";
import Degree from "./Degree";

export function hash(obj: Degree): string {
  return String(+obj);
}

export function toInterval(obj: Degree): Interval {
  switch (obj) {
    case I: return PERFECT_UNISON;
    case bII: return MINOR_SECOND;
    case II: return MAJOR_SECOND;
    case bIII: return MINOR_THIRD;
    case III: return MAJOR_THIRD;
    case IV: return PERFECT_FOURTH;
    case bV: return TRITONE;
    case V: return PERFECT_FIFTH;
    case bVI: return MINOR_SIXTH;
    case VI: return MAJOR_SIXTH;
    case bVII: return MINOR_SEVENTH;
    case VII: return MAJOR_SEVENTH;
    default: throw new Error();
  }
}
