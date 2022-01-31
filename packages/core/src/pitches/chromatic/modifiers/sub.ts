import { Interval } from "intervals/chromatic";
import Chromatic from "../Pitch";
import add from "./add";

export default function sub(obj: Chromatic, interval: Interval): Chromatic {
  return add(obj, -interval);
}
