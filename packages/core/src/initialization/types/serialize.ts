import collectData from "./collectData";
import type { Dto } from "./Dto";
import { toDto } from "./toDto";

export function serialize(): Dto {
  const data = collectData();
  const dto = toDto(data);

  return dto;
}
