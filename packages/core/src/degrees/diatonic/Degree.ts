
export default class DiatonicDegree {
  private intValue: number;

  private constructor(intValue: number) {
    this.intValue = intValue;
  }

  valueOf(): number {
    return this.intValue;
  }

  toString(): string {
    switch (+this) {
      case 0: return "I";
      case 1: return "II";
      case 2: return "III";
      case 3: return "IV";
      case 4: return "V";
      case 5: return "VI";
      case 6: return "VII";
      default: return "[DiatonicDegree]";
    }
  }
}
