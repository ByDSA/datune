import { Arrays } from "@datune/utils";
import { Voicing } from "../DiatonicVoicing";

export function fromRootIntervalInts(...ints: Arrays.Number): Voicing {
  return (Voicing as any).create(...ints);
}
