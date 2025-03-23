import { Func } from "@datune/core/functions/chromatic";
import { Funcs as F } from "@datune/core/functions/chromatic";

export function stringifyOtherFunc(obj: Func): string {
  switch (obj) {
    case F.V7ALT: return "V7Alt";
    default: return String(obj);
  }
}
