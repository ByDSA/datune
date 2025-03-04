import type { Scale } from "@datune/core/scales/chromatic";
import type { Options } from "parsing";
import { stringifyIntervalArray } from "../../intervals/chromatic/array";
import { getName } from "./name";

export function stringifyScale(scale: Scale, options?: Options): string {
  const name = getName(scale, options);

  if (name)
    return name;

  return stringifyIntervalArray(scale.rootIntervals);
}
