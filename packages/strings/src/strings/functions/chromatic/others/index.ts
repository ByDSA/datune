import { Func } from "@datune/core/functions/chromatic";
import { V7ALT } from "@datune/core/functions/chromatic/others/constants";

export function stringifyOtherFunc(obj: Func): string {
  switch (obj) {
    case V7ALT: return "V7Alt";
    default: return String(obj);
  }
}
