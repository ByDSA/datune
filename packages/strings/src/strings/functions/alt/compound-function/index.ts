/* eslint-disable import/prefer-default-export */
import { CompoundFunction, V7_II, V7_III, V7_IV, V7_V, V7_VI, V_II, V_III, V_IV, V_V, V_VI } from "@datune/core/functions/alt";
import degreeStringify from "strings/degrees/alt";
import degreeFunctionStringify from "strings/functions/alt/degree-function";

export default function stringify(obj: CompoundFunction): string {
  switch (obj) {
    case V_II: return "V/II";
    case V_III: return "V/III";
    case V_IV: return "V/IV";
    case V_V: return "V/V";
    case V_VI: return "V/VI";
    case V7_II: return "V7/II";
    case V7_III: return "V7/III";
    case V7_IV: return "V7/IV";
    case V7_V: return "V7/V";
    case V7_VI: return "V7/VI";
    default: return defaultToString(obj);
  }
}

function defaultToString(func: CompoundFunction): string {
  const degreeFunctionStr = degreeFunctionStringify(func.degreeFunction);
  const degreeChainStr = func.degreeChain.map(degreeStringify).join("/");

  return `${degreeFunctionStr}/${degreeChainStr}`;
}
