import type { Arrays } from "@datune/utils";
import { Scale } from "./Scale";

export function hasDegrees<INTERVAL, DEGREE>(
  obj: Scale<INTERVAL, DEGREE>,
  ...input: Arrays.NonEmpty<DEGREE>
): boolean {
  for (const i of input) {
    if (!obj.degrees.includes(i))
      return false;
  }

  return true;
}
