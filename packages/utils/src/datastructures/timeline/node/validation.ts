import { isInterval } from "datils/math/intervals";
import { TimelineNode } from "./TimelineNode";

export function isTimelineNode<E>(obj: any): obj is TimelineNode<E> {
  return isInterval(obj.interval) && obj.event !== undefined;
}
