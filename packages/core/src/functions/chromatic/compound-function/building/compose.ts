import type { DegreeFunction } from "../../degree-function/DegreeFunction";
import { cache } from "../caching/cache";
import { CompoundFunction } from "../CompoundFunction";
import { DegreeArray } from "degrees/chromatic";

export function compose(
  degreeFunction: DegreeFunction,
  ...degreeChain: DegreeArray
): CompoundFunction {
  return cache.getOrCreate( {
    degreeChain,
    degreeFunction,
  } );
}
