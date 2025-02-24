import { TemporalNode } from "../temporal-node";
import { Time } from "time";

export type NodeType<E> = TemporalNode<E>;

export type NodesType<E> = TemporalNode<E>[];

export function isNodeType<E>(obj: any): obj is NodeType<E> {
  return obj.interval !== undefined && obj.event !== undefined;
}

export function isNodesType<E>(obj: any): obj is NodesType<E> {
  return obj instanceof Array;
}

export type TimeLayerConstructorObject = {
  startTime: Time;
  cellSize: Time;
};
