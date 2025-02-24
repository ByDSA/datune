import { Direction, ELEVENTH, FIFTEENTH, FIFTH, FOURTEENTH, FOURTH, Interval as IntervalDiatonic, NINTH, OCTAVE, SECOND, SEVENTH, SIXTH, TENTH, THIRD, THIRTEENTH, TWELFTH, UNISON } from "@datune/core/intervals/diatonic";

export default function toString(obj: IntervalDiatonic): string {
  if (obj.direction === Direction.DESCENDENT)
    return `-${absName(obj)}`;

  return absName(obj);
}

function absName(obj: IntervalDiatonic): string {
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
