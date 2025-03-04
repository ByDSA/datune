import type { Dto } from "./Dto";
import { CompoundFunction } from "../CompoundFunction";

export function toDto(obj: CompoundFunction): Dto {
  return {
    degreeFunction: obj.degreeFunction,
    degreeChain: obj.degreeChain,
  };
}
