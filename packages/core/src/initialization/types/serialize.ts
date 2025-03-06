import type { Dto } from "./Dto";
import collectData from "./collectData";
import { toDto } from "./toDto";

export function serialize(): Dto {
  const data = collectData();
  const dto = toDto(data);

  return dto;
}
