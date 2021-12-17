import { ImmutableTime } from "../../time/ImmutableTime";
import TemporalNode from "./TemporalNode/TemporalNode";
import { AddType, GetType, RemoveType, SequenceAddListener, SequenceChangeListener, SequenceRemoveListener } from "./types";

export default interface TimeLayer<E, T extends ImmutableTime> {
    add(obj: AddType<E, T>): TemporalNode<E, T>[];
    remove(obj: RemoveType<E, T>): TemporalNode<E, T>[];
    get(obj: GetType<T>): TemporalNode<E, T>[];
    clear(): void;
    moveNodeBeginTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T>;
    moveNodeEndTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T>;

    nodes: readonly TemporalNode<E, T>[];
    duration: T;

    onChange(listener: SequenceChangeListener<E, T>): void;
    onAdd(listener: SequenceAddListener<E, T>): void;
    onRemove(listener: SequenceRemoveListener<E, T>): void;
}
