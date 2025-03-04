import { MusicalDuration } from "@datune/core/rhythm";
import { QUARTER } from "@datune/core/rhythm/tempo/musical-duration/constants";

export function stringifyMusicalDuration(obj: MusicalDuration): string {
  return (+obj / +QUARTER).toString();
}
