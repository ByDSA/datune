import { EventFromToType } from "../temporal-node";
import TimeLayer from "../TimeLayer";
import { NodesType, NodeType } from "./types";
import { Time } from "time";

export type AddLayerType<E> = {
  layer: TimeLayer<E>;
  at?: Time;
};

export type AddType<E> =
AddLayerType<E> | EventFromToType<E> | NodesType<E> | NodeType<E>;

export function isAddLayerType<E>(obj: AddType<E>): obj is AddLayerType<E> {
  return "layer" in obj;
}
