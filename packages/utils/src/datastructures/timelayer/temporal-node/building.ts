import { of as intervalOf } from "datils/math/intervals";
import { add } from "../../../time";
import { isEventFromDurationType, isEventFromToType, isEventIntervalType, isNodeCopyType } from "./guards/constructor";
import { TemporalNode } from "./TemporalNode";
import { Constructor } from "./types";

export function from<E>(obj: Constructor<E>): TemporalNode<E> {
  return innerFrom(obj);
}

function innerFrom<E>(obj: Constructor<E>): TemporalNode<E> {
  if (isEventFromToType(obj)) {
    const { event, from: timeFrom, to } = obj;
    const interval = intervalOf(timeFrom, to);

    return {
      event,
      interval,
    };
  }

  if (isEventIntervalType(obj))
    return obj;

  if (isNodeCopyType(obj))
    return obj.node;

  if (isEventFromDurationType(obj)) {
    const { event, from: timeFrom, duration } = obj;
    const to = add(timeFrom, duration);

    return {
      event,
      interval: intervalOf(timeFrom, to),
    };
  }

  throw new Error(JSON.stringify(obj));
}

export function stringify<E>(node: TemporalNode<E>): string {
  return `${node.interval.from}: ${node.event}`;
}
