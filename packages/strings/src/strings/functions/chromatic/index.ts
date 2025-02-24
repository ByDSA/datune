import { CompoundFunction, DegreeFunction, HarmonicFunction } from "@datune/core/functions/chromatic";
import stringifyCompoundFunction from "./compound-function";
import stringifyDegreeFunction from "./degree-function";
import stringifyOtherFunction from "./others";

export default function stringify(harmonicFunction: HarmonicFunction): string {
  if (harmonicFunction instanceof DegreeFunction)
    return stringifyDegreeFunction(harmonicFunction);

  if (harmonicFunction instanceof CompoundFunction)
    return stringifyCompoundFunction(harmonicFunction);

  return stringifyOtherFunction(harmonicFunction);
}
