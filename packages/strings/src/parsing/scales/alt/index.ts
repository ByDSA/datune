import type { Scale } from "@datune/core/scales/alt";
import { Options } from "parsing";
import { parseFromIntervals } from "./intervals";
import { parseFromName } from "./name";

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
