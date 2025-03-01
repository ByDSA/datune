import { Interval, IntervalDirection } from "@datune/core/intervals/diatonic";
import { ELEVENTH, FIFTEENTH, FIFTH, FOURTEENTH, FOURTH, NINTH, OCTAVE, SECOND, SEVENTH, SIXTH, TENTH, THIRD, THIRTEENTH, TWELFTH, UNISON } from "@datune/core/intervals/symbolic/diatonic/constants";

export function stringifyInterval(obj: Interval): string {
  if (obj.direction === IntervalDirection.DESCENDENT)
    return `-${absName(obj)}`;

  return absName(obj);
}

function absName(obj: Interval): string {
  const absInt = obj.magnitude;

  switch (absInt) {
    case UNISON.magnitude: return "UNISON";
    case SECOND.magnitude: return "SECOND";
    case THIRD.magnitude: return "THIRD";
    case FOURTH.magnitude: return "FOURTH";
    case FIFTH.magnitude: return "FIFTH";
    case SIXTH.magnitude: return "SIXTH";
    case SEVENTH.magnitude: return "SEVENTH";
    case OCTAVE.magnitude: return "OCTAVE";
    case NINTH.magnitude: return "NINTH";
    case TENTH.magnitude: return "TENTH";
    case ELEVENTH.magnitude: return "ELEVENTH";
    case TWELFTH.magnitude: return "TWELFTH";
    case THIRTEENTH.magnitude: return "THIRTEENTH";
    case FOURTEENTH.magnitude: return "FOURTEENTH";
    case FIFTEENTH.magnitude: return "FIFTEENTH";
    default: return `(IntervalDiatonic: ${absInt})`;
  }
}
