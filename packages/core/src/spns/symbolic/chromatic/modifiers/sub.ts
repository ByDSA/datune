import type { SPN } from "../SPN";
import { add } from "./add";
import type { Interval } from "intervals/chromatic";

export function sub(obj: SPN, interval: Interval): SPN | null {
  return add(obj, -interval);
}
