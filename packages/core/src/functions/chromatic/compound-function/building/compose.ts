import { DegreeArray } from "degrees/chromatic";
import { DegreeFunction } from "../../degree-function/DegreeFunction";
import { cache } from "../caching/cache";
import { CompoundFunction } from "../CompoundFunction";

export function compose(
  degreeFunction: DegreeFunction,
  ...degreeChain: DegreeArray
): CompoundFunction {
  return cache.getOrCreate( {
    degreeChain,
    degreeFunction,
  } );
}
