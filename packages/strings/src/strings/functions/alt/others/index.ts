import { Func } from "@datune/core/functions/alt";
import { Funcs as F } from "@datune/core/alt";

export function stringifyOtherFunc(func: Func): string {
  switch (func) {
    case F.V7ALT: return "V7Alt";
    default: return "undefined name";
  }
}
