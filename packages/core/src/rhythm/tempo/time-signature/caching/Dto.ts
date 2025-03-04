import type { MusicalDuration } from "../../musical-duration";

export type Dto = {
  nums: number[];
  beat: MusicalDuration;
};

export function hashDto(dto: Dto): string {
  return `${dto.nums.join("-")}|${String(+dto.beat)}`;
}
