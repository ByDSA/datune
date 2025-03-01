import { HarmonicFunction } from "@datune/core/functions/alt";
import { V7ALT } from "@datune/core/functions/alt/others/constants";

export function stringifyOtherFunction(obj: HarmonicFunction): string {
  switch (obj) {
    case V7ALT: return "V7Alt";
    default: return "undefined name";
  }
}
