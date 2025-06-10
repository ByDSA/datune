import { Degree, Degrees } from "diatonic";

export function stringifyDegree(obj: Degree): string {
  switch (+obj) {
    case +Degrees.I:
      return "I";
    case +Degrees.II:
      return "II";
    case +Degrees.III:
      return "III";
    case +Degrees.IV:
      return "IV";
    case +Degrees.V:
      return "V";
    case +Degrees.VI:
      return "VI";
    case +Degrees.VII:
      return "VII";
    default:
      throw new Error(`Unknown degree: ${obj}`);
  }
}
