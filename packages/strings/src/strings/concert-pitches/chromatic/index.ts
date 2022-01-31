import { ConcertPitch } from "concert-pitches/chromatic";
import spnStringify from "strings/spns/chromatic";

export default function stringify(obj: ConcertPitch): string {
  return `${spnStringify(obj.spn)}-${obj.frequency}`;
}
