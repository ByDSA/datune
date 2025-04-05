/* eslint-disable accessor-pairs */
import type { TimelineNode } from "../..";
import type { Timeline } from "../Timeline";
import TreeMap from "ts-treemap";
import { intervalContains, intervalIntersects, intervalBetween, IntervalBound } from "datils/math/intervals";
import { Interval } from "datils/math/intervals";
import { deepFreeze } from "datils/datatypes/objects";
import { Time } from "time/Time";
import { add, sub } from "time";
import { Props } from "../props";

type Cell<E> = Set<TimelineNode<E>>;
type FunctionEach<E> = (
    node: TimelineNode<E>,
    cell: Cell<E>
    )=> boolean;

type FEach<E> = (
    node: TimelineNode<E>,
    cell: Cell<E>
    )=> void;

export class ParallelTimeline<E> implements Timeline<E> {
  #cells: TreeMap<number, Cell<E>>;

  #nodes: Set<TimelineNode<E>>;

  #startTime: Time;

  #cellSize: Time;

  #duration: Time | null;

  constructor(props: Props) {
    this.#cells = new TreeMap();
    this.#nodes = new Set();

    this.#startTime = props.startTime;
    this.#cellSize = props.cellSize;

    this.#duration = 0;
  }

  get startTime(): Time {
    return this.#startTime;
  }

  #getCellIndexesFromInterval(interval: Interval<Time>) {
    let from = divCell(interval.from, this.#cellSize as Time);
    let to = divCell(interval.to, this.#cellSize as Time);
    const isToCellSizeBound = interval.to % this.#cellSize === 0;

    if (isToCellSizeBound) {
      if (interval.toBound === IntervalBound.OPEN)
        to--;
    }

    return {
      from,
      to,
    };
  }

  #getCellFromTime(time: Time): Cell<E> {
    const index: number = divCell(time, this.#cellSize);

    return this.#getCellFromIndex(index);
  }

  #getCellFromIndex(index: number): Cell<E> {
    let cell = this.#cells.get(index);

    if (!cell) {
      cell = new Set();
      this.#cells.set(index, cell);
    }

    return cell;
  }

  extendNode(node: TimelineNode<E>, interval: Partial<Interval<Time>>): TimelineNode<E> {
    const [oldNode] = this.remove(node);

    if (!oldNode)
      throw NOT_FOUND_ERROR;

    const newInterval: Interval<Time> = {
      from: interval.from ?? oldNode.interval.from,
      to: interval.to ?? oldNode.interval.to,
      fromBound: interval.fromBound ?? oldNode.interval.fromBound,
      toBound: interval.toBound ?? oldNode.interval.toBound,
    };
    const newNode = {
      ...oldNode,
      interval: newInterval,
    };
    const [ret] = this.add(newNode);

    return ret;
  }

  add(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    return this.#addNodes(...nodes);
  }

  addTimeline(layer: Timeline<E>, at?: Time): TimelineNode<E>[] {
    return this.#addTimeLayer(layer, at);
  }

  #addNode(node: TimelineNode<E>): TimelineNode<E> {
    this.#forEachCellsAtInterval(node.interval, (cell) => cell.add(node));

    this.#nodes.add(node);

    if (this.#duration !== null)
      this.#duration = Math.max(this.#duration, node.interval.to);

    return node;
  }

  #addNodes(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    const ret = [];

    for (const n of nodes) {
      deepFreeze(n);

      this.#addNode(n);
      ret.push(n);
    }

