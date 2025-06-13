import { Degree, Degrees } from ".";

export function stringifyDegree(obj: Degree): string {
  switch (+obj) {
    case +Degrees.I:
      return "I";
    case +Degrees.bII:
      return "♭II";
    case +Degrees.II:
      return "II";
    case +Degrees.bIII:
      return "♭III";
    case +Degrees.III:
      return "III";
    case +Degrees.IV:
      return "IV";
    case +Degrees.bV:
      return "bV";
    case +Degrees.V:
      return "V";
    case +Degrees.bVI:
      return "♭VI";
    case +Degrees.VI:
      return "VI";
    case +Degrees.bVII:
      return "♭VII";
    case +Degrees.VII:
      return "VII";
    default:
      throw new Error(`Unknown degree: ${obj}`);
  }
}
