import { Constructor, EventFromDurationType, EventFromToType, EventIntervalType, NodeCopyType } from "../types";

export function isEventFromToType<E>(
  obj: Constructor<E>,
): obj is EventFromToType<E> {
  return "event" in obj && "from" in obj && "to" in obj;
}

export function isEventFromDurationType<E>(
  obj: Constructor<E>,
): obj is EventFromDurationType<E> {
  return "duration" in obj && "event" in obj && "from" in obj;
}

export function isEventIntervalType<E>(
  obj: Constructor<E>,
): obj is EventIntervalType<E> {
  return "interval" in obj && "event" in obj;
}

export function isNodeCopyType<E>(
  obj: Constructor<E>,
): obj is NodeCopyType<E> {
  return "node" in obj;
}

export function isTemporalNodeConstructorType<E>(
  obj: any,
): obj is Constructor<E> {
  return isEventFromToType(obj) || isEventFromDurationType(obj)
  || isEventIntervalType(obj) || isNodeCopyType(obj);
}
