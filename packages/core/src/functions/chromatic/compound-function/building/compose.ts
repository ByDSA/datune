import type { DegreeFunction } from "../../degree-function/DegreeFunction";
import { DegreeArray } from "degrees/chromatic";
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
