import type { Spn } from "../Spn";
import type { Interval } from "intervals/chromatic";
import { add } from "./add";

export function sub(obj: Spn, interval: Interval): Spn | null {
  return add(obj, -interval);
}
