import { Degree, Degrees } from ".";

export function stringifyDegree(obj: Degree): string {
  switch (+obj) {
    case +Degrees.I:
      return "I";
    case +Degrees.bII:
      return "bII";
    case +Degrees.II:
      return "II";
    case +Degrees.bIII:
      return "bIII";
    case +Degrees.III:
      return "III";
    case +Degrees.IV:
      return "IV";
    case +Degrees.bV:
      return "bV";
    case +Degrees.V:
      return "V";
    case +Degrees.bVI:
      return "bVI";
    case +Degrees.VI:
      return "VI";
    case +Degrees.bVII:
      return "bVII";
    case +Degrees.VII:
      return "VII";
    default:
      throw new Error(`Unknown degree: ${obj}`);
  }
}
