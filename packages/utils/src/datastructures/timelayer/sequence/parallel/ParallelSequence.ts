/* eslint-disable accessor-pairs */
import TreeMap from "ts-treemap";
import { intervalContains, intervalIntersects, intervalBetween } from "datils/math/intervals";
import { Interval } from "datils/math/intervals";
import { Time } from "time/Time";
import { add, divCell, mult, sub } from "time";
import { Constructor as TemporalNodeConstructorType, from as temporalNode, isTemporalNodeConstructorType, TemporalNode } from "../../temporal-node";
import { TimeLayer } from "../../TimeLayer";
import { AddType, GetType, isAddLayerType, isGetNodesAtType, isGetNodesFromToType, isNodeType, NodeType, RemoveType, SequenceAddListener, SequenceChangeListener, SequenceRemoveListener } from "../../types";
import { isGetNodesAtIntervalType } from "../../types/GetTypes";
import { isRemoveNodesAtIntervalType, isRemoveNodesAtType, isRemoveNodesFromToType, RemoveNodesAtIntervalType, RemoveNodesAtType, RemoveNodesFromToType } from "../../types/RemoveTypes";
import { isNodesType, NodesType, TimeLayerConstructorObject } from "../../types/types";

type FunctionEach<E> = (
    node: TemporalNode<E>,
    cell: TemporalNode<E>[]
    )=> boolean;

type FEach<E> = (
    node: TemporalNode<E>,
    cell: TemporalNode<E>[]
    )=> void;

export class ParallelSequence<E> implements TimeLayer<E> {
  #cells: TreeMap<number, TemporalNode<E>[]>;

  #nodes: TemporalNode<E>[];

  #onChangeListeners: SequenceChangeListener<E>[];

  #onAddListeners: SequenceAddListener<E>[];

  #onRemoveListeners: SequenceRemoveListener<E>[];

  #startTime: Time;

  #cellSize: Time;

  constructor(obj: TimeLayerConstructorObject) {
    this.#cells = new TreeMap();
    this.#nodes = [];

    this.#startTime = obj.startTime;
    this.#cellSize = obj.cellSize;
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

  #getCellFromTime(time: Time): TemporalNode<E>[] {
    const index: number = this.#getCellIndexFromTime(time);

    return this.#getCellFromIndex(index);
  }

  #getCellFromIndex(index: number): TemporalNode<E>[] {
    let cell = this.#cells.get(index);

    if (!cell) {
      cell = [];
      this.#cells.set(index, cell);
    }

