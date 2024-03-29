import { Time } from "time";
import { from as temporalNode, isTemporalNodeConstructorType, TemporalNode } from "../../temporal-node";
import TimeLayer from "../../TimeLayer";
import { AddType, GetType, isAddLayerType, isNodesType, isNodeType, RemoveType, SequenceAddListener, SequenceChangeListener, SequenceRemoveListener, TimeLayerConstructorObject } from "../../types";
import ParallelSequence from "../parallel/ParallelSequence";

export default class LinearSequence<E> implements TimeLayer<E> {
  private parallelSequence: ParallelSequence<E>;

  constructor(obj: TimeLayerConstructorObject) {
    this.parallelSequence = new ParallelSequence(obj);
  }

  remove(obj: RemoveType<E>): TemporalNode<E>[] {
    return this.parallelSequence.remove(obj);
  }

  get(obj: GetType): TemporalNode<E>[] {
    return this.parallelSequence.get(obj);
  }

  clear(): void {
    return this.parallelSequence.clear();
  }

  moveNode(node: TemporalNode<E>, time: Time): TemporalNode<E> {
    return this.parallelSequence.moveNode(node, time);
  }

  moveNodeEndTo(node: TemporalNode<E>, time: Time): TemporalNode<E> {
    return this.parallelSequence.moveNodeEndTo(node, time);
  }

  // eslint-disable-next-line accessor-pairs
  get nodes(): readonly TemporalNode<E>[] {
    return this.parallelSequence.nodes;
  }

  // eslint-disable-next-line accessor-pairs
  get duration(): Time {
    return this.parallelSequence.duration;
  }

  // eslint-disable-next-line accessor-pairs
  get startTime(): Time {
    return this.parallelSequence.startTime;
  }

  onChange(listener: SequenceChangeListener<E>): void {
    this.parallelSequence.onChange(listener);
  }

  onAdd(listener: SequenceAddListener<E>): void {
    this.parallelSequence.onAdd(listener);
  }

  onRemove(listener: SequenceRemoveListener<E>): void {
    this.parallelSequence.onRemove(listener);
  }

  add(obj: AddType<E>): TemporalNode<E>[] {
    if (isTemporalNodeConstructorType(obj)) {
      const node = temporalNode(obj);

      this._fixOverlappingNode(node);

      return this.parallelSequence.add(node);
    }

    if (isAddLayerType(obj)) {
      const { nodes } = obj.layer;

      this._fixOverlappingNodes(...nodes);
    } else if (isNodesType(obj))
      this._fixOverlappingNodes(...obj);
    else if (isNodeType(obj))
      this._fixOverlappingNode(obj);

    return this.parallelSequence.add(obj);
  }

  private _fixOverlappingNodes(...newNodes: TemporalNode<E>[]) {
    for (const n of newNodes)
      this._fixOverlappingNode(n);
  }

  private _fixOverlappingNode(newNode: TemporalNode<E>) {
    const oldNodes = this.get( {
      interval: newNode.interval,
    } );

    for (const oldNode of oldNodes) {
      if (isTotalOverlapping(oldNode, newNode))
        this.remove(oldNode);
      else if (isRightOverlapping(oldNode, newNode)) {
        this.remove(oldNode);
        const newOldNode = {
          event: oldNode.event,
          from: oldNode.interval.from,
          to: newNode.interval.from,
        };

        this.add(newOldNode);
      } else if (isLeftOverlapping(oldNode, newNode)) {
        this.remove(oldNode);
        const newOldNode = {
          event: oldNode.event,
          from: newNode.interval.to,
          to: oldNode.interval.to,
        };

        this.add(newOldNode);
      } else if (isSubOverlapping(oldNode, newNode)) {
        this.remove(oldNode);
        const firstHalf = {
          event: oldNode.event,
          from: oldNode.interval.from,
          to: newNode.interval.from,
        };
        const secondHalf = {
          event: oldNode.event,
          from: newNode.interval.to,
          to: oldNode.interval.to,
        };

        this.add(firstHalf);
        this.add(secondHalf);
      }
    }
  }
}

function isLeftOverlapping<E>(oldNode: TemporalNode<E>, newNode: TemporalNode<E>): boolean {
  return oldNode.interval.from >= newNode.interval.from
  && oldNode.interval.to > newNode.interval.to;
}

function isRightOverlapping<E>(oldNode: TemporalNode<E>, newNode: TemporalNode<E>): boolean {
  return oldNode.interval.from < newNode.interval.from
  && oldNode.interval.to <= newNode.interval.to;
}

function isTotalOverlapping<E>(oldNode: TemporalNode<E>, newNode: TemporalNode<E>): boolean {
  return newNode.interval.from < oldNode.interval.from
  && newNode.interval.to > oldNode.interval.to;
}

function isSubOverlapping<E>(oldNode: TemporalNode<E>, newNode: TemporalNode<E>): boolean {
  return newNode.interval.from > oldNode.interval.from
  && newNode.interval.to < oldNode.interval.to;
}
