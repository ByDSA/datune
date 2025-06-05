import type { Pitch } from "../Pitch";
import type { Interval } from "intervals/chromatic";
import { shift } from "./shift";

export function shiftDown(pitch: Pitch, interval: Interval): Pitch {
  return shift(pitch, -interval);
}
