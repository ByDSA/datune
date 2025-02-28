import { Direction } from "../Direction";

export type Dto = {
  magnitude: number;
  direction: Direction;
};

export function hashDto(obj: Dto): string {
  const dirStr = obj.direction === Direction.ASCENDENT ? "+" : "-";

  return `${dirStr}${obj.magnitude}`;
}
