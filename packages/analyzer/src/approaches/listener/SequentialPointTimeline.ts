/* eslint-disable accessor-pairs */
import { Time } from "@datune/utils";
import { Interval, IntervalBound, intervalContains } from "datils/math";
import { PointTimeline, PointTimelineNode } from "./PointTimeline";

type PointNode<E> = {
  time: number;
  event: E;
};

type Props = {
  startTime?: Time;
};

export class SequentialPointTimeline<E> implements PointTimeline<E> {
  addTimeline(timeline: PointTimeline<E>, offset?: Time): PointTimelineNode<E>[] {
    if (offset === undefined) {
      for (const node of timeline.nodes)
        this.#add(node);
    } else {
      for (const node of timeline.nodes) {
        const newNode = {
          ...node,
          time: node.time + offset,
        };

        this.#add(newNode);
      }
    }

    return this.#nodes;
  }

  remove(...nodes: PointTimelineNode<E>[]): PointTimelineNode<E>[] {
    const ret: PointTimelineNode<E>[] = [];

    for (const n of nodes) {
      const { time } = n;
      let left = 0;
      let right = this.#nodes.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midTime = this.#nodes[mid].time;

        if (midTime === time) {
          this.#nodes.splice(mid, 1);

          ret.push(n);
          break;
        } else if (midTime < time)
          left = mid + 1;
        else
          right = mid - 1;
      }
    }

    return ret;
  }

  removeAtInterval(interval: Interval<Time>): PointTimelineNode<E>[] {
    if (this.nodes.length === 0)
      return [];

    let startIndex = 0;

    if (interval.from > 0)
      startIndex = this.#findRightIndexByTime(interval.from, interval.fromBound);

    let currentNode = this.#nodes[startIndex]!;
    let lastIndex = -1;

    for (
      let i = startIndex;
      i < this.#nodes.length && intervalContains(interval, currentNode.time);
      i++, currentNode = this.#nodes[i]!)
      lastIndex = i;

    if (lastIndex === -1)
      return [];

    return this.#nodes.splice(startIndex, (lastIndex - startIndex) + 1);
  }

  clear(): void {
    this.#nodes = [];
  }

  getAtInterval(interval: Interval<Time>): PointTimelineNode<E>[] {
    if (this.nodes.length === 0)
      return [];

    let startIndex = 0;

    if (interval.from > 0)
      startIndex = this.#findRightIndexByTime(interval.from, interval.fromBound);

    if (startIndex === -1)
      return [];

    const ret: PointTimelineNode<E>[] = [];
    let currentNode = this.#nodes[startIndex]!;

    for (
      let i = startIndex;
      i < this.#nodes.length && intervalContains(interval, currentNode.time);
      i++, currentNode = this.#nodes[i]!)
      ret.push(currentNode);

    return ret;
  }

  moveNode(node: PointTimelineNode<E>, time: Time): PointTimelineNode<E> | null {
    const found = this.#findNodeByTime(node.time);

    if (found === null || found !== node)
      return null;

    this.remove(found);

    const newNode = {
      ...found,
      time,
    };

    return this.add(newNode)[0];
  }

  constructor(props?: Props) {
    this.startTime = props?.startTime ?? 0;
  }

  startTime: number;

  #nodes: PointNode<E>[] = [];

  get nodes(): readonly PointNode<E>[] {
    return this.#nodes;
  }

  get duration(): number {
    if (this.#nodes.length === 0)
      return 0;

    return this.#nodes[this.#nodes.length - 1].time - this.#nodes[0].time;
  }

  add(...nodes: PointNode<E>[]): PointTimelineNode<E>[] {
    if (nodes.length === 1)
      return [this.#add(nodes[0])];

    if (nodes.length === 0)
      return [];

    const uniqueByTime = new Map<number, PointNode<E>>();

    for (const node of nodes)
      uniqueByTime.set(node.time, node); // sobrescribe si ya existe

    return Array.from(uniqueByTime.values()).map(n => this.#add(n));
  }

  #add(node: PointNode<E>): PointTimelineNode<E> {
    const { time } = node;

    // Si el arreglo está vacío o el último evento tiene un tiempo menor o igual,
    // entonces lo agregamos al final (optimización para inserciones en orden)
    if (this.#nodes.length === 0 || this.#nodes[this.#nodes.length - 1].time <= time) {
      this.#nodes.push(node);

      return node;
    }

    // Caso contrario, usamos búsqueda binaria para encontrar la posición de inserción.
    let left = 0;
    let right = this.#nodes.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midTime = this.#nodes[mid].time;

      if (midTime === time) {
        this.#nodes[mid] = node; // sobrescribe el existente

        return node;
      } else if (midTime < time)
        left = mid + 1;
      else
        right = mid - 1;
    }

    // left es el índice donde insertar el nuevo elemento.
    this.#nodes.splice(left, 0, node);

    return node;
  }

  #findNodeByTime(time: Time): PointTimelineNode<E> | null {
    let left = 0;
    let right = this.#nodes.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midNode = this.#nodes[mid];
      const midTime = midNode.time;

      if (midTime === time)
        return midNode;
      else if (midTime < time)
        left = mid + 1;
      else
        right = mid - 1;
    }

    return null;
  }

  #findLeftIndexByTime(time: Time, bound: boolean): number {
    let left = 0;
    let right = this.#nodes.length - 1;
    let resultIndex = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midNode = this.#nodes[mid];
      const midTime = midNode.time;

      if (midTime === time) {
        if (bound === IntervalBound.CLOSED)
          resultIndex = mid;
        else if (mid - 1 >= 0)
          resultIndex = mid - 1;
        else
          resultIndex = -1;

        break;
      } else if (midTime < time) {
        left = mid + 1;
        resultIndex = mid;

        if (bound === IntervalBound.CLOSED)
          resultIndex = mid;
        else
          resultIndex = mid - 1;
      } else
        right = mid - 1;
    }

    return resultIndex;
  }

  #findRightIndexByTime(time: Time, bound: boolean): number {
    let left = 0;
    let right = this.#nodes.length - 1;
    let resultIndex = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midNode = this.#nodes[mid];
      const midTime = midNode.time;

      if (midTime === time) {
        if (bound === IntervalBound.CLOSED)
          resultIndex = mid;
        else if (mid + 1 < this.#nodes.length)
          resultIndex = mid + 1;
        else
          resultIndex = -1;

        break;
      } else if (midTime < time)
        left = mid + 1;
      else {
        right = mid - 1;

        if (bound === IntervalBound.CLOSED)
          resultIndex = mid;
        else
          resultIndex = mid + 1;
      }
    }

    return resultIndex;
  }

  getAt(time: Time): PointTimelineNode<E> | null {
    const index = this.#nodes.findIndex(n => n.time === time);

    if (index !== -1)
      return this.#nodes[index];

    return null;
  }

  getLeftAt(time: number, bound = IntervalBound.CLOSED): PointTimelineNode<E> | null {
    if (this.#nodes.length === 0)
      return null;

    const resultIndex = this.#findLeftIndexByTime(time, bound);

    if (resultIndex === -1)
      return null;

    return this.#nodes[resultIndex];
  }

  getRightAt(time: number, bound = IntervalBound.CLOSED): PointTimelineNode<E> | null {
    if (this.#nodes.length === 0)
      return null;

    const resultIndex = this.#findRightIndexByTime(time, bound);

    if (resultIndex === -1)
      return null;

    return this.#nodes[resultIndex];
  }
}
