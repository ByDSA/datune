import { isInterval } from "math/interval/guards";
import TemporalNode from "../TemporalNode";

/* eslint-disable import/prefer-default-export */
export function isTemporalNode<E>(obj: any): obj is TemporalNode<E> {
  return isInterval(obj.interval) && obj.event !== undefined;
}
