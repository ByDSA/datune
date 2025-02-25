import { Array as DegreeArray } from "degrees/chromatic";
import { DegreeFunction } from "../../degree-function";
import { cache } from "../caching";
import CompoundFunction from "../CompoundFunction";

export default function from(
  degreeFunction: DegreeFunction,
  ...degreeChain: DegreeArray
): CompoundFunction {
  return cache.getOrCreate( {
    degreeChain,
    degreeFunction,
  } );
}
