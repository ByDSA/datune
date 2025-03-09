import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/chromatic";
import { add } from "./add";

export function sub(pitch: Pitch, interval: Interval): Pitch {
  return add(pitch, -interval);
}
