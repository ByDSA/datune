import type { Arrays } from "@datune/utils";

export type Dto = Arrays.Number;

export function hashDto(dto: Dto): string {
  return dto.join("-");
}
