import type { CompoundFunc } from "../CompoundFunc";
import type { Dto } from "./Dto";

export function toDto(obj: CompoundFunc): Dto {
  return {
    degreeFunc: obj.degreeFunc,
    degreeChain: obj.degreeChain,
  };
}
