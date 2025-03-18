import type { Scale } from "./Scale";
import { NonEmptyArray } from "datils";

export function hasDegrees<INTERVAL, DEGREE>(
  obj: Scale<INTERVAL, DEGREE>,
  ...input: NonEmptyArray<DEGREE>
): boolean {
  for (const i of input) {
    if (!obj.degrees.includes(i))
      return false;
  }

  return true;
}
