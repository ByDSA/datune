import type { Degree } from ".";
import { getId as innerGetId } from "./caching/cache";

export function getId(degree: Degree): string {
  return innerGetId(degree);
}
