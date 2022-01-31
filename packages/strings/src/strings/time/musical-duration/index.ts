import { MusicalDuration, QUARTER } from "@datune/core/time";

export default function stringify(obj: MusicalDuration): string {
  return (+obj / +QUARTER).toString();
}
