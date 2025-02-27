import Chromatic from "../Pitch";
import add from "./add";
import { Interval } from "intervals/chromatic";

export default function sub(obj: Chromatic, interval: Interval): Chromatic {
  return add(obj, -interval);
}
