import { AddLayerType, AddType, GetNodesAtType, GetType, isAddLayerType, isGetNodesAtType, isGetNodesFromToType, isNodeType, NodeType, RemoveType, SequenceAddListener, SequenceChangeListener, SequenceRemoveListener } from "datastructures/timelayer/types";
import { GetNodesAtIntervalType, GetNodesFromToType, isGetNodesAtIntervalType } from "datastructures/timelayer/types/GetTypes";
import { isRemoveNodesAtIntervalType, isRemoveNodesAtType, isRemoveNodesFromToType, RemoveNodesAtIntervalType, RemoveNodesAtType, RemoveNodesFromToType } from "datastructures/timelayer/types/RemoveTypes";
import { isNodesType, NodesType, TimeLayerConstructorObject } from "datastructures/timelayer/types/types";
import TreeMap from "ts-treemap";
import Interval from "../../../../math/interval/Interval";
import { ImmutableTime } from "../../../../time/ImmutableTime";
import TemporalNode, { isTemporalNodeConstructorType, TemporalNodeConstructorType } from "../../TemporalNode";
import TimeLayer from "../../TimeLayer";

type FunctionEach<E, T extends ImmutableTime> = (
    node: TemporalNode<E, T>,
    cell: TemporalNode<E, T>[]
    )=> boolean;

type FEach<E, T extends ImmutableTime> = (
    node: TemporalNode<E, T>,
    cell: TemporalNode<E, T>[]
    )=> void;

