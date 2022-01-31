import { intervalContains, intervalIntersects, intervalOf } from "math";
import { contains } from "math/interval";
import { add, divCell, mult, sub } from "time";
import Time from "time/Time";
import TreeMap from "ts-treemap";
import Interval from "../../../../math/interval/Interval";
import { Constructor as TemporalNodeConstructorType, from as temporalNode, isTemporalNodeConstructorType, TemporalNode } from "../../temporal-node";
import TimeLayer from "../../TimeLayer";
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

export default class ParallelSequence<E> implements TimeLayer<E> {
  private _cells: TreeMap<number, TemporalNode<E>[]>;

  private _nodes: TemporalNode<E>[];

  private _onChangeListeners: SequenceChangeListener<E>[];

  private _onAddListeners: SequenceAddListener<E>[];

  private _onRemoveListeners: SequenceRemoveListener<E>[];

  private _startTime: Time;

  private _cellSize: Time;

  constructor(obj: TimeLayerConstructorObject) {
    this._cells = new TreeMap();
    this._nodes = [];

    this._startTime = obj.startTime;
    this._cellSize = obj.cellSize;
    this._onChangeListeners = [];
    this._onAddListeners = [];
    this._onRemoveListeners = [];
  }

  // eslint-disable-next-line accessor-pairs
  get startTime(): Time {
    return this._startTime;
  }

  private _getCellIndexFromTime(time: Time): number {
    return divCell(time, this._cellSize as Time);
  }

  private _getCellFromTime(time: Time): TemporalNode<E>[] {
    const index: number = this._getCellIndexFromTime(time);

    return this._getCellFromIndex(index);
  }

  private _getCellFromIndex(index: number): TemporalNode<E>[] {
    let cell = this._cells.get(index);

    if (!cell) {
      cell = [];
      this._cells.set(index, cell);
    }

    return cell;
  }

  onChange(listener: SequenceChangeListener<E>) {
    this._onChangeListeners.push(listener);
  }

  private _callOnChangeListeners(oldNode: TemporalNode<E>, newNode: TemporalNode<E>) {
    for (const f of this._onChangeListeners)
      f(oldNode, newNode);
  }

  private _callOnAddListeners(node: TemporalNode<E>) {
    for (const f of this._onAddListeners)
      f(node);
  }

  private _callOnRemoveListeners(node: TemporalNode<E>) {
    for (const f of this._onRemoveListeners)
      f(node);
  }

  onAdd(listener: SequenceAddListener<E>) {
    this._onAddListeners.push(listener);
  }

  onRemove(listener: SequenceRemoveListener<E>) {
    this._onRemoveListeners.push(listener);
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
    this._forEachCellsAtInterval(node.interval, (cell) => cell.push(node));

    this._nodes.push(node);

    this._callOnAddListeners(node);

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

    this._callOnChangeListeners(node, ret);

    return ret;
  }

  moveNodeEndTo(node: TemporalNode<E>, time: Time): TemporalNode<E> {
    this.removeNode(node);
    const { to } = node.interval;
    const ret = this.addEvent(node.event, sub(time, to), time);

    this._callOnChangeListeners(node, ret);

    return ret;
  }

  private _forEachCellsAtInterval(interval: Interval<Time>, f: (cell: TemporalNode<E>[])=> void) {
    const iniCell: number = this._getCellIndexFromTime(interval.from);
    let endCell: number = this._getCellIndexFromTime(interval.to);

    // Fix open Interval
    if (interval.to === mult(this.getCellSize() as Time, endCell))
      endCell--;

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: TemporalNode<E>[] = this._getCellFromIndex(i);

      f(cell);
    }
  }

  private _forEachCellNodesAtInterval(interval: Interval<Time>, f: FEach<E>): void {
    const iniCell: number = this._getCellIndexFromTime(interval.from);
    const endCell: number = this._getCellIndexFromTime(interval.to);

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: TemporalNode<E>[] = this._getCellFromIndex(i);

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
      const interval = intervalOf(from, to);

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

    this._forEachCellNodesAtInterval(interval, (node) => ret.push(node));

    return ret;
  }

  private getNodesAt(time: Time): TemporalNode<E>[] {
    const ret: TemporalNode<E>[] = [];
    const cell: TemporalNode<E>[] = this._getCellFromTime(time);

    for (const musicalEvent of cell) {
      if (contains(musicalEvent.interval, time))
        ret.push(musicalEvent);
    }

    return ret;
  }

  // eslint-disable-next-line accessor-pairs
  get duration(): Time {
    const lastEntry = this._lastEntryWithNodes();

    if (!lastEntry)
      return this.startTime;

    const lastCell: TemporalNode<E>[] = lastEntry[1];
    let max: Time = lastCell[0].interval.to;

    for (let i: number = 1; i < lastCell.length; i++) {
      const c: TemporalNode<E> = lastCell[i];

      if (c.interval.to > max)
        max = c.interval.to;
    }

    return max;
  }

  private _lastEntryWithNodes(): [number, TemporalNode<E>[]] | undefined {
    do {
      const lastEntry = this._cells.lastEntry();

      if (!lastEntry)
        return undefined;

      if (lastEntry[1].length === 0)
        this._cells.popEntry();
      else
        return lastEntry;
    } while (true);
  }

  // eslint-disable-next-line accessor-pairs
  get nodes(): TemporalNode<E>[] {
    return this._nodes;
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
      const interval = intervalOf(from, to);

      return this.removeNodesAtInterval(interval);
    }

    if (isRemoveNodesAtIntervalType(obj)) {
      const { interval } = <RemoveNodesAtIntervalType>obj;

      return this.removeNodesAtInterval(interval);
    }

    return [];
  }

  private removeNodesAt(time: Time): TemporalNode<E>[] {
    const cell: TemporalNode<E>[] = this._getCellFromTime(time);
    const f = (node: TemporalNode<E>) => !intervalContains(node.interval, time);
    const removedNodes = this._cellRemoveNodesIf(cell, f);

    return removedNodes;
  }

  private removeNodesAtInterval(intervalTime: Interval<Time>): TemporalNode<E>[] {
    const removedNodes: TemporalNode<E>[] = [];

    this._forEachCellNodesAtInterval(intervalTime, (node, cell) => {
      removeNodeFromCell(node, cell);
      removedNodes.push(node);
    } );

    return removedNodes;
  }

  private _cellRemoveNodesIf(
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
    const index = this._nodes.indexOf(node);

    if (index === -1)
      return null;

    this._forEachCellsAtInterval(node.interval, (cell) => removeNodeFromCell(node, cell));
    this._nodes.splice(index, 1);

    this._callOnRemoveListeners(node);

    return node;
  }

  clear() {
    const oldNodes = this._nodes;

    this._nodes = [];
    this._cells = new TreeMap();

    for (const oldNode of oldNodes)
      this._callOnRemoveListeners(oldNode);
  }

  protected getCellSize(): Time {
    return this._cellSize;
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
