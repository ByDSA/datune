import { Interval, IntervalDirection } from "@datune/core/intervals/diatonic";
import { Intervals as I } from "@datune/core/diatonic";

export function stringifyInterval(obj: Interval): string {
  if (obj.direction === IntervalDirection.DESCENDENT)
    return `-${absName(obj)}`;

  return absName(obj);
}

function absName(obj: Interval): string {
  const absInt = obj.magnitude;

  switch (absInt) {
    case I.UNISON.magnitude: return "UNISON";
    case I.SECOND.magnitude: return "SECOND";
    case I.THIRD.magnitude: return "THIRD";
    case I.FOURTH.magnitude: return "FOURTH";
    case I.FIFTH.magnitude: return "FIFTH";
    case I.SIXTH.magnitude: return "SIXTH";
    case I.SEVENTH.magnitude: return "SEVENTH";
    case I.OCTAVE.magnitude: return "OCTAVE";
    case I.NINTH.magnitude: return "NINTH";
    case I.TENTH.magnitude: return "TENTH";
    case I.ELEVENTH.magnitude: return "ELEVENTH";
    case I.TWELFTH.magnitude: return "TWELFTH";
    case I.THIRTEENTH.magnitude: return "THIRTEENTH";
    case I.FOURTEENTH.magnitude: return "FOURTEENTH";
    case I.FIFTEENTH.magnitude: return "FIFTEENTH";
    default: return `(DiatonicInterval: ${absInt})`;
  }
}
