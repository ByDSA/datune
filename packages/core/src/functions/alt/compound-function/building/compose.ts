import type { DegreeFunction } from "../../degree-function/DegreeFunction";
import { cache } from "../caching/cache";
import type { CompoundFunction } from "../CompoundFunction";
import type { DegreeArray } from "degrees/alt";

export function compose(
  degreeFunction: DegreeFunction,
  ...degreeChain: DegreeArray
): CompoundFunction {
  return cache.getOrCreate( {
    degreeChain,
    degreeFunction,
  } );
}
