/* eslint-disable accessor-pairs */
import type { TimelineNode } from "../..";
import type { Timeline } from "../Timeline";
import { Interval, intervalBetween } from "datils/math/intervals";
import { Time } from "time";
import { ParallelTimeline } from "../parallel/Parallel";
import { Props } from "../props";
import { ISequentialTimeline } from "./Interface";

export class SequentialTimeline<E> implements ISequentialTimeline<E> {
  #parallelTimeline: ParallelTimeline<E>;

  constructor(props: Props) {
    this.#parallelTimeline = new ParallelTimeline(props);
  }

  add(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    const added: TimelineNode<E>[] = [];

    for (const n of nodes) {
      this.#fixOverlappingNode(n);

      added.push(
        ...this.#parallelTimeline.add(n),
      );
    }

    return added;
  }

  addTimeline(layer: Timeline<E>, at?: Time): TimelineNode<E>[] {
    // TODO: fix overloap
    return this.#parallelTimeline.addTimeline(layer, at);
  }

  removeAt(at: Time): TimelineNode<E> | undefined {
    const removedNodes = this.#parallelTimeline.removeAt(at);

    if (removedNodes.length > 1)
      throw ERROR_SEQUENTIAL_INCONSISTENCY;

    return removedNodes[0];
  }

  removeAtInterval(interval: Interval<Time>): TimelineNode<E>[] {
    return this.#parallelTimeline.removeAtInterval(interval);
  }

  getAtInterval(interval: Interval<Time>): TimelineNode<E>[] {
    return this.#parallelTimeline.getAtInterval(interval);
  }

  remove(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    const removedNodes = this.#parallelTimeline.remove(...nodes);

    if (removedNodes.length > nodes.length)
      throw ERROR_SEQUENTIAL_INCONSISTENCY;

    return removedNodes;
  }

  getAt(time: Time): TimelineNode<E> | undefined {
    const gotNodes = this.#parallelTimeline.getAt(time);

    if (gotNodes.length > 1)
      throw ERROR_SEQUENTIAL_INCONSISTENCY;

    return gotNodes[0];
  }

  extendNode(node: TimelineNode<E>, interval: Partial<Interval<Time>>): TimelineNode<E> {
    this.#fixOverlappingNode( {
      ...node,
      interval: {
        ...node.interval,
        ...interval,
      },
    } );

    return this.#parallelTimeline.extendNode(node, interval);
  }

  clear(): void {
    return this.#parallelTimeline.clear();
  }

  moveNode(node: TimelineNode<E>, time: Time): TimelineNode<E> {
    return this.#parallelTimeline.moveNode(node, time);
  }

  moveNodeEndTo(node: TimelineNode<E>, time: Time): TimelineNode<E> {
    return this.#parallelTimeline.moveNodeEndTo(node, time);
  }

  get nodes(): readonly TimelineNode<E>[] {
    return this.#parallelTimeline.nodes;
  }

  get duration(): Time {
    return this.#parallelTimeline.duration;
  }

  get startTime(): Time {
    return this.#parallelTimeline.startTime;
  }

  #fixOverlappingNode(newNode: TimelineNode<E>) {
    const oldNodes = this.getAtInterval(newNode.interval);

    for (const oldNode of oldNodes) {
      if (isTotalOverlapping(oldNode, newNode))
        this.remove(oldNode);
      else if (isRightOverlapping(oldNode, newNode)) {
        this.#parallelTimeline.extendNode(oldNode, {
          to: newNode.interval.from,
        } );
      } else if (isLeftOverlapping(oldNode, newNode)) {
        this.#parallelTimeline.extendNode(oldNode, {
          from: newNode.interval.to,
        } );
      } else if (isSubOverlapping(oldNode, newNode)) {
        this.#parallelTimeline.extendNode(oldNode, {
          to: newNode.interval.from,
        } );
        const secondHalf = {
          event: oldNode.event,
          interval: intervalBetween(
            newNode.interval.to,
            oldNode.interval.to,
          ),
        };

        this.add(secondHalf);
      }
    }
  }

  get cellSize() {
    return this.#parallelTimeline.cellSize;
  }
}

function isLeftOverlapping<E>(oldNode: TimelineNode<E>, newNode: TimelineNode<E>): boolean {
  return oldNode.interval.from >= newNode.interval.from
  && oldNode.interval.to > newNode.interval.to;
}

function isRightOverlapping<E>(oldNode: TimelineNode<E>, newNode: TimelineNode<E>): boolean {
  return oldNode.interval.from < newNode.interval.from
  && oldNode.interval.to <= newNode.interval.to;
}

function isTotalOverlapping<E>(oldNode: TimelineNode<E>, newNode: TimelineNode<E>): boolean {
  return newNode.interval.from <= oldNode.interval.from
  && newNode.interval.to >= oldNode.interval.to;
}

function isSubOverlapping<E>(oldNode: TimelineNode<E>, newNode: TimelineNode<E>): boolean {
  return newNode.interval.from > oldNode.interval.from
  && newNode.interval.to < oldNode.interval.to;
}

const ERROR_SEQUENTIAL_INCONSISTENCY = new Error("Sequential timeline inconsistency");
