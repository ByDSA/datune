import { IntervalArray } from "intervals/chromatic";

export type Dto = IntervalArray;

export function hashDto(dto: Dto): string {
  return dto.map(String).join("-");
}