    return cell;
  }

  onChange(listener: SequenceChangeListener<E>) {
    this.#onChangeListeners.push(listener);
  }

  #callOnChangeListeners(oldNode: TemporalNode<E>, newNode: TemporalNode<E>) {
    for (const f of this.#onChangeListeners)
      f(oldNode, newNode);
  }

  #callOnAddListeners(node: TemporalNode<E>) {
    for (const f of this.#onAddListeners)
      f(node);
  }

  #callOnRemoveListeners(node: TemporalNode<E>) {
    for (const f of this.#onRemoveListeners)
      f(node);
  }

  onAdd(listener: SequenceAddListener<E>) {
    this.#onAddListeners.push(listener);
  }

  onRemove(listener: SequenceRemoveListener<E>) {
    this.#onRemoveListeners.push(listener);
  }

  add(obj: AddType<E>): TemporalNode<E>[] {
    if (isTemporalNodeConstructorType(obj)) {
      const node = temporalNode<E>(obj as TemporalNodeConstructorType<E>);

      return [this.addNode(node)];
    }

    if (isNodeType(obj)) {
      const node = obj as NodeType<E>;

      return [this.addNode(node)];
    }

    if (isNodesType(obj)) {
      const nodes = obj as NodesType<E>;

      return this.addNodes(...nodes);
    }

    if (isAddLayerType(obj)) {
      const { layer, at } = obj;

      return this.addTimeLayer(layer, at);
    }

    return [];
  }

  private addNode(node: TemporalNode<E>): TemporalNode<E> {
    this.#forEachCellsAtInterval(node.interval, (cell) => cell.push(node));

    this.#nodes.push(node);

    this.#callOnAddListeners(node);

    return node;
  }

  private addNodes(...nodes: TemporalNode<E>[]): TemporalNode<E>[] {
    const ret = [];

    for (const n of nodes) {
      const obj = {
        interval: n.interval,
        event: n.event,
      };
      const node: TemporalNode<E> = temporalNode<E>(obj);

      this.addNode(node);
      ret.push(node);
    }

    return ret;
  }

  private addTimeLayer(layer: TimeLayer<E>, time: Time = this.duration): TemporalNode<E>[] {
    const ret = [];

    for (const n of layer.nodes) {
      let node: TemporalNode<E>;

      if (time !== 0) {
        const obj = {
          from: add(time, n.interval.from),
          to: add(time, n.interval.to),
          event: n.event,
        };

        node = temporalNode<E>(obj);
      } else
        node = n;

      this.addNode(node);
      ret.push(node);
    }

    return ret;
  }

  private addEvent(
    event: E,
    from: Time = this.duration as Time,
    to: Time = this.duration as Time,
  ): TemporalNode<E> {
    const obj = {
      from,
      to,
      event,
    };
    const node = temporalNode<E>(obj);

    this.addNode(node);

    return node;
  }

  moveNode(node: TemporalNode<E>, time: Time): TemporalNode<E> {
    this.removeNode(node);
    const { to } = node.interval;
    const ret = this.addEvent(node.event, time, add(to, time));

    this.#callOnChangeListeners(node, ret);

    return ret;
  }

  moveNodeEndTo(node: TemporalNode<E>, time: Time): TemporalNode<E> {
    this.removeNode(node);
    const { to } = node.interval;
    const ret = this.addEvent(node.event, sub(time, to), time);

    this.#callOnChangeListeners(node, ret);

    return ret;
  }

  #forEachCellsAtInterval(interval: Interval<Time>, f: (cell: TemporalNode<E>[])=> void) {
    const iniCell: number = this.#getCellIndexFromTime(interval.from);
    let endCell: number = this.#getCellIndexFromTime(interval.to);

    // Fix open Interval
    if (interval.to === mult(this.cellSize as Time, endCell))
      endCell--;

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: TemporalNode<E>[] = this.#getCellFromIndex(i);

      f(cell);
    }
  }

  #forEachCellNodesAtInterval(interval: Interval<Time>, f: FEach<E>): void {
    const iniCell: number = this.#getCellIndexFromTime(interval.from);
    const endCell: number = this.#getCellIndexFromTime(interval.to);

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: TemporalNode<E>[] = this.#getCellFromIndex(i);

      for (const node of cell) {
        if (intervalIntersects(interval, node.interval))
          f(node, cell);
      }
    }
  }

  get(obj: GetType): TemporalNode<E>[] {
    if (isGetNodesAtType(obj)) {
      const { at } = obj;

      return this.getNodesAt(at);
    }

    if (isGetNodesFromToType(obj)) {
      const { from, to } = obj;
      const interval = intervalBetween(from, to);

      return this.getNodesAtInterval(interval);
    }

    if (isGetNodesAtIntervalType(obj)) {
      const { interval } = obj;

      return this.getNodesAtInterval(interval);
    }

    return [];
  }

  private getNodesAtInterval(interval: Interval<Time>): TemporalNode<E>[] {
    const ret: TemporalNode<E>[] = [];

    this.#forEachCellNodesAtInterval(interval, (node) => ret.push(node));

    return ret;
  }

  private getNodesAt(time: Time): TemporalNode<E>[] {
    const ret: TemporalNode<E>[] = [];
    const cell: TemporalNode<E>[] = this.#getCellFromTime(time);

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
    const lastCell: TemporalNode<E>[] = lastEntry[1];
    let max: Time = lastCell[0].interval.to;

    for (let i: number = 1; i < lastCell.length; i++) {
      const c: TemporalNode<E> = lastCell[i];

      if (c.interval.to > max)
        max = c.interval.to;
    }

    return max;
  }

  #lastEntryWithNodes(): [number, TemporalNode<E>[]] | undefined {
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

  get nodes(): TemporalNode<E>[] {
    return this.#nodes;
  }

  remove(obj: RemoveType<E>): TemporalNode<E>[] {
    if (isNodeType(obj)) {
      const node = obj as NodeType<E>;
      const removedNode = this.removeNode(node);

      return removedNode ? [removedNode] : [];
    }

    if (isNodesType(obj)) {
      const nodes = obj as NodesType<E>;
      const ret: NodesType<E> = [];

      for (const n of nodes) {
        const removedNode = this.removeNode(n);

        if (removedNode)
          ret.push(removedNode);
      }

      return ret;
    }

    if (isRemoveNodesAtType(obj)) {
      const { at } = obj as RemoveNodesAtType;

      return this.removeNodesAt(at);
    }

    if (isRemoveNodesFromToType(obj)) {
      const { from, to } = obj as RemoveNodesFromToType;
      const interval = intervalBetween(from, to);

      return this.removeNodesAtInterval(interval);
    }

    if (isRemoveNodesAtIntervalType(obj)) {
      const { interval } = <RemoveNodesAtIntervalType>obj;

      return this.removeNodesAtInterval(interval);
    }

    return [];
  }

  private removeNodesAt(time: Time): TemporalNode<E>[] {
    const cell: TemporalNode<E>[] = this.#getCellFromTime(time);
    const f = (node: TemporalNode<E>) => !intervalContains(node.interval, time);
    const removedNodes = this.#cellRemoveNodesIf(cell, f);

    return removedNodes;
  }

  private removeNodesAtInterval(intervalTime: Interval<Time>): TemporalNode<E>[] {
    const removedNodes: TemporalNode<E>[] = [];

    this.#forEachCellNodesAtInterval(intervalTime, (node, cell) => {
      removeNodeFromCell(node, cell);
      removedNodes.push(node);
    } );

    return removedNodes;
  }

  #cellRemoveNodesIf(
    cell: TemporalNode<E>[],
    f: FunctionEach<E>,
  ): TemporalNode<E>[] {
    const removedNodes: TemporalNode<E>[] = [];

    for (let i = 0; i < cell.length; i++) {
      const node: TemporalNode<E> = cell[i];

      if (!f(node, cell)) {
        this.removeNode(node);
        i--;
        removedNodes.push(node);
      }
    }

    return removedNodes;
  }

  private removeNode(node: TemporalNode<E>): TemporalNode<E> | null {
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
  node: TemporalNode<E>,
  cell: TemporalNode<E>[],
): void {
  const index = cell.indexOf(node);

  if (index !== -1)
    cell.splice(index, 1);
}
