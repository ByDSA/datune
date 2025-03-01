import { HarmonicFunction } from "@datune/core/functions/chromatic";
import { V7ALT } from "@datune/core/functions/chromatic/others/constants";

export function stringifyOtherFunction(obj: HarmonicFunction): string {
  switch (obj) {
    case V7ALT: return "V7Alt";
    default: return String(obj);
  }
}
