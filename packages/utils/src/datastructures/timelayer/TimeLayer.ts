import { Time } from "../../time";
import { TemporalNode } from "./temporal-node";
import { AddType, GetType, RemoveType, SequenceAddListener, SequenceChangeListener, SequenceRemoveListener } from "./types";

export default interface TimeLayer<E> {
    add(obj: AddType<E>): TemporalNode<E>[];
    remove(obj: RemoveType<E>): TemporalNode<E>[];
    get(obj: GetType): TemporalNode<E>[];
    clear(): void;
    moveNode(node: TemporalNode<E>, time: Time): TemporalNode<E>;
    moveNodeEndTo(node: TemporalNode<E>, time: Time): TemporalNode<E>;

    nodes: readonly TemporalNode<E>[];
    duration: Time;
    startTime: Time;

    onChange(listener: SequenceChangeListener<E>): void;
    onAdd(listener: SequenceAddListener<E>): void;
    onRemove(listener: SequenceRemoveListener<E>): void;
}
