import { hash as diatonicIntervalHash } from "intervals/diatonic";
import { hash as qualityHash } from "intervals/quality";
import Dto from "./Dto";

export default function hash(dto: Dto): string {
  const qHashCode = qualityHash(dto.quality);
  const diHashCode = diatonicIntervalHash(dto.diatonicInterval);

  return `${diHashCode}${qHashCode}`;
}
