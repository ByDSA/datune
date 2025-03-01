import { ConcertPitch } from "@datune/core/concert-pitches/chromatic";
import { stringifySpn } from "strings/spns/chromatic";

export function stringifyConcertPitch(obj: ConcertPitch): string {
  return `${stringifySpn(obj.spn)}-${obj.frequency}`;
}
