import type { TimelineNode } from "./TimelineNode";
import { stringifyInterval } from "datils/math/intervals";

export function stringify<E>(node: TimelineNode<E>): string {
  return `${stringifyInterval(node.interval)}: ${node.event}`;
}
