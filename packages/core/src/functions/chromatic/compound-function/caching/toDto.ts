import { CompoundFunction } from "../CompoundFunction";
import type { Dto } from "./Dto";

export function toDto(obj: CompoundFunction): Dto {
  return {
    degreeFunction: obj.degreeFunction,
    degreeChain: obj.degreeChain,
  };
}
