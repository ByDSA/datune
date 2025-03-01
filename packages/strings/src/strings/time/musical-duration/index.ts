import { MusicalDuration } from "@datune/core/time";
import { QUARTER } from "@datune/core/time/symbolic/musical-duration/constants";

export function stringifyMusicalDuration(obj: MusicalDuration): string {
  return (+obj / +QUARTER).toString();
}
