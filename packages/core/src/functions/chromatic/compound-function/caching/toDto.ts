import type { Dto } from "./Dto";
import { CompoundFunc } from "../CompoundFunc";

export function toDto(obj: CompoundFunc): Dto {
  return {
    degreeFunc: obj.degreeFunc,
    degreeChain: obj.degreeChain,
  };
}
