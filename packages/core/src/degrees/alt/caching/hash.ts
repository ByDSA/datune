import type { Degree } from "../Degree";
import { hashDto } from "./Dto";

export function hash(obj: Degree): string {
  return hashDto(obj);
}
