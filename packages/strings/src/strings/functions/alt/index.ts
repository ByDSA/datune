import { CompoundFunction } from "@datune/core/functions/alt/compound-function/CompoundFunction";
import { HarmonicFunction } from "@datune/core/functions/alt";
import { DegreeFunction } from "@datune/core/functions/alt/degree-function/DegreeFunction";
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
