/* eslint-disable accessor-pairs */
import type { TimelineNode } from "../..";
import type { Timeline, AddListener, ChangeListener, RemoveListener } from "../Timeline";
import TreeMap from "ts-treemap";
import { intervalContains, intervalIntersects, intervalBetween } from "datils/math/intervals";
import { Interval } from "datils/math/intervals";
import { Time } from "time/Time";
import { add, divCell, mult, sub } from "time";
import { Props } from "../props";

type FunctionEach<E> = (
    node: TimelineNode<E>,
    cell: TimelineNode<E>[]
    )=> boolean;

type FEach<E> = (
    node: TimelineNode<E>,
    cell: TimelineNode<E>[]
    )=> void;

export class ParallelTimeline<E> implements Timeline<E> {
  #cells: TreeMap<number, TimelineNode<E>[]>;

  #nodes: TimelineNode<E>[];

  #onChangeListeners: ChangeListener<E>[];

  #onAddListeners: AddListener<E>[];

  #onRemoveListeners: RemoveListener<E>[];

  #startTime: Time;

  #cellSize: Time;

  constructor(props: Props) {
    this.#cells = new TreeMap();
    this.#nodes = [];

    this.#startTime = props.startTime;
    this.#cellSize = props.cellSize;
    this.#onChangeListeners = [];
    this.#onAddListeners = [];
    this.#onRemoveListeners = [];
  }

  get startTime(): Time {
    return this.#startTime;
  }

  #getCellIndexFromTime(time: Time): number {
    return divCell(time, this.#cellSize as Time);
  }

  #getCellFromTime(time: Time): TimelineNode<E>[] {
    const index: number = this.#getCellIndexFromTime(time);

