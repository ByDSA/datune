import { CompoundFunc } from "@datune/core/functions/chromatic/compound-function/CompoundFunc";
import { DegreeFunc } from "@datune/core/functions/chromatic/degree-function/DegreeFunc";
import { Func } from "@datune/core/functions/chromatic";
import { stringifyCompoundFunc } from "./compound-function";
import { stringifyDegreeFunc } from "./degree-function";
import { stringifyOtherFunc } from "./others";

export function stringifyFunc(func: Func): string {
  if (func instanceof DegreeFunc)
    return stringifyDegreeFunc(func);

  if (func instanceof CompoundFunc)
    return stringifyCompoundFunc(func);

  return stringifyOtherFunc(func);
}
