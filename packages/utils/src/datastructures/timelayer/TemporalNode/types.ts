import { ImmutableTime, Interval, TemporalNode } from "index";

export type NodeCopyType<E, T extends ImmutableTime> = {
  node: TemporalNode<E, T>;
};

export type EventFromToType<E, T extends ImmutableTime> = {
  event: E;
  from: T;
  to: T;
};

export type EventFromDurationType<E, T extends ImmutableTime> = {
  event: E;
  from: T;
  duration: T;
};

export type EventIntervalType<E, T extends ImmutableTime> = {
  event: E;
  interval: Interval<T>;
};

export type TemporalNodeConstructorType<E, T extends ImmutableTime> =
EventFromDurationType<E, T> | EventFromToType<E, T> | EventIntervalType<E, T> | NodeCopyType<E, T>;

export function isEventFromToType<E, T extends ImmutableTime>(
  obj: TemporalNodeConstructorType<E, T>,
): boolean {
  return "event" in obj && "from" in obj && "to" in obj;
}

export function isEventFromDurationType<E, T extends ImmutableTime>(
  obj: TemporalNodeConstructorType<E, T>,
): boolean {
  return "duration" in obj && "event" in obj && "from" in obj;
}

export function isEventIntervalType<E, T extends ImmutableTime>(
  obj: TemporalNodeConstructorType<E, T>,
): boolean {
  return "interval" in obj && "event" in obj;
}

export function isNodeCopyType<E, T extends ImmutableTime>(
  obj: TemporalNodeConstructorType<E, T>,
): boolean {
  return "node" in obj && (obj as NodeCopyType<E, T>).node instanceof TemporalNode;
}

export function isTemporalNodeConstructorType(
  obj: any,
): boolean {
  return isEventFromToType(obj) || isEventFromDurationType(obj)
  || isEventIntervalType(obj) || isNodeCopyType(obj);
}
