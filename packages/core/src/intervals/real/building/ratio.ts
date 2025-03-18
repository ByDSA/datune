import { NumExp } from "datils/math";
import { cache } from "./cache";

export function from(ratio: NumExp) {
  return cache.getOrCreate(ratio);
}
