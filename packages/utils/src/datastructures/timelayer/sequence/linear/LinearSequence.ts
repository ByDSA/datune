/* eslint-disable accessor-pairs */
import { from as temporalNode, isTemporalNodeConstructorType, TemporalNode } from "../../temporal-node";
import { TimeLayer } from "../../TimeLayer";
import { AddType, GetType, isAddLayerType, isNodesType, isNodeType, RemoveType, SequenceAddListener, SequenceChangeListener, SequenceRemoveListener, TimeLayerConstructorObject } from "../../types";
import { ParallelSequence } from "../parallel/ParallelSequence";
import { Time } from "time";

export class LinearSequence<E> implements TimeLayer<E> {
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

  get nodes(): readonly TemporalNode<E>[] {
    return this.parallelSequence.nodes;
  }

  get duration(): Time {
    return this.parallelSequence.duration;
  }

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

      this.#fixOverlappingNode(node);

      return this.parallelSequence.add(node);
    }

    if (isAddLayerType(obj)) {
      const { nodes } = obj.layer;

      this.#fixOverlappingNodes(...nodes);
    } else if (isNodesType(obj))
      this.#fixOverlappingNodes(...obj);
    else if (isNodeType(obj))
      this.#fixOverlappingNode(obj);

    return this.parallelSequence.add(obj);
  }

  #fixOverlappingNodes(...newNodes: TemporalNode<E>[]) {
    for (const n of newNodes)
      this.#fixOverlappingNode(n);
  }

  #fixOverlappingNode(newNode: TemporalNode<E>) {
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
