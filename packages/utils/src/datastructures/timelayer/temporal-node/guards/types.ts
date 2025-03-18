import { isInterval } from "datils/math/interval/guards";
import { TemporalNode } from "../TemporalNode";

export function isTemporalNode<E>(obj: any): obj is TemporalNode<E> {
  return isInterval(obj.interval) && obj.event !== undefined;
}
