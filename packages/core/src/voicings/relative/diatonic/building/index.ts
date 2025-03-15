import type { Arrays } from "@datune/utils";
import { Voicing } from "../Voicing";

export type Key = Arrays.Number;

export function fromRootIntervalInts(...ints: Arrays.Number): Voicing {
  const key: Key = ints;

  return new (Voicing as any)(key);
}
