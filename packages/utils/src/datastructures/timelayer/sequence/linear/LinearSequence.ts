import TemporalNode from "datastructures/timelayer/TemporalNode";
import TimeLayer from "datastructures/timelayer/TimeLayer";
import { AddLayerType, AddType, GetType, isAddLayerType, isNodesType, NodesType, RemoveType, SequenceAddListener, SequenceChangeListener, SequenceRemoveListener, TimeLayerConstructorObject } from "datastructures/timelayer/types";
import { ImmutableTime } from "../../../../time/ImmutableTime";
import ParallelSequence from "../parallel/ParallelSequence";

export default class LinearSequence<E, T extends ImmutableTime> implements TimeLayer<E, T> {
  private parallelSequence: ParallelSequence<E, T>;

  constructor(obj: TimeLayerConstructorObject<T>) {
    this.parallelSequence = new ParallelSequence(obj);
  }

  remove(obj: RemoveType<E, T>): TemporalNode<E, T>[] {
    return this.parallelSequence.remove(obj);
  }

  get(obj: GetType<T>): TemporalNode<E, T>[] {
    return this.parallelSequence.get(obj);
  }

  clear(): void {
    return this.parallelSequence.clear();
  }

  moveNodeBeginTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T> {
    return this.parallelSequence.moveNodeBeginTo(node, time);
  }

  moveNodeEndTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T> {
    return this.parallelSequence.moveNodeEndTo(node, time);
  }

  // eslint-disable-next-line accessor-pairs
  get nodes(): readonly TemporalNode<E, T>[] {
    return this.parallelSequence.nodes;
  }

  // eslint-disable-next-line accessor-pairs
  get duration(): T {
    return this.parallelSequence.duration;
  }

  onChange(listener: SequenceChangeListener<E, T>): void {
    this.parallelSequence.onChange(listener);
  }

  onAdd(listener: SequenceAddListener<E, T>): void {
    this.parallelSequence.onAdd(listener);
  }

  onRemove(listener: SequenceRemoveListener<E, T>): void {
    this.parallelSequence.onRemove(listener);
  }

  add(obj: AddType<E, T>): TemporalNode<E, T>[] {
    if (isAddLayerType(obj)) {
      const { nodes } = (obj as AddLayerType<E, T>).layer;

      this._fixOverlappingNodes(...nodes);
    }

    if (isNodesType(obj)) {
      const nodes = obj as NodesType<E, T>;

      this._fixOverlappingNodes(...nodes);
    }

    return this.parallelSequence.add(obj);
  }

  private _fixOverlappingNodes(...nodes: TemporalNode<E, T>[]) {
    for (const n of nodes)
      this._fixOverlappingNode(n);
  }

  private _fixOverlappingNode(node: TemporalNode<E, T>) {
    const previousNodes = this.get( {
      interval: node.interval,
    } );

    for (const n of previousNodes) {
      if (n.from >= node.from && n.to <= node.to)
        this.remove(n);
      else if (n.from < node.from && n.to <= node.to)
        n.to = node.from;
      else if (n.from >= node.from && n.to > node.to)
        n.from = node.to;
      else {
        const secondHalf = n.duplicate();

        secondHalf.from = node.to;
        const firstHalf = n;

        firstHalf.to = node.from;
        this.add(secondHalf);
      }
    }
  }
}
