import type { DegreeFunc } from "../../degree-function/DegreeFunc";
import type { CompoundFunc } from "../CompoundFunc";
import type { DegreeArray } from "degrees/alt";
import { cache } from "../caching/cache";

export function compose(
  degreeFunc: DegreeFunc,
  ...degreeChain: DegreeArray
): CompoundFunc {
  return cache.getOrCreate( {
    degreeChain,
    degreeFunc,
  } );
}
