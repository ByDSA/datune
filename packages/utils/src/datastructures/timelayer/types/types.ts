import { ImmutableTime } from "index";
import TemporalNode from "../TemporalNode";

export type NodeType<E, T extends ImmutableTime> = TemporalNode<E, T>;

export type NodesType<E, T extends ImmutableTime> = TemporalNode<E, T>[];

export function isNodeType(obj: any): boolean {
  return obj instanceof TemporalNode;
}

export function isNodesType(obj: any): boolean {
  return obj instanceof Array;
}

export type TimeLayerConstructorObject<T extends ImmutableTime> = {
  startTime: T;
  cellSize: T;
};
