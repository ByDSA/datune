import { Time } from "time";
import Interval from "../../../math/interval/Interval";

export type GetNodesAtIntervalType = {
  interval: Interval<Time>;
};

export type GetNodesFromToType = {
  from: Time;
  to: Time;
};

export type GetNodesAtType = {
  at: Time;
};

export type GetType =
GetNodesAtIntervalType | GetNodesAtType | GetNodesFromToType;

export function isGetNodesAtIntervalType(obj: GetType): obj is GetNodesAtIntervalType {
  return "interval" in obj;
}

export function isGetNodesFromToType(obj: GetType): obj is GetNodesFromToType {
  return "from" in obj && "to" in obj;
}

export function isGetNodesAtType(obj: GetType): obj is GetNodesAtType {
  return "at" in obj;
}
