import { NumExp } from "@datune/utils/math";

export type Dto = NumExp;

export function hashDto(dto: Dto): string {
  return String(+dto);
}
