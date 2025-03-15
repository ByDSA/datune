import type { Interval } from "..";
import { Direction } from "../Direction";

export type Key = {
  magnitude: number;
  direction: Direction;
};

export function getId(key: Key): string {
  const dirStr = key.direction === Direction.ASCENDENT ? "+" : "-";

  return `${dirStr}${key.magnitude}`;
}

export function getKey(interval: Interval): Key {
  return {
    magnitude: interval.magnitude,
    direction: interval.direction,
  };
}

export function getObjId(interval: Interval): string {
  return getId(getKey(interval));
}
