import { ImmutableTime } from "../../../time/ImmutableTime";
import { EventFromToType } from "../TemporalNode";
import TimeLayer from "../TimeLayer";
import { NodesType, NodeType } from "./types";

export type AddLayerType<E, T extends ImmutableTime> = { layer: TimeLayer<E, T>; at: T };

export type AddType<E, T extends ImmutableTime> =
AddLayerType<E, T> | EventFromToType<E, T> | NodesType<E, T> | NodeType<E, T>;

export function isAddLayerType<E, T extends ImmutableTime>(obj: AddType<E, T>): boolean {
  return "layer" in obj && "at" in obj;
}
