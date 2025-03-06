import type { Scale } from "@datune/core/scales/chromatic";
import { Options } from "parsing";
import { parseFromName } from "./fromName";
import { parseFromIntervals } from "./intervals";

export function parseScale(input: string, options?: Options): Scale | null {
  let scale: Scale | null;

  scale = parseFromName(input, options);

  if (scale)
    return scale;

  scale = parseFromIntervals(input);

  if (scale)
    return scale;

  return null;
}
