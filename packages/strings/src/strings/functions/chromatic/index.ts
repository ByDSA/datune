import { CompoundFunction } from "@datune/core/functions/chromatic/compound-function/CompoundFunction";
import { DegreeFunction } from "@datune/core/functions/chromatic/degree-function/DegreeFunction";
import { HarmonicFunction } from "@datune/core/functions/chromatic";
import { stringifyCompoundFunction } from "./compound-function";
import { stringifyDegreeFunction } from "./degree-function";
import { stringifyOtherFunction } from "./others";

export function stringifyHarmonicFunction(harmonicFunction: HarmonicFunction): string {
  if (harmonicFunction instanceof DegreeFunction)
    return stringifyDegreeFunction(harmonicFunction);

  if (harmonicFunction instanceof CompoundFunction)
    return stringifyCompoundFunction(harmonicFunction);

  return stringifyOtherFunction(harmonicFunction);
}
