import type { Spn } from "../Spn";
import type { Interval } from "intervals/chromatic";
import { shift } from "./shift";

export function shiftDown(obj: Spn, interval: Interval): Spn | null {
  return shift(obj, -interval);
}
