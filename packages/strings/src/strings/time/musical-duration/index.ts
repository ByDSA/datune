import { MusicalDuration } from "@datune/core/rhythm";
import { MusicalDurations as MD } from "@datune/core";

export function stringifyMusicalDuration(obj: MusicalDuration): string {
  return (+obj / +MD.QUARTER).toString();
}
