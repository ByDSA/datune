import { NumExp } from "@datune/utils/math";
import { cache } from "./cache";

export function from(ratio: NumExp) {
  return cache.getOrCreate(ratio);
}