    return ret;
  }

  #addTimeLayer(layer: Timeline<E>, time: Time = this.duration): TimelineNode<E>[] {
    const ret = [];

    for (const n of layer.nodes) {
      let node: TimelineNode<E>;

      if (time !== 0) {
        node = {
          event: n.event,
          interval: intervalBetween(
            add(time, n.interval.from),
            add(time, n.interval.to),
          ),
        };
      } else
        node = n;

      this.#addNode(node);
      ret.push(node);
    }

    return ret;
  }

  private addEvent(
    event: E,
    from: Time = this.duration as Time,
    to: Time = this.duration as Time,
  ): TimelineNode<E> {
    const node = {
      event,
      interval: intervalBetween(from, to),
    };

    this.#addNode(node);

    return node;
  }

  moveNode(node: TimelineNode<E>, time: Time): TimelineNode<E> {
    this.#removeNode(node);
    const { to } = node.interval;
    const ret = this.addEvent(node.event, time, add(to, time));

    return ret;
  }

  moveNodeEndTo(node: TimelineNode<E>, time: Time): TimelineNode<E> {
    this.#removeNode(node);
    const { to } = node.interval;
    const ret = this.addEvent(node.event, sub(time, to), time);

    return ret;
  }

  #forEachCellsAtInterval(interval: Interval<Time>, f: (cell: Cell<E>)=> void) {
    const { from: iniCell, to: endCell } = this.#getCellIndexesFromInterval(interval);

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: Cell<E> = this.#getCellFromIndex(i);

      f(cell);
    }
  }

  #forEachCellNodesAtInterval(interval: Interval<Time>, f: FEach<E>): void {
    const { from: iniCell, to: endCell } = this.#getCellIndexesFromInterval(interval);
    const processed = new Set();

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: Cell<E> = this.#getCellFromIndex(i);

      for (const node of cell) {
        if (!processed.has(node) && intervalIntersects(interval, node.interval)) {
          f(node, cell);
          processed.add(node);
        }
      }
    }
  }

  getAt(time: Time): TimelineNode<E>[] {
    return this.getNodesAt(time);
  }

  getAtInterval(interval: Interval<Time>): TimelineNode<E>[] {
    return this.getNodesAtInterval(interval);
  }

  private getNodesAtInterval(interval: Interval<Time>): TimelineNode<E>[] {
    const ret: TimelineNode<E>[] = [];

    this.#forEachCellNodesAtInterval(interval, (node) => ret.push(node));

    return ret;
  }

  private getNodesAt(time: Time): TimelineNode<E>[] {
    const ret: TimelineNode<E>[] = [];
    const cell: Cell<E> = this.#getCellFromTime(time);

    for (const musicalEvent of cell) {
      if (intervalContains(musicalEvent.interval, time))
        ret.push(musicalEvent);
    }

    return ret;
  }

  get duration(): Time {
    if (this.#duration === null)
      this.#recalcDuration();

    return this.#duration!;
  }

  #recalcDuration() {
    this.#duration = 0;

    for (const node of this.#nodes)
      this.#duration = Math.max(this.#duration, node.interval.to);
  }

  get nodes(): TimelineNode<E>[] {
    return [...this.#nodes];
  }

  remove(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    const ret: TimelineNode<E>[] = [];

    for (const n of nodes) {
      const removedNode = this.#removeNode(n);

      if (removedNode)
        ret.push(removedNode);
    }

    return ret;
  }

  removeAt(time: Time): TimelineNode<E>[] {
    const cell: Cell<E> = this.#getCellFromTime(time);
    const f = (node: TimelineNode<E>) => !intervalContains(node.interval, time);
    const removedNodes = this.#cellRemoveNodesIf(cell, f);

    return removedNodes;
  }

  removeAtInterval(interval: Interval<Time>): TimelineNode<E>[] {
    const removedNodes: TimelineNode<E>[] = [];

    this.#forEachCellNodesAtInterval(interval, (node, cell) => {
      cell.delete(node);
      removedNodes.push(node);
    } );

    return removedNodes;
  }

  #cellRemoveNodesIf(
    cell: Set<TimelineNode<E>>,
    f: FunctionEach<E>,
  ): TimelineNode<E>[] {
    const removedNodes: TimelineNode<E>[] = [];

    for (const node of [...cell]) {
      if (!f(node, cell)) {
        this.#removeNode(node);
        cell.delete(node);
        removedNodes.push(node);
      }
    }

    return removedNodes;
  }

  #removeNode(node: TimelineNode<E>): TimelineNode<E> | null {
    this.#forEachCellsAtInterval(node.interval, (cell) => cell.delete(node));

    if (node.interval.to === this.#duration)
      this.#duration = null;

    this.#nodes.delete(node);

    return node;
  }

  clear() {
    this.#nodes = new Set();
    this.#cells = new TreeMap();
  }

  get cellSize(): Time {
    return this.#cellSize;
  }
}

const NOT_FOUND_ERROR = new Error("Node not found");

function divCell<T extends Time>(self: T, cellSize: T): number {
  const div = +self / +cellSize;

  return Math.trunc(div);
}
