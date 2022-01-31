/* eslint-disable import/prefer-default-export */

import { Arrays } from "@datune/utils";
import DiatonicVoicing from "../DiatonicVoicing";

export function fromRootIntervalInts(...ints: Arrays.Number): DiatonicVoicing {
  return (DiatonicVoicing as any).create(...ints);
}
