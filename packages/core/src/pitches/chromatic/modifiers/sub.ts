import type { Pitch } from "../Pitch";
import { add } from "./add";
import type { Interval } from "intervals/chromatic";

export function sub(obj: Pitch, interval: Interval): Pitch {
  return add(obj, -interval);
}
