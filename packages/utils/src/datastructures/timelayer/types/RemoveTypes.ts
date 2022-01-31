import { Time } from "time";
import Interval from "../../../math/interval/Interval";
import { TemporalNode } from "../temporal-node";
import { NodesType, NodeType } from "./types";

export type RemoveNodesAtType = {
  at: Time;
};

export type RemoveNodesAtIntervalType = {
  interval: Interval<Time>;
};

export type RemoveNodesFromToType = {
  from: Time;
  to: Time;
};

export type RemoveNodeType<E> = {
  node: TemporalNode<E>;
};

export type RemoveType<E> =
NodesType<E> | NodeType<E> | RemoveNodesAtIntervalType
| RemoveNodesAtType | RemoveNodesFromToType;

export function isRemoveNodesAtIntervalType(
  obj: RemoveType<any>,
): boolean {
  return "interval" in obj;
}

export function isRemoveNodesAtType(
  obj: RemoveType<any>,
): boolean {
  return "at" in obj && !(obj instanceof Array);
}

export function isRemoveNodesFromToType(obj: RemoveType<any>): boolean {
  return "from" in obj && "to" in obj;
}
