import { DegreeFunction } from "../../degree-function/DegreeFunction";
import { cache } from "../caching";
import CompoundFunction from "../CompoundFunction";
import { DegreeArray } from "degrees/alt";

export function compose(
  degreeFunction: DegreeFunction,
  ...degreeChain: DegreeArray
): CompoundFunction {
  return cache.getOrCreate( {
    degreeChain,
    degreeFunction,
  } );
}