    return this.#getCellFromIndex(index);
  }

  #getCellFromIndex(index: number): TimelineNode<E>[] {
    let cell = this.#cells.get(index);

    if (!cell) {
      cell = [];
      this.#cells.set(index, cell);
    }

    return cell;
  }

  onChange(listener: ChangeListener<E>) {
    this.#onChangeListeners.push(listener);
  }

  #callOnChangeListeners(oldNode: TimelineNode<E>, newNode: TimelineNode<E>) {
    for (const f of this.#onChangeListeners)
      f(oldNode, newNode);
  }

  #callOnAddListeners(node: TimelineNode<E>) {
    for (const f of this.#onAddListeners)
      f(node);
  }

  #callOnRemoveListeners(node: TimelineNode<E>) {
    for (const f of this.#onRemoveListeners)
      f(node);
  }

  onAdd(listener: AddListener<E>) {
    this.#onAddListeners.push(listener);
  }

  onRemove(listener: RemoveListener<E>) {
    this.#onRemoveListeners.push(listener);
  }

  add(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    return this.#addNodes(...nodes);
  }

  addTimeline(layer: Timeline<E>, at?: Time): TimelineNode<E>[] {
    return this.#addTimeLayer(layer, at);
  }

  #addNode(node: TimelineNode<E>): TimelineNode<E> {
    this.#forEachCellsAtInterval(node.interval, (cell) => cell.push(node));

    this.#nodes.push(node);

    this.#callOnAddListeners(node);

    return node;
  }

  #addNodes(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    const ret = [];

    for (const n of nodes) {
      const node: TimelineNode<E> = {
        interval: n.interval,
        event: n.event,
      };

      this.#addNode(node);
      ret.push(node);
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
    this.removeNode(node);
    const { to } = node.interval;
    const ret = this.addEvent(node.event, time, add(to, time));

    this.#callOnChangeListeners(node, ret);

    return ret;
  }

  moveNodeEndTo(node: TimelineNode<E>, time: Time): TimelineNode<E> {
    this.removeNode(node);
    const { to } = node.interval;
    const ret = this.addEvent(node.event, sub(time, to), time);

    this.#callOnChangeListeners(node, ret);

    return ret;
  }

  #forEachCellsAtInterval(interval: Interval<Time>, f: (cell: TimelineNode<E>[])=> void) {
    const iniCell: number = this.#getCellIndexFromTime(interval.from);
    let endCell: number = this.#getCellIndexFromTime(interval.to);

    // Fix open Interval
    if (interval.to === mult(this.cellSize as Time, endCell))
      endCell--;

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: TimelineNode<E>[] = this.#getCellFromIndex(i);

      f(cell);
    }
  }

  #forEachCellNodesAtInterval(interval: Interval<Time>, f: FEach<E>): void {
    const iniCell: number = this.#getCellIndexFromTime(interval.from);
    const endCell: number = this.#getCellIndexFromTime(interval.to);

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: TimelineNode<E>[] = this.#getCellFromIndex(i);

      for (const node of cell) {
        if (intervalIntersects(interval, node.interval))
          f(node, cell);
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
    const cell: TimelineNode<E>[] = this.#getCellFromTime(time);

    for (const musicalEvent of cell) {
      if (intervalContains(musicalEvent.interval, time))
        ret.push(musicalEvent);
    }

    return ret;
  }

  get duration(): Time {
    const lastEntry = this.#lastEntryWithNodes();

    if (!lastEntry)
      return this.startTime;

    // eslint-disable-next-line prefer-destructuring
    const lastCell: TimelineNode<E>[] = lastEntry[1];
    let max: Time = lastCell[0].interval.to;

    for (let i: number = 1; i < lastCell.length; i++) {
      const c: TimelineNode<E> = lastCell[i];

      if (c.interval.to > max)
        max = c.interval.to;
    }

    return max;
  }

  #lastEntryWithNodes(): [number, TimelineNode<E>[]] | undefined {
    do {
      const lastEntry = this.#cells.lastEntry();

      if (!lastEntry)
        return undefined;

      if (lastEntry[1].length === 0)
        this.#cells.popEntry();
      else
        return lastEntry;
    // eslint-disable-next-line no-constant-condition
    } while (true);
  }

  get nodes(): TimelineNode<E>[] {
    return this.#nodes;
  }

  remove(...nodes: TimelineNode<E>[]): TimelineNode<E>[] {
    const ret: TimelineNode<E>[] = [];

    for (const n of nodes) {
      const removedNode = this.removeNode(n);

      if (removedNode)
        ret.push(removedNode);
    }

    return ret;
  }

  removeAt(at: Time): TimelineNode<E>[] {
    return this.#removeNodesAt(at);
  }

  removeAtInterval(interval: Interval<Time>): TimelineNode<E>[] {
    return this.#removeNodesAtInterval(interval);
  }

  #removeNodesAt(time: Time): TimelineNode<E>[] {
    const cell: TimelineNode<E>[] = this.#getCellFromTime(time);
    const f = (node: TimelineNode<E>) => !intervalContains(node.interval, time);
    const removedNodes = this.#cellRemoveNodesIf(cell, f);

    return removedNodes;
  }

  #removeNodesAtInterval(intervalTime: Interval<Time>): TimelineNode<E>[] {
    const removedNodes: TimelineNode<E>[] = [];

    this.#forEachCellNodesAtInterval(intervalTime, (node, cell) => {
      removeNodeFromCell(node, cell);
      removedNodes.push(node);
    } );

    return removedNodes;
  }

  #cellRemoveNodesIf(
    cell: TimelineNode<E>[],
    f: FunctionEach<E>,
  ): TimelineNode<E>[] {
    const removedNodes: TimelineNode<E>[] = [];

    for (let i = 0; i < cell.length; i++) {
      const node: TimelineNode<E> = cell[i];

      if (!f(node, cell)) {
        this.removeNode(node);
        i--;
        removedNodes.push(node);
      }
    }

    return removedNodes;
  }

  private removeNode(node: TimelineNode<E>): TimelineNode<E> | null {
    const index = this.#nodes.indexOf(node);

    if (index === -1)
      return null;

    this.#forEachCellsAtInterval(node.interval, (cell) => removeNodeFromCell(node, cell));
    this.#nodes.splice(index, 1);

    this.#callOnRemoveListeners(node);

    return node;
  }

  clear() {
    const oldNodes = this.#nodes;

    this.#nodes = [];
    this.#cells = new TreeMap();

    for (const oldNode of oldNodes)
      this.#callOnRemoveListeners(oldNode);
  }

  get cellSize(): Time {
    return this.#cellSize;
  }
}

function removeNodeFromCell<E>(
  node: TimelineNode<E>,
  cell: TimelineNode<E>[],
): void {
  const index = cell.indexOf(node);

  if (index !== -1)
    cell.splice(index, 1);
}
