import { Arrays } from "@datune/utils";
import { Voicing } from "../Voicing";

export function fromRootIntervalInts(...ints: Arrays.Number): Voicing {
  return (Voicing as any).create(...ints);
}
