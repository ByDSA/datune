import { NumExp } from "datils/math/num-exp";
import { cache } from "./cache";

export function from(ratio: NumExp) {
  return cache.getOrCreate(ratio);
}
