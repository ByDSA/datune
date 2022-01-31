import Dto from "./Dto";

export default function hashCode(obj: Dto): string {
  return `${+obj.diatonicDegree}:${obj.alts}`;
}
