import CompoundFunction from "../CompoundFunction";
import Dto from "./Dto";

export default function toDto(obj: CompoundFunction): Dto {
  return {
    degreeFunction: obj.degreeFunction,
    degreeChain: obj.degreeChain,
  };
}
