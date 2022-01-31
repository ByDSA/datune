import { Interval } from "intervals/chromatic";
import SPN from "../SPN";
import add from "./add";

export default function sub(obj: SPN, interval: Interval): SPN | null {
  return add(obj, -interval);
}
