import { hash as intervalHash } from "intervals/chromatic";
import Voicing from "../Voicing";

export default function hashCode(obj: Voicing): string {
  return `(${obj.rootIntervals.map(intervalHash).join("-")})`;
}
