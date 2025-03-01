import { TemporalNode } from "../TemporalNode";
import { isInterval } from "math/interval/guards";

export function isTemporalNode<E>(obj: any): obj is TemporalNode<E> {
  return isInterval(obj.interval) && obj.event !== undefined;
}
