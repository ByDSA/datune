import type { DegreeFunc } from "../../degree-function/DegreeFunc";
import { DegreeArray } from "degrees/chromatic";
import { cache } from "../caching/cache";
import { CompoundFunc } from "../CompoundFunc";

export function compose(
  degreeFunc: DegreeFunc,
  ...degreeChain: DegreeArray
): CompoundFunc {
  return cache.getOrCreate( {
    degreeChain,
    degreeFunc: degreeFunc,
  } );
}
