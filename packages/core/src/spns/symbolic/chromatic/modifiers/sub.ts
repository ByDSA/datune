import type { SPN } from "../SPN";
import type { Interval } from "intervals/chromatic";
import { add } from "./add";

export function sub(obj: SPN, interval: Interval): SPN | null {
  return add(obj, -interval);
}
