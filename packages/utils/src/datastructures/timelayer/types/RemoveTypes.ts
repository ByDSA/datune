import Interval from "../../../math/interval/Interval";
import { ImmutableTime } from "../../../time/ImmutableTime";
import TemporalNode from "../TemporalNode/TemporalNode";
import { NodesType, NodeType } from "./types";

export type RemoveNodesAtType<T extends ImmutableTime> = {
  at: T;
};

export type RemoveNodesAtIntervalType<T extends ImmutableTime> = {
  interval: Interval<T>;
};

export type RemoveNodesFromToType<T extends ImmutableTime> = {
  from: T;
  to: T;
};

export type RemoveNodeType<E, T extends ImmutableTime> = {
  node: TemporalNode<E, T>;
};

export type RemoveType<E, T extends ImmutableTime> =
NodesType<E, T> | NodeType<E, T> | RemoveNodesAtIntervalType<T>
| RemoveNodesAtType<T> | RemoveNodesFromToType<T>;

export function isRemoveNodesAtIntervalType<T extends ImmutableTime>(
  obj: RemoveType<any, T>,
): boolean {
  return "interval" in obj;
}

export function isRemoveNodesAtType<T extends ImmutableTime>(
  obj: RemoveType<any, T>,
): boolean {
  return "at" in obj && !(obj instanceof Array);
}

export function isRemoveNodesFromToType(obj: RemoveType<any, any>): boolean {
  return "from" in obj && "to" in obj;
}
