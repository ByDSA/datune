import { Funcs as F } from "@datune/core/alt";
import { CompoundFunc } from "@datune/core/functions/alt/compound-function/CompoundFunc";
import { stringifyDegree } from "strings/degrees/alt";
import { stringifyDegreeFunc } from "strings/functions/alt/degree-function";

export function stringifyCompoundFunc(obj: CompoundFunc): string {
  switch (obj) {
    case F.V_II: return "V/II";
    case F.V_III: return "V/III";
    case F.V_IV: return "V/IV";
    case F.V_V: return "V/V";
    case F.V_VI: return "V/VI";
    case F.V7_II: return "V7/II";
    case F.V7_III: return "V7/III";
    case F.V7_IV: return "V7/IV";
    case F.V7_V: return "V7/V";
    case F.V7_VI: return "V7/VI";
    default: return defaultToString(obj);
  }
}

function defaultToString(func: CompoundFunc): string {
  const degreeFuncStr = stringifyDegreeFunc(func.degreeFunc);
  const degreeChainStr = func.degreeChain.map(stringifyDegree).join("/");

  return `${degreeFuncStr}/${degreeChainStr}`;
}