export default class ParallelSequence<E, T extends ImmutableTime>
implements TimeLayer<E, T> {
  private _cells: TreeMap<number, TemporalNode<E, T>[]>;

  private _nodes: TemporalNode<E, T>[];

  private _onChangeListeners: SequenceChangeListener<E, T>[];

  private _onAddListeners: SequenceAddListener<E, T>[];

  private _onRemoveListeners: SequenceRemoveListener<E, T>[];

  private _startTime: T;

  private _cellSize: T;

  constructor(obj: TimeLayerConstructorObject<T>) {
    this._cells = new TreeMap();
    this._nodes = [];

    this._startTime = obj.startTime;
    this._cellSize = obj.cellSize;
    this._onChangeListeners = [];
    this._onAddListeners = [];
    this._onRemoveListeners = [];
  }

  private _getCellIndexFromTime(time: T): number {
    return time.withDivCell(this._cellSize);
  }

  private _getCellFromTime(time: T): TemporalNode<E, T>[] {
    const index: number = this._getCellIndexFromTime(time);

    return this._getCellFromIndex(index);
  }

  private _getCellFromIndex(index: number): TemporalNode<E, T>[] {
    let cell = this._cells.get(index);

    if (!cell) {
      cell = [];
      this._cells.set(index, cell);
    }

    return cell;
  }

  onChange(listener: SequenceChangeListener<E, T>) {
    this._onChangeListeners.push(listener);
  }

  private _callOnChangeListeners(oldNode: TemporalNode<E, T>, newNode: TemporalNode<E, T>) {
    for (const f of this._onChangeListeners)
      f(oldNode, newNode);
  }

  private _callOnAddListeners(node: TemporalNode<E, T>) {
    for (const f of this._onAddListeners)
      f(node);
  }

  private _callOnRemoveListeners(node: TemporalNode<E, T>) {
    for (const f of this._onRemoveListeners)
      f(node);
  }

  onAdd(listener: SequenceAddListener<E, T>) {
    this._onAddListeners.push(listener);
  }

  onRemove(listener: SequenceRemoveListener<E, T>) {
    this._onRemoveListeners.push(listener);
  }

  add(obj: AddType<E, T>): TemporalNode<E, T>[] {
    if (isTemporalNodeConstructorType(obj)) {
      const node = new TemporalNode<E, T>(obj as TemporalNodeConstructorType<E, T>);

      return [this.addNode(node)];
    }

    if (isNodeType(obj)) {
      const node = obj as NodeType<E, T>;

      return [this.addNode(node)];
    }

    if (isNodesType(obj)) {
      const nodes = obj as NodesType<E, T>;

      return this.addNodes(...nodes);
    }

    if (isAddLayerType(obj)) {
      const { layer, at } = obj as AddLayerType<E, T>;

      return this.addTimeLayer(layer, at);
    }

    return [];
  }

  private addNode(node: TemporalNode<E, T>): TemporalNode<E, T> {
    this._forEachCellsAtInterval(node.interval, (cell) => cell.push(node));

    this._nodes.push(node);

    this._callOnAddListeners(node);

    return node;
  }

  private addNodes(...nodes: TemporalNode<E, T>[]): TemporalNode<E, T>[] {
    const ret = [];

    for (const n of nodes) {
      const obj = {
        interval: n.interval,
        event: n.event,
      };
      const node: TemporalNode<E, T> = new TemporalNode<E, T>(obj);

      this.addNode(node);
      ret.push(node);
    }

    return ret;
  }

  private addTimeLayer(layer: TimeLayer<E, T>, time: T = this.duration): TemporalNode<E, T>[] {
    const ret = [];

    for (const n of layer.nodes) {
      const obj = {
        from: <T>time.withAdd(n.from),
        to: <T>time.withAdd(n.to),
        event: n.event,
      };
      const node: TemporalNode<E, T> = new TemporalNode<E, T>(obj);

      this.addNode(node);
      ret.push(node);
    }

    return ret;
  }

  private addEvent(event: E, from: T = this.duration, to: T = this.duration): TemporalNode<E, T> {
    const obj = {
      from,
      to,
      event,
    };
    const node = new TemporalNode(obj);

    this.addNode(node);

    return node;
  }

  moveNodeBeginTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T> {
    this.removeNode(node);
    const { to } = node;
    const ret = this.addEvent(node.event, time, to);

    this._callOnChangeListeners(node, ret);

    return ret;
  }

  moveNodeEndTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T> {
    this.removeNode(node);
    const ret = this.addEvent(node.event, node.from, time);

    this._callOnChangeListeners(node, ret);

    return ret;
  }

  private _forEachCellsAtInterval(interval: Interval<T>, f: (cell: TemporalNode<E, T>[])=> void) {
    const iniCell: number = this._getCellIndexFromTime(interval.from);
    let endCell: number = this._getCellIndexFromTime(interval.to);

    // Fix open Interval
    if (interval.to === this.cellSize.withMult(endCell))
      endCell--;

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: TemporalNode<E, T>[] = this._getCellFromIndex(i);

      f(cell);
    }
  }

  private _forEachCellNodesAtInterval(interval: Interval<T>, f: FEach<E, T>): void {
    const iniCell: number = this._getCellIndexFromTime(interval.from);
    const endCell: number = this._getCellIndexFromTime(interval.to);

    for (let i: number = iniCell; i <= endCell; i++) {
      const cell: TemporalNode<E, T>[] = this._getCellFromIndex(i);

      for (const node of cell) {
        if (interval.intersects(node.interval))
          f(node, cell);
      }
    }
  }

  get(obj: GetType<T>): TemporalNode<E, T>[] {
    if (isGetNodesAtType(obj)) {
      const { at } = <GetNodesAtType<T>>obj;

      return this.getNodesAt(at);
    }

    if (isGetNodesFromToType(obj)) {
      const { from, to } = <GetNodesFromToType<T>>obj;
      const interval = Interval.of(from, to);

      return this.getNodesAtInterval(interval);
    }

    if (isGetNodesAtIntervalType(obj)) {
      const { interval } = <GetNodesAtIntervalType<T>>obj;

      return this.getNodesAtInterval(interval);
    }

    return [];
  }

  private getNodesAtInterval(interval: Interval<T>): TemporalNode<E, T>[] {
    const ret: TemporalNode<E, T>[] = [];

    this._forEachCellNodesAtInterval(interval, (node) => ret.push(node));

    return ret;
  }

  private getNodesAt(time: T): TemporalNode<E, T>[] {
    const ret: TemporalNode<E, T>[] = [];
    const cell: TemporalNode<E, T>[] = this._getCellFromTime(time);

    for (const musicalEvent of cell) {
      if (time >= musicalEvent.from && time < musicalEvent.to)
        ret.push(musicalEvent);
    }

    return ret;
  }

  get duration(): T {
    const lastEntry = this._lastEntryWithNodes();

    if (!lastEntry)
      return this._startTime;

    const lastCell: TemporalNode<E, T>[] = lastEntry[1];
    let max: T = lastCell[0].to;

    for (let i: number = 1; i < lastCell.length; i++) {
      const c: TemporalNode<E, T> = lastCell[i];

      if (c.to > max)
        max = c.to;
    }

    return max;
  }

  private _lastEntryWithNodes(): [number, TemporalNode<E, T>[]] | undefined {
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

  get nodes(): TemporalNode<E, T>[] {
    return this._nodes;
  }

  remove(obj: RemoveType<E, T>): TemporalNode<E, T>[] {
    if (isNodeType(obj)) {
      const node = obj as NodeType<E, T>;
      const removedNode = this.removeNode(node);

      return removedNode ? [removedNode] : [];
    }

    if (isNodesType(obj)) {
      const nodes = obj as NodesType<E, T>;
      const ret: NodesType<E, T> = [];

      for (const n of nodes) {
        const removedNode = this.removeNode(n);

        if (removedNode)
          ret.push(removedNode);
      }

      return ret;
    }

    if (isRemoveNodesAtType(obj)) {
      const { at } = obj as RemoveNodesAtType<T>;

      return this.removeNodesAt(at);
    }

    if (isRemoveNodesFromToType(obj)) {
      const { from, to } = obj as RemoveNodesFromToType<T>;
      const interval = Interval.of(from, to);

      return this.removeNodesAtInterval(interval);
    }

    if (isRemoveNodesAtIntervalType(obj)) {
      const { interval } = <RemoveNodesAtIntervalType<T>>obj;

      return this.removeNodesAtInterval(interval);
    }

    return [];
  }

  private removeNodesAt(time: T): TemporalNode<E, T>[] {
    const cell: TemporalNode<E, T>[] = this._getCellFromTime(time);
    const f = (node: TemporalNode<E, T>) => !node.interval.contains(time);
    const removedNodes = this._cellRemoveNodesIf(cell, f);

    return removedNodes;
  }

  private removeNodesAtInterval(intervalTime: Interval<T>): TemporalNode<E, T>[] {
    const removedNodes: TemporalNode<E, T>[] = [];

    this._forEachCellNodesAtInterval(intervalTime, (node, cell) => {
      removeNodeFromCell(node, cell);
      removedNodes.push(node);
    } );

    return removedNodes;
  }

  private _cellRemoveNodesIf(
    cell: TemporalNode<E, T>[],
    f: FunctionEach<E, T>,
  ): TemporalNode<E, T>[] {
    const removedNodes: TemporalNode<E, T>[] = [];

    for (let i = 0; i < cell.length; i++) {
      const node: TemporalNode<E, T> = cell[i];

      if (!f(node, cell)) {
        this.removeNode(node);
        i--;
        removedNodes.push(node);
      }
    }

    return removedNodes;
  }

  private removeNode(node: TemporalNode<E, T>): TemporalNode<E, T> | null {
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

  protected get cellSize(): T {
    return this._cellSize;
  }
}

function removeNodeFromCell<E, T extends ImmutableTime>(
  node: TemporalNode<E, T>,
  cell: TemporalNode<E, T>[],
): void {
  const index = cell.indexOf(node);

  if (index !== -1)
    cell.splice(index, 1);
}
