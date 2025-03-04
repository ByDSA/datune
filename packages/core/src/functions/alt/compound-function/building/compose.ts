import type { DegreeFunction } from "../../degree-function/DegreeFunction";
import type { CompoundFunction } from "../CompoundFunction";
import type { DegreeArray } from "degrees/alt";
import { cache } from "../caching/cache";

export function compose(
  degreeFunction: DegreeFunction,
  ...degreeChain: DegreeArray
): CompoundFunction {
  return cache.getOrCreate( {
    degreeChain,
    degreeFunction,
  } );
}
