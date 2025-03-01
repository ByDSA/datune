import { Scale } from "@datune/core/scales/chromatic";
import { parseFromName } from "./fromName";
import { parseFromIntervals } from "./intervals";
import { Options } from "parsing";

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
