import type { Voicing } from "../Voicing";
import { hashDto } from "./Dto";
import { toDto } from "./toDto";

export function hash(obj: Voicing): string {
  const dto = toDto(obj);

  return hashDto(dto);
}
