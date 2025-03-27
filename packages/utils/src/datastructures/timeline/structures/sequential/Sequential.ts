/* eslint-disable accessor-pairs */
import type { TimelineNode } from "../..";
import type { Timeline, AddListener, ChangeListener, RemoveListener } from "../Timeline";
import { Interval, intervalBetween } from "datils/math/intervals";
import { Time } from "time";
import { ParallelTimeline } from "../parallel/Parallel";
import { Props } from "../props";
import { ISequentialTimeline } from "./Interface";

export class SequentialTimeline<E> implements ISequentialTimeline<E> {
  private parallelTimeline: ParallelTimeline<E>;

  constructor(props: Props) {
    this.parallelTimeline = new ParallelTimeline(props);
  }

  add(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    this.#fixOverlappingNodes(...nodes);

    return this.parallelTimeline.add(...nodes);
  }

  addTimeline(layer: Timeline<E>, at?: Time): TimelineNode<E>[] {
    const { nodes } = layer;

    this.#fixOverlappingNodes(...nodes);

    return this.parallelTimeline.addTimeline(layer, at);
  }

  removeAt(at: Time): TimelineNode<E> | undefined {
    return this.parallelTimeline.removeAt(at)[0];
  }

  removeAtInterval(interval: Interval<Time>): TimelineNode<E>[] {
    return this.parallelTimeline.removeAtInterval(interval);
  }

  getAtInterval(interval: Interval<Time>): TimelineNode<E>[] {
    return this.parallelTimeline.getAtInterval(interval);
  }

  remove(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    return this.parallelTimeline.remove(...nodes);
  }

  getAt(time: Time): TimelineNode<E> | undefined {
    return this.parallelTimeline.getAt(time)[0];
  }

  clear(): void {
    return this.parallelTimeline.clear();
  }

  moveNode(node: TimelineNode<E>, time: Time): TimelineNode<E> {
    return this.parallelTimeline.moveNode(node, time);
  }

  moveNodeEndTo(node: TimelineNode<E>, time: Time): TimelineNode<E> {
    return this.parallelTimeline.moveNodeEndTo(node, time);
  }

  get nodes(): readonly TimelineNode<E>[] {
    return this.parallelTimeline.nodes;
  }

  get duration(): Time {
    return this.parallelTimeline.duration;
  }

  get startTime(): Time {
    return this.parallelTimeline.startTime;
  }

  onChange(listener: ChangeListener<E>): void {
    this.parallelTimeline.onChange(listener);
  }

  onAdd(listener: AddListener<E>): void {
    this.parallelTimeline.onAdd(listener);
  }

  onRemove(listener: RemoveListener<E>): void {
    this.parallelTimeline.onRemove(listener);
  }

  #fixOverlappingNodes(...newNodes: TimelineNode<E>[]) {
    for (const n of newNodes)
      this.#fixOverlappingNode(n);
  }

  #fixOverlappingNode(newNode: TimelineNode<E>) {
    const oldNodes = this.getAtInterval(newNode.interval);

    for (const oldNode of oldNodes) {
      if (isTotalOverlapping(oldNode, newNode))
        this.remove(oldNode);
      else if (isRightOverlapping(oldNode, newNode)) {
        this.remove(oldNode);
        const newOldNode = {
          event: oldNode.event,
          interval: intervalBetween(
            oldNode.interval.from,
            newNode.interval.from,
          ),
        };

        this.add(newOldNode);
      } else if (isLeftOverlapping(oldNode, newNode)) {
        this.remove(oldNode);
        const newOldNode = {
          event: oldNode.event,
          interval: intervalBetween(
            newNode.interval.to,
            oldNode.interval.to,
          ),
        };

        this.add(newOldNode);
      } else if (isSubOverlapping(oldNode, newNode)) {
        this.remove(oldNode);
        const firstHalf = {
          event: oldNode.event,
          interval: intervalBetween(
            oldNode.interval.from,
            newNode.interval.from,
          ),
        };
        const secondHalf = {
          event: oldNode.event,
          interval: intervalBetween(
            newNode.interval.to,
            oldNode.interval.to,
          ),
        };

        this.add(firstHalf);
        this.add(secondHalf);
      }
    }
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
  return newNode.interval.from < oldNode.interval.from
  && newNode.interval.to > oldNode.interval.to;
}

function isSubOverlapping<E>(oldNode: TimelineNode<E>, newNode: TimelineNode<E>): boolean {
  return newNode.interval.from > oldNode.interval.from
  && newNode.interval.to < oldNode.interval.to;
}
