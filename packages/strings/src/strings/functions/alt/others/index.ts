import { Func } from "@datune/core/functions/alt";
import { V7ALT } from "@datune/core/functions/alt/others/constants";

export function stringifyOtherFunc(func: Func): string {
  switch (func) {
    case V7ALT: return "V7Alt";
    default: return "undefined name";
  }
}
