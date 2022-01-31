import { dtoHash as spnHash } from "spns/chromatic";
import Dto from "./Dto";

export default function hash(dto: Dto): string {
  const absPitchHashCode: any = spnHash(dto.spn);

  return `${absPitchHashCode}:${dto.frequency}`;
}
